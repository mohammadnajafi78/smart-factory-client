import React from 'react';
import { NavLink as RouterLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import { ListItem, ButtonBase, Typography } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import DeleteIcon from '@mui/icons-material/Delete';
import DraftsIcon from '@mui/icons-material/Drafts';
import LabelIcon from '@mui/icons-material/Label';
import SendIcon from '@mui/icons-material/Send';
import StarIcon from '@mui/icons-material/Star';
import InboxIcon from '@mui/icons-material/Inbox';
import MailIcon from '@mui/icons-material/Mail';
import ReportIcon from '@mui/icons-material/Report';
import LabelImportantIcon from '@mui/icons-material/LabelImportant';

const systemLabelIcons = {
  all: MailIcon,
  inbox: InboxIcon,
  trash: DeleteIcon,
  drafts: DraftsIcon,
  spam: ReportIcon,
  sent: SendIcon,
  starred: StarIcon,
  important: LabelImportantIcon
};

const getIcon = (label) => {
  if (label.type === 'system_label') {
    return systemLabelIcons[label.id];
  }

  return LabelIcon;
};

const getTo = (label) => {
  const baseUrl = '/app/mail';

  if (label.type === 'system_label') {
    return `${baseUrl}/${label.id}`;
  }

  if (label.type === 'custom_label') {
    return `${baseUrl}/label/${label.name}`;
  }

  return baseUrl;
};

const getColor = (label) => {
  if (label.type === 'custom_label') {
    return label.color;
  }

  return null;
};

const useStyles = makeStyles((theme) => ({
  root: {
    padding: 0
  },
  content: {
    flexGrow: 1,
    height: 36,
    color: theme.palette.text.secondary,
    borderTopRightRadius: 18,
    borderBottomRightRadius: 18,
    paddingRight: 18,
    paddingLeft: 32,
    fontWeight: theme.typography.fontWeightRegular,
    '&:hover': {
      backgroundColor: theme.palette.action.hover
    }
  },
  active: {
    fontWeight: theme.typography.fontWeightMedium,
    backgroundColor: theme.palette.action.selected
  },
  label: {
    fontWeight: 'inherit',
    color: 'inherit'
  },
  labelRoot: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(1, 0)
  },
  icon: {
    marginRight: theme.spacing(1),
  },
  text: {
    fontWeight: 'inherit',
    flexGrow: 1
  }
}));

const LabelItem = ({ label, ...rest }) => {
  const classes = useStyles();

  const Icon = getIcon(label);
  const to = getTo(label);
  const color = getColor(label);
  const displayUnreadCount = Boolean(label.unreadCount && label.unreadCount > 0);

  return (
    <ListItem
      className={classes.root}
      {...rest}
    >
      <ButtonBase
        activeClassName={classes.active}
        component={RouterLink}
        to={to}
        className={classes.content}
      >
        <Icon
          className={classes.icon}
          color="inherit"
          style={{ color }}
        />
        <Typography
          className={classes.text}
          variant="body2"
        >
          {label.name}
        </Typography>
        {displayUnreadCount && (
          <Typography
            color="inherit"
            variant="caption"
          >
            {label.unreadCount}
          </Typography>
        )}
      </ButtonBase>
    </ListItem>
  );
};

LabelItem.propTypes = {
  label: PropTypes.object.isRequired
};

export default LabelItem;

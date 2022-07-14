import React, {
  useRef,
  useState
} from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { Avatar, Divider, IconButton, Input, Paper, SvgIcon, Tooltip } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import AddPhotoIcon from '@mui/icons-material/AddPhotoAlternate';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import { Send as SendIcon } from 'react-feather';
import useAuth from 'src/hooks/useAuth';

const useStyles = makeStyles((theme) => ({
  root: {
    alignItems: 'center',
    backgroundColor: theme.palette.background.default,
    display: 'flex',
    padding: theme.spacing(1, 2)
  },
  inputContainer: {
    flexGrow: 1,
    marginLeft: theme.spacing(2),
    padding: theme.spacing(1)
  },
  divider: {
    height: 24,
    width: 1
  },
  fileInput: {
    display: 'none'
  }
}));

const MessageComposer = ({
  className,
  disabled,
  onSend,
  ...rest
}) => {
  const classes = useStyles();
  const { user } = useAuth();
  const fileInputRef = useRef(null);
  const [body, setBody] = useState('');

  const handleAttach = () => {
    fileInputRef.current.click();
  };

  const handleChange = (event) => {
    event.persist();
    setBody(event.target.value);
  };

  const handleKeyUp = (event) => {
    if (event.keyCode === 13) {
      handleSend();
    }
  };

  const handleSend = () => {
    if (!body) {
      return;
    }

    if (onSend) {
      onSend(body);
    }

    setBody('');
  };

  return (
    <div
      className={clsx(classes.root, className)}
      {...rest}
    >
      <Avatar
        alt="Person"
        src={user.avatar}
      />
      <Paper
        variant="outlined"
        className={classes.inputContainer}
      >
        <Input
          disableUnderline
          fullWidth
          value={body}
          onChange={handleChange}
          onKeyUp={handleKeyUp}
          placeholder="Leave a message"
          disabled={disabled}
        />
      </Paper>
      <Tooltip title="Send">
        <span>
          <IconButton
            color="secondary"
            disabled={!body || disabled}
            onClick={handleSend}
            size="large">
            <SvgIcon fontSize="small">
              <SendIcon />
            </SvgIcon>
          </IconButton>
        </span>
      </Tooltip>
      <Divider className={classes.divider} />
      <Tooltip title="Attach photo">
        <span>
          <IconButton edge="end" onClick={handleAttach} disabled={disabled} size="large">
            <AddPhotoIcon />
          </IconButton>
        </span>
      </Tooltip>
      <Tooltip title="Attach file">
        <span>
          <IconButton edge="end" onClick={handleAttach} disabled={disabled} size="large">
            <AttachFileIcon />
          </IconButton>
        </span>
      </Tooltip>
      <input
        className={classes.fileInput}
        ref={fileInputRef}
        type="file"
      />
    </div>
  );
};

MessageComposer.propTypes = {
  className: PropTypes.string,
  disabled: PropTypes.bool,
  onSend: PropTypes.func
};

MessageComposer.defaultProps = {
  disabled: false,
  onSend: () => {}
};

export default MessageComposer;

import React, { useEffect, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import { AppBar, Toolbar, SvgIcon, Box } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import { THEMES } from 'src/constants';
// import Awards from './Awards';
// import Comments from './Comments';
// import Competition from './Competition';
// import Incomings from './ّIncomings';
import Competition from 'src/assets/img/icons/competition.svg';
import CompetitionSelected from 'src/assets/img/icons/competition-selected.svg';
import Present from 'src/assets/img/icons/present.svg';
import PresentsSelected from 'src/assets/img/icons/presents-selected.svg';
import Comment from 'src/assets/img/icons/comment.svg';
import CommentSelected from 'src/assets/img/icons/comment-selected.svg';
import Received from 'src/assets/img/icons/received.svg';
import ReceivedSelected from 'src/assets/img/icons/received-selected.svg';
import Vector from 'src/assets/img/icons/VectorMobile.svg';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles(theme => ({
  root: {
    zIndex: theme.zIndex.drawer + 100,
    // padding: '10px 30px',
    ...(theme.name === THEMES.LIGHT
      ? {
          boxShadow: 'none',
          backgroundColor: 'white'
        }
      : {}),
    ...(theme.name === THEMES.ONE_DARK
      ? {
          backgroundColor: theme.palette.background.default
        }
      : {})
  },
  toolbar: {
    // minHeight: 64,
    justifyContent: 'center'
  }
}));

const BottomBar = ({ className, onMobileNavOpen, ...rest }) => {
  const classes = useStyles();
  let data = [
    { name: 'competition', title: 'مسابقه', path: '/club/competition' },
    { name: 'awards', title: 'جوایز', path: '/club/awards' },
    { name: 'comments', title: 'نظرات', path: '/club/comments' },
    { name: 'received', title: 'دریافتی ها', path: '/club/received' }
  ];
  const history = useHistory();
  let path = history.location.pathname.split('/')[2];
  const [selected, setSelected] = useState(
    ['competition', 'awards', 'comments', 'received'].includes(path)
      ? path
      : path === 'receivedItem'
      ? 'received'
      : path === 'newComment'
      ? 'comments'
      : path === 'newCompetition' || path === 'competitionDetails'
      ? 'competition'
      : 'awards'
  );

  useEffect(() => {
    path = history.location.pathname.split('/')[2];
    setSelected(
      ['competition', 'awards', 'comments', 'received'].includes(path)
        ? path
        : path === 'receivedItem'
        ? 'received'
        : path === 'newComment'
        ? 'comments'
        : path === 'newCompetition' || path === 'competitionDetails'
        ? 'competition'
        : 'awards'
    );
  }, [rest]);

  return (
    <AppBar
      {...rest}
      position="fixed"
      sx={{
        top: 'auto',
        bottom: 0,
        padding: '10px 30px',
        backgroundColor: '#fff'
      }}
    >
      <Toolbar className={classes.toolbar}>
        <List
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '64px',
            padding: '10px 30px 35px'
          }}
        >
          {data.map((item, index) => (
            <ListItem
              key={index}
              onClick={() => {
                history.push(item.path);
                setSelected(item.name);
              }}
              sx={{ padding: 0 }}
            >
              <ListItemButton
                sx={{
                  flexDirection: 'column',
                  padding: 0,
                  width: '70px',
                  height: '40px'
                }}
              >
                <ListItemIcon>
                  {index === 0 &&
                    (selected !== item.name ? (
                      <Box
                        sx={{
                          width: '55.69px',
                          height: '43.79px',
                          display: 'flex',
                          justifyContent: 'center',
                          alignItems: 'center'
                        }}
                      >
                        <img src={Competition} />
                      </Box>
                    ) : (
                      <Box
                        sx={{
                          background: `url(${Vector})`,
                          width: '55.69px',
                          height: '43.79px',
                          display: 'flex',
                          justifyContent: 'center',
                          alignItems: 'center',
                          backgroundPosition: 'center',
                          backgroundRepeat: 'no-repeat'
                        }}
                      >
                        <img
                          src={CompetitionSelected}
                          width="31px"
                          height={'22px'}
                        />
                      </Box>
                    ))}
                  {index === 1 &&
                    (selected !== item.name ? (
                      <Box
                        sx={{
                          width: '55.69px',
                          height: '43.79px',
                          display: 'flex',
                          justifyContent: 'center',
                          alignItems: 'center'
                        }}
                      >
                        <img src={Present} width="31px" height={'32px'} />
                      </Box>
                    ) : (
                      <Box
                        sx={{
                          background: `url(${Vector})`,
                          width: '55.69px',
                          height: '43.79px',
                          display: 'flex',
                          justifyContent: 'center',
                          alignItems: 'center',
                          backgroundPosition: 'center',
                          backgroundRepeat: 'no-repeat'
                        }}
                      >
                        <img
                          src={PresentsSelected}
                          width="31px"
                          height={'22px'}
                        />
                      </Box>
                    ))}
                  {index === 2 &&
                    (selected !== item.name ? (
                      <Box
                        sx={{
                          width: '55.69px',
                          height: '43.79px',
                          display: 'flex',
                          justifyContent: 'center',
                          alignItems: 'center'
                        }}
                      >
                        <img src={Comment} />
                      </Box>
                    ) : (
                      <Box
                        sx={{
                          background: `url(${Vector})`,
                          width: '55.69px',
                          height: '43.79px',
                          display: 'flex',
                          justifyContent: 'center',
                          alignItems: 'center',
                          backgroundPosition: 'center',
                          backgroundRepeat: 'no-repeat'
                        }}
                      >
                        <img
                          src={CommentSelected}
                          width="31px"
                          height={'22px'}
                        />
                      </Box>
                    ))}
                  {index === 3 &&
                    (selected !== item.name ? (
                      <Box
                        sx={{
                          width: '55.69px',
                          height: '43.79px',
                          display: 'flex',
                          justifyContent: 'center',
                          alignItems: 'center'
                        }}
                      >
                        <img src={Received} />
                      </Box>
                    ) : (
                      <Box
                        sx={{
                          background: `url(${Vector})`,
                          width: '55.69px',
                          height: '43.79px',
                          display: 'flex',
                          justifyContent: 'center',
                          alignItems: 'center',
                          backgroundPosition: 'center',
                          backgroundRepeat: 'no-repeat'
                        }}
                      >
                        <img
                          src={ReceivedSelected}
                          width="31px"
                          height={'22px'}
                        />
                      </Box>
                    ))}
                </ListItemIcon>
                <ListItemText sx={{ fontSize: '10px' }} primary={item.title} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Toolbar>
    </AppBar>
  );
};

BottomBar.propTypes = {
  className: PropTypes.string,
  onMobileNavOpen: PropTypes.func
};

BottomBar.defaultProps = {
  onMobileNavOpen: () => {}
};

export default BottomBar;

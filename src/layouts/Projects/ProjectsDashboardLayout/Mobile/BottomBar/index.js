import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { AppBar, Toolbar, SvgIcon, Box } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import { THEMES } from 'src/constants';
import ProjectRequest from 'src/assets/img/projectRequest.png';
import ProjectRequestSelected from 'src/assets/img/projectRequest.png';
import Project2 from 'src/assets/img/project2.png';
import Project2Selected from 'src/assets/img/project2.png';
import ProjectReceived from 'src/assets/img/projectReceived.png';
import ProjectReceivedSelected from 'src/assets/img/projectReceived.png';
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
    justifyContent: 'center'
  }
}));

const BottomBar = ({ className, onMobileNavOpen, ...rest }) => {
  const classes = useStyles();
  let data = [
    { name: 'request', title: 'درخواست', path: '/project/request' },
    { name: 'project', title: 'پروژه', path: '/project/project' },
    { name: 'received', title: 'دریافتی', path: '/project/received' }
  ];
  const history = useHistory();
  let path = history.location.pathname.split('/')[2];
  const [selected, setSelected] = useState(
    ['request', 'project', 'received'].includes(path) ? path : 'project'
  );

  useEffect(() => {
    path = history.location.pathname.split('/')[2];
    setSelected(
      ['request', 'project', 'received'].includes(path) ? path : 'project'
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
                        <img src={ProjectRequest} />
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
                          src={ProjectRequestSelected}
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
                        <img src={Project2} width="31px" height={'32px'} />
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
                          src={Project2Selected}
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
                        <img src={ProjectReceived} />
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
                          src={ProjectReceivedSelected}
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

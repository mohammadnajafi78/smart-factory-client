import React, { useEffect, useState } from 'react';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import { Box } from '@mui/material';
import Competition from 'src/assets/img/icons/competition.svg';
import CompetitionSelected from 'src/assets/img/icons/competition-selected.svg';
import Present from 'src/assets/img/icons/present.svg';
import PresentsSelected from 'src/assets/img/icons/presents-selected.svg';
import Comment from 'src/assets/img/icons/comment.svg';
import CommentSelected from 'src/assets/img/icons/comment-selected.svg';
import Received from 'src/assets/img/icons/received.svg';
import ReceivedSelected from 'src/assets/img/icons/received-selected.svg';
import Vector from 'src/assets/img/icons/Vector.svg';
import { useHistory } from 'react-router-dom';
import TopBar from '../TopBar';
import { styled, useTheme } from '@mui/material/styles';
import userMng from 'src/assets/img/icons/userMng.svg';
import clubMng from 'src/assets/img/icons/clubMng.svg';

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar
}));

const NewDrawer = styled(Drawer)(({ theme }) => ({
  flexShrink: 0,
  '& .MuiDrawer-paper': {
    width: '200px',
    boxSizing: 'border-box',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    background: '#FFFFFF',
    padding: '20px 20px 30px',
    marginLeft: '95px',
    ...theme.mixins.toolbar,
    marginTop: '60px'
  },
  width: '128.62px',
  background: '#99DDE1',
  borderLeft: '0.5px solid #CCD6E2',
  boxShadow: '-1px 0px 10px rgba(155, 155, 155, 0.25)'
}));

export default function DrawerComp(props) {
  const history = useHistory();
  let menu1 = [
    { name: 'user', title: 'کاربر', path: '/management/user' },
    { name: 'club', title: 'کلاب', path: '/management/club' }
  ];
  let path = history.location.pathname.split('/')[2];
  const [selected, setSelected] = useState(
    ['user', 'club'].includes(history.location.pathname.split('/')[2])
      ? path
      : 'user'
  );

  useEffect(() => {
    path = history.location.pathname.split('/')[2];
    setSelected(
      ['user', 'club'].includes(history.location.pathname.split('/')[2])
        ? path
        : 'user'
    );
  }, [props]);

  return (
    <Box>
      <Drawer
        sx={{
          // width: '100px',
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: '95px',
            boxSizing: 'border-box',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-start',
            alignItems: 'center',
            background: '#99DDE1',

            borderLeft: '0.5px solid #CCD6E2'
          },

          // padding: '80px 30px',
          width: '128.62px',

          background: '#99DDE1',

          borderLeft: '0.5px solid #CCD6E2',
          boxShadow: '-1px 0px 10px rgba(155, 155, 155, 0.25)'
        }}
        variant="permanent"
        anchor="left"
      >
        <DrawerHeader>
          <TopBar />
        </DrawerHeader>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            padding: '0px',
            gap: '60px'
          }}
        >
          <List>
            {menu1.map((item, index) => (
              <ListItem
                key={index}
                onClick={() => {
                  history.push(item.path);
                  setSelected(item.name);
                }}
                style={{ borderBottom: '0.5px solid #FFFFFF' }}
              >
                <ListItemButton sx={{ flexDirection: 'column' }}>
                  <ListItemIcon>
                    {index === 0 &&
                      (selected !== item.name ? (
                        <Box
                          sx={{
                            width: '38.5px',
                            height: '28px',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center'
                          }}
                        >
                          <img src={userMng} width="38.5px" height={'28px'} />
                        </Box>
                      ) : (
                        <Box
                          sx={{
                            background: `url(${Vector})`,
                            width: '38.5px',
                            height: '28px',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            backgroundPosition: 'center',
                            backgroundRepeat: 'no-repeat'
                          }}
                        >
                          <img src={userMng} width="38.5px" height={'28px'} />
                        </Box>
                      ))}
                    {index === 1 &&
                      (selected !== item.name ? (
                        <Box
                          sx={{
                            width: '38.5px',
                            height: '28px',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center'
                          }}
                        >
                          <img src={clubMng} width="38.5px" height={'28px'} />
                        </Box>
                      ) : (
                        <Box
                          sx={{
                            background: `url(${Vector})`,
                            width: '38.5px',
                            height: '28px',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            backgroundPosition: 'center',
                            backgroundRepeat: 'no-repeat'
                          }}
                        >
                          <img src={clubMng} width="38.5px" height={'28px'} />
                        </Box>
                      ))}
                  </ListItemIcon>
                  {/* <ListItemText primary={item.title} /> */}
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>
      <NewDrawer variant="permanent" anchor="left">
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            padding: '0px',
            gap: '60px'
          }}
        >
          <List>
            {menu1.map((item, index) => (
              <ListItem
                key={index}
                onClick={() => {
                  history.push(item.path);
                  setSelected(item.name);
                }}
              >
                <ListItemButton sx={{ flexDirection: 'row' }}>
                  <ListItemIcon>
                    {index === 0 &&
                      (selected !== item.name ? (
                        <Box
                          sx={{
                            width: '38.5px',
                            height: '28px',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center'
                          }}
                        >
                          <img
                            src={Competition}
                            width="38.5px"
                            height={'28px'}
                          />
                        </Box>
                      ) : (
                        <Box
                          sx={{
                            background: `url(${Vector})`,
                            width: '38.5px',
                            height: '28px',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            backgroundPosition: 'center',
                            backgroundRepeat: 'no-repeat'
                          }}
                        >
                          <img
                            src={CompetitionSelected}
                            width="38.5px"
                            height={'28px'}
                          />
                        </Box>
                      ))}
                    {index === 1 &&
                      (selected !== item.name ? (
                        <Box
                          sx={{
                            width: '38.5px',
                            height: '28px',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center'
                          }}
                        >
                          <img src={Present} width="38.5px" height={'28px'} />
                        </Box>
                      ) : (
                        <Box
                          sx={{
                            background: `url(${Vector})`,
                            width: '38.5px',
                            height: '28px',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            backgroundPosition: 'center',
                            backgroundRepeat: 'no-repeat'
                          }}
                        >
                          <img
                            src={PresentsSelected}
                            width="38.5px"
                            height={'28px'}
                          />
                        </Box>
                      ))}
                    {index === 2 &&
                      (selected !== item.name ? (
                        <Box
                          sx={{
                            width: '38.5px',
                            height: '28px',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center'
                          }}
                        >
                          <img src={Comment} width="38.5px" height={'28px'} />
                        </Box>
                      ) : (
                        <Box
                          sx={{
                            background: `url(${Vector})`,
                            width: '38.5px',
                            height: '28px',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            backgroundPosition: 'center',
                            backgroundRepeat: 'no-repeat'
                          }}
                        >
                          <img
                            src={CommentSelected}
                            width="38.5px"
                            height={'28px'}
                          />
                        </Box>
                      ))}
                    {index === 3 &&
                      (selected !== item.name ? (
                        <Box
                          sx={{
                            width: '38.5px',
                            height: '28px',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center'
                          }}
                        >
                          <img src={Received} width="38.5px" height={'28px'} />
                        </Box>
                      ) : (
                        <Box
                          sx={{
                            background: `url(${Vector})`,
                            width: '38.5px',
                            height: '28px',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',

                            backgroundPosition: 'center',
                            backgroundRepeat: 'no-repeat'
                          }}
                        >
                          <img
                            src={ReceivedSelected}
                            width="38.5px"
                            height={'28px'}
                          />
                        </Box>
                      ))}
                  </ListItemIcon>
                  <ListItemText primary={item.title} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Box>
      </NewDrawer>
    </Box>
  );
}

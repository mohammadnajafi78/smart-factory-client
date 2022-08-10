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
import homeMng from 'src/assets/img/icons/homeMng.svg';
import newUserMng from 'src/assets/img/icons/newUserMng.svg';
import allUserMng from 'src/assets/img/icons/allUserMng.svg';
import competitionMng from 'src/assets/img/icons/competitionMng.svg';
import lotteryMng from 'src/assets/img/icons/lotteryMng.svg';
import awardsMng from 'src/assets/img/icons/awardsMng.svg';
import commentMng from 'src/assets/img/icons/commentMng.svg';
import settingMng from 'src/assets/img/icons/settingMng.svg';

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  minHeight: '60px !important'
  // necessary for content to be below app bar
  // ...theme.mixins.toolbar
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
    padding: '0px 20px 30px',
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
  const [selected, setSelected] = useState(0);
  const history = useHistory();
  let menu = [
    {
      id: 0,
      name: 'user',
      title: 'کاربر',
      path: '/management/user/home',
      image: userMng,
      children: [
        {
          name: 'home',
          title: 'خانه',
          path: '/management/user/home',
          image: homeMng
        },
        {
          name: 'newUser',
          title: 'کاربران جدید',
          path: '/management/user/newUser',
          image: newUserMng
        },
        {
          name: 'allUsers',
          title: 'همه کاربران',
          path: '/management/user/allUsers',
          image: allUserMng
        }
      ]
    },
    {
      id: 1,
      name: 'club',
      title: 'کلاب',
      path: '/management/club/competition',
      image: clubMng,
      children: [
        {
          name: 'competition',
          title: 'مسابقات',
          path: '/management/club/competition',
          image: competitionMng
        },
        {
          name: 'lottery',
          title: 'قرعه کشی',
          path: '/management/club/lottery',
          image: lotteryMng
        },
        {
          name: 'awards',
          title: 'جوایز',
          path: '/management/club/awards',
          image: awardsMng
        },
        {
          name: 'comments',
          title: 'نظرات',
          path: '/management/club/comments',
          image: commentMng
        },
        {
          name: 'settings',
          title: 'تنظیمات',
          path: '/management/club/settings',
          image: settingMng
        }
      ]
    }
  ];

  useEffect(() => {
    let path = history.location.pathname.split('/')[2];
    if (path === 'user') setSelected(0);
    else setSelected(1);
  });

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
          <List sx={{ padding: 0 }}>
            {menu.map((item, index) => (
              <ListItem
                key={index}
                onClick={() => {
                  history.push(item.path);
                  setSelected(item.id);
                }}
                sx={{
                  borderBottom: '0.5px solid #FFFFFF',
                  borderLeft:
                    index === selected ? '10px solid #335D8A' : 'none',
                  paddingLeft: index === selected ? 0 : '10px'
                }}
              >
                <ListItemButton sx={{ flexDirection: 'column' }}>
                  <ListItemIcon>
                    <Box
                      sx={{
                        width: '38.5px',
                        height: '28px',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center'
                      }}
                    >
                      <img src={item.image} width="38.5px" height={'28px'} />
                    </Box>
                  </ListItemIcon>
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
          <List sx={{ padding: '0xp' }}>
            {menu[selected].children.map((item, index) => (
              <ListItem
                key={index}
                onClick={() => {
                  history.push(item.path);
                  // setSelected(item.name);
                }}
                sx={{
                  margin: '0px',
                  padding: '0px',
                  width: '180px'
                }}
              >
                <ListItemButton
                  sx={{ flexDirection: 'row', padding: '12px 8px' }}
                >
                  <ListItemIcon>
                    <Box
                      sx={{
                        width: '25px',
                        height: '25px',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center'
                      }}
                    >
                      <img src={item.image} width="25px" height={'25px'} />
                    </Box>
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

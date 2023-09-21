import React, { useEffect, useState } from 'react';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import { Box, Collapse } from '@mui/material';
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
import saleMng from 'src/assets/img/local_mall_mng.svg';
import HomeMng from 'src/assets/img/icons/homeMng.js';
import NewUserMng from 'src/assets/img/icons/newUserMng.js';
import AllUserMng from 'src/assets/img/icons/allUserMng.js';
import CompetitionMng from 'src/assets/img/icons/competitionMng.js';
import LotteryMng from 'src/assets/img/icons/lotteryMng.js';
import AwardsMng from 'src/assets/img/icons/awardsMng.js';
import CommentMng from 'src/assets/img/icons/commentMng.js';
import SettingMng from 'src/assets/img/icons/settingMng.js';
import Inventory2Mng from 'src/assets/img/icons/Inventory2Mng.js';
import { ArrowDown } from 'react-feather';
import {
  ArrowUpwardOutlined,
  ArrowUpwardRounded,
  KeyboardArrowDown,
  KeyboardArrowUp
} from '@mui/icons-material';
import httpService from 'src/utils/httpService';
import { API_BASE_URL } from 'src/utils/urls';

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
  const [selected, setSelected] = useState(-1);
  const [open, setOpen] = useState(false);
  const [menuId, setMenuId] = useState(-1);
  const history = useHistory();
  const [menu, setMenu] = useState([]);
  // let menu = [
  //   {
  //     id: 0,
  //     name: 'user',
  //     title: 'کاربر',
  //     path: '/management/user/home',
  //     image: userMng,
  //     children: [
  //       {
  //         id: 101,
  //         name: 'home',
  //         title: 'خانه',
  //         path: '/management/user/home',
  //         image1: <HomeMng fill="#335D8A" />,
  //         image2: <HomeMng fill="#00AAB5" />
  //       },
  //       {
  //         id: 102,
  //         name: 'newUser',
  //         title: 'کاربران جدید',
  //         path: '/management/user/newUser',
  //         image1: <NewUserMng fill="#335D8A" />,
  //         image2: <NewUserMng fill="#00AAB5" />
  //       },
  //       {
  //         id: 103,
  //         name: 'allUsers',
  //         title: 'همه کاربران',
  //         path: '/management/user/allUsers',
  //         image1: <AllUserMng fill="#335D8A" />,
  //         image2: <AllUserMng fill="#00AAB5" />
  //       }
  //     ]
  //   },
  //   {
  //     id: 1,
  //     name: 'club',
  //     title: 'کلاب',
  //     path: '/management/club/competition',
  //     image: clubMng,
  //     children: [
  //       {
  //         id: 110,
  //         name: 'competition',
  //         title: 'مسابقات',
  //         path: '/management/club/competition',
  //         image1: <CompetitionMng fill="#335D8A" />,
  //         image2: <CompetitionMng fill="#00AAB5" />
  //       },
  //       {
  //         id: 111,
  //         name: 'lottery',
  //         title: 'قرعه کشی',
  //         path: '/management/club/lottery',
  //         image1: <LotteryMng fill="#335D8A" />,
  //         image2: <LotteryMng fill="#00AAB5" />
  //       },
  //       {
  //         id: 112,
  //         name: 'awards',
  //         title: 'جوایز',
  //         path: '/management/club/gifts',
  //         image1: <AwardsMng fill="#335D8A" />,
  //         image2: <AwardsMng fill="#00AAB5" />
  //       },
  //       {
  //         id: 113,
  //         name: 'comments',
  //         title: 'نظرات',
  //         path: '/management/club/comment',
  //         image1: <CommentMng fill="#335D8A" />,
  //         image2: <CommentMng fill="#00AAB5" />
  //       },
  //       {
  //         id: 114,
  //         name: 'settings',
  //         title: 'تنظیمات',
  //         path: '/management/club/setting',
  //         image1: <SettingMng fill="#335D8A" />,
  //         image2: <SettingMng fill="#00AAB5" />
  //       }
  //     ]
  //   },
  //   {
  //     id: 2,
  //     name: 'sale',
  //     title: 'فروش',
  //     path: '/management/sale/home',
  //     image: saleMng,
  //     children: [
  //       {
  //         id: 200,
  //         name: 'home',
  //         title: 'خانه',
  //         path: '/management/sale/home',
  //         image1: <HomeMng fill="#335D8A" />,
  //         image2: <HomeMng fill="#00AAB5" />
  //       },
  //       {
  //         id: 201,
  //         name: 'received',
  //         title: 'سفارشات دریافتی',
  //         path: '/management/sale/received',
  //         image1: <Inventory2Mng fill="#335D8A" />,
  //         image2: <Inventory2Mng fill="#00AAB5" />
  //       },
  //       {
  //         id: 202,
  //         name: 'reports',
  //         title: 'گزارشات',
  //         path: '/management/sale/report/orders',
  //         image1: <SettingMng fill="#335D8A" />,
  //         image2: <SettingMng fill="#00AAB5" />,
  //         children: [
  //           {
  //             id: 203,
  //             name: 'orders',
  //             title: 'لیست کلیه سفارشات',
  //             path: '/management/sale/report/orders'
  //             // image1: <SettingMng fill="#335D8A" />,
  //             // image2: <SettingMng fill="#00AAB5" />
  //           },
  //           {
  //             id: 204,
  //             name: 'product',
  //             title: 'لیست اقلام سفارش',
  //             path: '/management/sale/report/product'
  //             // image1: <SettingMng fill="#335D8A" />,
  //             // image2: <SettingMng fill="#00AAB5" />
  //           }
  //         ]
  //       },
  //       {
  //         id: 205,
  //         name: 'settings',
  //         title: 'تنظیمات',
  //         path: '/management/sale/setting/products',
  //         image1: <SettingMng fill="#335D8A" />,
  //         image2: <SettingMng fill="#00AAB5" />,
  //         children: [
  //           {
  //             id: 206,
  //             name: 'products',
  //             title: 'محصولات',
  //             path: '/management/sale/setting/products'
  //             // image1: <SettingMng fill="#335D8A" />,
  //             // image2: <SettingMng fill="#00AAB5" />
  //           },
  //           {
  //             id: 207,
  //             name: 'price',
  //             title: 'جدول قیمت',
  //             path: '/management/sale/setting/priceList'
  //             // image1: <SettingMng fill="#335D8A" />,
  //             // image2: <SettingMng fill="#00AAB5" />
  //           }
  //         ]
  //       }
  //     ]
  //   }
  // ];

  useEffect(() => {
    let path = history.location.pathname.split('/')[2];
    if (menu.length > 0) {
      setSelected(
        menu
          .filter(filter => filter.name === 'Management')[0]
          .children.filter(f => f.name.toLowerCase() == path.toLowerCase())[0]
          .id
      );
    }
  });

  useEffect(() => {
    let path2 = history.location.pathname.split('/')[3];
    if (selected !== -1 && menu.length > 0) {
      props.setSelected(
        menu
          .filter(filter => filter.name === 'Management')[0]
          .children.filter(filter => filter.id === selected)[0]
          .children.filter(f => f.path['fa'].includes(path2))[0]
      );
    }
  }, [selected]);

  useEffect(() => {
    httpService
      .get(`${API_BASE_URL}/api/management/util/menu_items/`)
      .then(res => {
        if (res.status === 200) {
          setMenu(res.data);
        }
      });
  }, []);
console.log(menu)
  return (
    <Box>
      <Drawer
        sx={{
          // width: '100px',
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            // width: '95px',
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
            {menu.length > 0 &&
              menu
                .filter(f => f.name === 'Management')[0]
                .children.map((item, index) => (
                  <ListItem
                    key={item.id}
                    onClick={() => {
                      history.push(item.path['fa']);
                      setSelected(item.id);
                      props.setSelected(item.children[0]);
                    }}
                    sx={{
                      borderBottom: '0.5px solid #FFFFFF',
                      borderLeft:
                        item.id === selected ? '10px solid #335D8A' : 'none',
                      paddingLeft: item.id === selected ? 0 : '10px'
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
                          <img
                            src={item.image1}
                            width="38.5px"
                            height={'28px'}
                          />
                        </Box>
                      </ListItemIcon>
                    </ListItemButton>
                  </ListItem>
                ))}
          </List>
        </Box>
      </Drawer>
      {menu.length > 0 && selected !== -1 && (
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
              {menu.length > 0 &&
                selected !== -1 &&
                menu
                  .filter(filter => filter.name === 'Management')[0]
                  .children.filter(filter => filter.id === selected)[0]
                  ?.children.map((item, index) => (
                    <>
                      <ListItem
                        key={item.id}
                        onClick={() => {
                          history.push(item.path['fa']);
                          props.setSelected(item);
                        }}
                        sx={{
                          margin: '0px',
                          padding: '0px',
                          width: '180px',
                          display: 'flex',
                          justifyContent: 'space-between'
                        }}
                      >
                        <ListItemButton
                          sx={{ flexDirection: 'row', padding: '12px 8px' }}
                          onClick={() => {
                            if (item.children && item.children.length > 0) {
                              setOpen(!open);
                              if (open === true) {
                                setMenuId(-1);
                              } else setMenuId(item.id);
                            }
                          }}
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
                              <img
                                src={
                                  props?.selected?.id === item?.id
                                    ? item.image2
                                    : item.image1
                                }
                                // alt={props.selected.name}
                              />
                            </Box>
                          </ListItemIcon>
                          <ListItemText
                            primary={item.title['fa']}
                            style={{
                              color:
                                props?.selected?.id === item?.id
                                  ? '#00AAB5'
                                  : '#335D8A'
                            }}
                          />
                        </ListItemButton>
                        {// open == true &&
                        item.id == menuId &&
                        item.children &&
                        item.children.length > 0 ? (
                          <KeyboardArrowUp
                            style={{
                              fontSize: '22px',
                              color:
                                props.selected.id === item.id
                                  ? '#00AAB5'
                                  : '#335D8A'
                            }}
                          />
                        ) : // open == false &&
                        // item.id === menuId &&
                        item.children && item.children.length > 0 ? (
                          <KeyboardArrowDown
                            style={{
                              fontSize: '22px',
                              color:
                                props.selected.id === item.id
                                  ? '#00AAB5'
                                  : '#335D8A'
                            }}
                          />
                        ) : null}
                      </ListItem>
                      <Collapse
                        in={item.id === menuId ? open : false}
                        timeout="auto"
                        unmountOnExit
                      >
                        {item.children &&
                          item.children.length > 0 &&
                          item.children.map((child, key) => (
                            <ListItem
                              key={child.id}
                              onClick={() => {
                                history.push(child.path['fa']);
                                props.setSelected(child);
                              }}
                              sx={{
                                margin: '0px',
                                padding: '0px',
                                width: '180px'
                              }}
                            >
                              <ListItemButton
                                sx={{
                                  flexDirection: 'row',
                                  padding: '12px 30px'
                                }}
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
                                    <img
                                      src={
                                        props?.selected?.id === child?.id
                                          ? child.image2
                                          : child.image1
                                      }
                                      // alt={props.selected.name}
                                    />
                                  </Box>
                                </ListItemIcon>
                                <ListItemText
                                  primary={child.title['fa']}
                                  style={{
                                    color:
                                      props.selected.id === child.id
                                        ? '#00AAB5'
                                        : '#335D8A'
                                  }}
                                />
                              </ListItemButton>
                            </ListItem>
                          ))}
                      </Collapse>
                    </>
                  ))}
            </List>
          </Box>
        </NewDrawer>
      )}
    </Box>
  );
}

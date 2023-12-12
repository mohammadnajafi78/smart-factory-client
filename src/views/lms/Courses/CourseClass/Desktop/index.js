import * as React from 'react';
import { useEffect, useState } from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import Group from 'src/assets/img/group.png';
import Chat from 'src/assets/img/chat.png';
import DownloadImg from 'src/assets/img/download.png';
import InputLabel from 'src/components/Mobile/InputLabel';
import makeStyles from '@mui/styles/makeStyles';
import { useHistory } from 'react-router';
import jwtDecode from 'jwt-decode';
import Attach from 'src/assets/img/icons/attachComment.svg';
import Smile from 'src/assets/img/icons/smile.svg';
import ConfirmButton from 'src/components/Mobile/Button/Confirm';
import SendMessageImage from 'src/assets/img/icons/sendMessage.svg';
import { TextField, InputAdornment } from '@mui/material';

const drawerWidth = 350;

const useStyles = makeStyles(theme => ({
  paper: {
    borderRadius: '20px 20px 0px 0px',
    zIndex: 999,
    position: 'fixed',
    bottom: 0,
    minHeight: '60%'
  }
}));
const CssTextField = styled(TextField)({
  '& .MuiOutlinedInput-root': {
    backgroundColor: '#fafafa',
    '& fieldset': {
      borderColor: 'white'
    },
    '&:hover fieldset': {
      borderColor: 'white'
    },
    '&.Mui-focused fieldset': {
      borderColor: 'white'
    }
  },
  '& .MuiOutlinedInput-input': {
    fontSize: '14px'
  }
});
const Main = styled('main', { shouldForwardProp: prop => prop !== 'open' })(
  ({ theme, open }) => ({
    width: '160vh',
    height: '90%',
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen
      }),
      marginLeft: 0
    })
  })
);

const AppBar = styled(MuiAppBar, {
  // background: '#00346D',
  shouldForwardProp: prop => prop !== 'open'
})(({ theme, open }) => ({
  background: '#00346D',
  gap: '20px',
  display: 'flex',
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen
    })
  })
}));

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end'
}));

export default function PersistentDrawerLeft(props) {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [courseDetail, setCourseDetail] = useState(null);
  const [openChat, setOpenChat] = useState(false);
  const [openUsers, setOpenUsers] = useState(false);
  const [users, setUsers] = useState([]);
  const [comments, setComments] = useState([]);
  const [messageText, setMessageText] = useState('');
  const [selected, setSelected] = useState('user');
  const history = useHistory();
  const classes = useStyles();
  const session = props.location.state.session;
  const course = props.location.state.course;
  const [chatSocket, setChatSocket] = useState(
    new WebSocket(
      // `ws://192.168.1.3:8000/chat/${session.session_num}/?token=${
      // `ws://193.141.127.244:8001/chat/${session.session_num}/?token=${
      // `ws://0.0.0.0:8001/chat/${session.session_num}/?token=${
      `ws://apidev.bts-co.app/ws/chat/${session.session_num}/?token=${
        jwtDecode(localStorage.getItem('token')).chat_token
      }`
    )
  );

  useEffect(() => {
    chatSocket.onmessage = function(message) {
      console.log('Chat Message: ', message.data);
      const data = JSON.parse(message.data);
      console.log('Chat Message2: ', data);

      if (data.msg_type === 'NORMAL') {
        appendChatMessage(data);
      } else if (data.msg_type === 'JOIN') {
        console.log(
          'کاربر به چت پیوست',
          JSON.parse(localStorage.getItem('user')).user_id
        );
        getRoomChatMessages();
      } else if (data.msg_type === 'LEAVE') {
        console.log('leave user', data);
        console.log(
          'کاربر چت را ترک کرد',
          JSON.parse(localStorage.getItem('user')).user_id
        );
      } else if (data.msg_type === 'ERROR') {
        console.log('error', data?.error);
      } else if (data.msg_type === 'ROOM_CHAT') {
        console.log('All message', data.message);
        handleMessagesPayload(data.message, data.new_page_number);
      } else if (data.msg_type === 'INFORMATION') {
        console.log('data', data);
        // if (data.is_display !== null) displayChatRoomLoading(data.is_display);
        console.log('user count', data.user_count);

        if (data.user_count !== 0) {
          setConnectedUserCount(data.user_count);
        }

        if (data?.users) {
          setUsers(data.users);
          console.log('user list', data.users);
          // setConnectedUserList(data.users);
        }
      }
    };

    chatSocket.addEventListener('open', function(e) {
      console.log('Chat Socket OPEN');
      chatSocket.send(
        JSON.stringify({
          command: 'JOIN',
          room: session.session_num
        })
      );
    });

    chatSocket.onopen = function(e) {
      console.log('Chat Socket is OPEN');
    };

    chatSocket.onclose = function(e) {
      console.log('Chat Socket CLOSE');
    };

    chatSocket.onerror = function(e) {
      console.log('Chat Socket error: ' + e);
    };

    if (chatSocket.readyState === WebSocket.OPEN) {
      console.log('Chat Socket State: OPEN');
    } else if (chatSocket.readyState === WebSocket.CONNECTING) {
      console.log('Chat Socket State: CONNECTING...');
    } else if (chatSocket.readyState === WebSocket.CLOSING) {
      console.log('Chat Socket State: CLOSING...');
    } else if (chatSocket.readyState === WebSocket.CLOSED) {
      console.log('Chat Socket State: CLOSED');
    }
  }, []);

  useEffect(() => {
    return () => {
      console.log('leave the page');
      chatSocket.send(
        JSON.stringify({
          command: 'LEAVE',
          room: session.session_num
        })
      );
    };
  }, []);

  // on send message
  // chatSocket.send(
  //   JSON.stringify({
  //     command: 'SEND',
  //     message: 'Message Data',
  //     room_id: session.session_num
  //   })
  // );

  function setPageNumber(pageNumber) {
    // set page number element to pageNumber
  }

  function setPaginationExhausted() {
    setPageNumber(-1);
  }

  function getRoomChatMessages() {
    let pageNumber = 1; // page number element value
    // if (pageNumber !== '-1') {
    //   setPageNumber('-1'); // query is in progress
    // chatSocket.send(
    //   JSON.stringify({
    //     command: 'SEND',
    //     room: session.session_num,
    //     message: 'first message'
    //     // page_number: pageNumber
    //   })
    // );
    chatSocket.send(
      JSON.stringify({
        command: 'ALL',
        room: session.session_num,
        page_number: pageNumber
      })
    );
    // }
  }

  function handleMessagesPayload(messages, new_page_number) {
    if (messages !== null) {
      // setPageNumber(new_page_number);
      messages.forEach(function(message) {
        appendChatMessage(message);
      });
    } else {
      setPaginationExhausted();
    }
  }

  let chatLog = 'Chat Scroll Element'; // chat view element
  // chatLog.addEventListener('scroll', function(e) {
  //   if (
  //     Math.abs(chatLog.scrollTop) + 2 >=
  //     chatLog.scrollHeight - chatLog.offsetHeight
  //   ) {
  //     // when scroll reach top
  //     getRoomChatMessages();
  //   }
  // });

  function appendChatMessage(data) {
    console.log('append message inja');

    const message = data['message'];
    const first_name = data['first_name'];
    const last_name = data['last_name'];
    const user_id = data['user_id'];
    const profile_image = data['profile_image'];
    const timestamp = data['timestamp'];

    setComments(prev => [
      ...prev,
      {
        message,
        first_name,
        last_name,
        user_id,
        profile_image,
        timestamp
      }
    ]);
    // createChatMessageElement(
    //   message,
    //   first_name,
    //   last_name,
    //   user_id,
    //   profile_image,
    //   timestamp
    // );
  }

  function createChatMessageElement(
    message,
    first_name,
    last_name,
    user_id,
    profile_image,
    timestamp
  ) {
    // create element
  }

  function displayChatRoomLoading(isDisplay) {
    let spinner = document.getElementById('loadingSpinner');
    if (isDisplay) {
      spinner.style.display = 'block';
    } else {
      spinner.style.display = 'none';
    }
  }

  function setConnectedUserCount(count) {
    // let userCountElement = document.getElementById('user_count_element');
    // userCountElement.innerHTML = count;
  }

  function setConnectedUserList() {
    // update user list
    console.log('user list22', users);
    // if (users2.length !== 0) {
    // setUsers(users2);
    // }

    // setUsers([1, 2]);
  }

  // useEffect(() => {
  //   httpService
  //     .get(
  //       `${API_BASE_URL}/api/lms/course/get_course_info/?course_num=${props.location.state.course_num}`
  //     )
  //     .then(res => {
  //       if (res.status === 200) {
  //         console.log('detail', res.data);
  //         setCourseDetail(res.data[0]);
  //       }
  //     });
  // }, []);

  const handleDrawerOpen = type => {
    setOpen(true);
    setSelected(type);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <Toolbar>
          {/* <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{ mr: 2, ...(open && { display: 'none' }) }}
          >
            <MenuIcon />
          </IconButton> */}

          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              margin: '0px 10px'
            }}
            // onClick={() => setOpenUsers(true)}
            onClick={() => handleDrawerOpen('user')}
          >
            <img src={Group} width="20px" height={'20px'} />
            <InputLabel style={{ color: 'white', fontSize: '14px' }}>
              شرکت کنندگان
            </InputLabel>
          </Box>

          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              margin: '0px 10px'
              // alignItems: 'center'
            }}
            onClick={() => handleDrawerOpen('chat')}
          >
            <img src={Chat} width="20px" height={'20px'} />
            <InputLabel style={{ color: 'white', fontSize: '14px' }}>
              چت
            </InputLabel>
          </Box>

          <a
            href={session?.note?.url}
            download
            target="_blank"
            style={{
              textDecoration: 'none',
              // width: '100%',
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'flex-end'
            }}
          >
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                margin: '0px 10px',
                cursor: 'pointer'
                // alignItems: 'center'
              }}
            >
              <img src={DownloadImg} width="20px" height={'20px'} />
              <InputLabel
                style={{ color: 'white', fontSize: '14px', cursor: 'pointer' }}
              >
                جزوه
              </InputLabel>
            </Box>
          </a>
          {/* <Typography variant="h6" noWrap component="div">
            Persistent drawer
          </Typography> */}
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box'
          }
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <DrawerHeader>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              width: '100%',
              padding: '0px 10px'
            }}
          >
            <InputLabel style={{ color: '#335D8A' }}>
              {selected === 'user' ? 'شرکت کنندگان' : 'چت'}
            </InputLabel>
            <IconButton onClick={handleDrawerClose}>
              {theme.direction === 'ltr' ? (
                <ChevronLeftIcon />
              ) : (
                <ChevronRightIcon />
              )}
            </IconButton>
          </Box>
        </DrawerHeader>
        <Divider />
        {selected === 'chat' ? (
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              // justifyContent: 'space-between',
              alignItems: 'flex-start',
              // padding: '20px 20px 40px',
              gap: '20px',
              // height: '200px',
              background: '#FFFFFF'
            }}
          >
            <Box
              sx={{
                width: '100%',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-start',
                padding: '20px 20px 0px',
                gap: '20px',
                // height: '200px',
                background: '#FFFFFF'
              }}
            >
              {comments &&
                comments.map((item, index) => {
                  return (
                    <>
                      {item.user_id ===
                        JSON.parse(localStorage.getItem('user')).user_id && (
                        <Box
                          sx={{
                            display: 'flex',
                            flexDirection: 'row',
                            justifyContent: 'flex-end',
                            alignItems: 'flex-start',
                            // padding: '0px 30px 0px 20px',
                            gap: '3px'
                          }}
                        >
                          <Box
                            sx={{
                              display: 'flex',
                              flexDirection: 'column',
                              alignItems: 'flex-start',
                              gap: '10px',
                              background: '#CCD6E2',
                              borderRadius: '20px'
                            }}
                          >
                            <img
                              src={item?.profile_image}
                              style={{
                                width: '40px',
                                height: '40px',
                                borderRadius: '30px'
                              }}
                            />
                          </Box>
                          <Box
                            sx={{
                              display: 'flex',
                              flexDirection: 'column',
                              justifyContent: 'center',
                              alignItems: 'flex-start',
                              padding: '0px',
                              gap: '4px'
                            }}
                          >
                            <Box
                              sx={{
                                display: 'flex',
                                flexDirection: 'row',
                                alignItems: 'flex-start',
                                padding: '12px',
                                gap: '10px',

                                // width: 480px;
                                // height: 68px;
                                background: '#00AAB5',
                                boxShadow:
                                  '0px 4px 8px rgba(146, 146, 146, 0.25)',
                                borderRadius: '0px 20px 20px 20px'
                              }}
                            >
                              <Box
                                sx={{
                                  fontWeight: 500,
                                  fontSize: '14px',
                                  lineHeight: '22px',
                                  textAlign: 'right',
                                  color: '#FFFFFF'
                                }}
                              >
                                {item?.message?.length > 0 && (
                                  <InputLabel
                                    style={{
                                      fontWeight: 400,
                                      fontSize: '14px',
                                      textAlign: 'right',
                                      color: 'white'
                                    }}
                                  >
                                    {item?.message}
                                  </InputLabel>
                                )}
                              </Box>
                            </Box>
                          </Box>
                        </Box>
                      )}
                      {item.user_id !==
                        JSON.parse(localStorage.getItem('user')).user_id && (
                        <Box
                          sx={{
                            display: 'flex',
                            flexDirection: 'row',
                            alignItems: 'flex-start',
                            // padding: '0px 10px 0px 10px',
                            gap: '10px',
                            width: '100%',
                            justifyContent: 'flex-end'
                          }}
                        >
                          <Box
                            sx={{
                              display: 'flex',
                              flexDirection: 'column',
                              justifyContent: 'center',
                              alignItems: 'flex-end',
                              padding: '0px',
                              gap: '4px'
                            }}
                          >
                            <Box
                              sx={{
                                display: 'flex',
                                flexDirection: 'row',
                                alignItems: 'flex-start',
                                padding: '12px',
                                gap: '10px',

                                background: '#eee',
                                boxShadow:
                                  '0px 0px 8px rgba(146, 146, 146, 0.25)',
                                borderRadius: '20px 0px 20px 20px',
                                width: '100%'
                              }}
                            >
                              {item?.message.length > 0 && (
                                <InputLabel
                                  style={{
                                    fontWeight: 400,
                                    fontSize: '14px',
                                    textAlign: 'right',
                                    color: '#4F4C4D'
                                  }}
                                >
                                  {item?.message}
                                </InputLabel>
                              )}
                            </Box>
                          </Box>
                          <Box
                            sx={{
                              display: 'flex',
                              flexDirection: 'column',
                              alignItems: 'flex-start',
                              gap: '10px',
                              background: '#CCD6E2',
                              borderRadius: '20px'
                            }}
                          >
                            <img
                              src={item.profile_image}
                              style={{
                                width: '40px',
                                height: '40px',
                                borderRadius: '30px'
                              }}
                            />
                          </Box>
                        </Box>
                      )}
                    </>
                  );
                })}
            </Box>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'flex-end',
                alignItems: 'center',
                padding: '0px 6px',
                // gap: '8px',
                background: '#fafafa',
                width: '100%',
                position: 'relative',
                bottom: 0,
                right: 0
                // marginTop: '100px'
              }}
            >
              <CssTextField
                fullWidth
                multiline
                placeholder="بنویسید..."
                classes={{
                  MuiOutlinedInput: {
                    root: { backgroundColor: '#fafafa' }
                  }
                }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <img src={Smile} />
                    </InputAdornment>
                  )
                }}
                value={messageText}
                onChange={event => setMessageText(event.target.value)}
                onKeyDown={e => {
                  if (e.key === 'Enter') {
                    // addResponse();
                    chatSocket.send(
                      JSON.stringify({
                        command: 'SEND',
                        room: session.session_num,
                        message: messageText
                      })
                    );
                    setMessageText('');
                  }
                }}
              />
              {messageText && (
                <ConfirmButton
                  disabled={false}
                  variant="contained"
                  component="label"
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    // padding: '9px ',
                    // gap: '10px',
                    width: '20px',
                    height: '20px',
                    background: '#00AAB5',
                    borderRadius: '22px'
                  }}
                  onClick={() => {
                    // addResponse();
                    chatSocket.send(
                      JSON.stringify({
                        command: 'SEND',
                        room: session.session_num,
                        message: messageText
                      })
                    );
                    setMessageText('');
                  }}
                >
                  <img src={SendMessageImage} width="20px" height="18px" />
                </ConfirmButton>
              )}
              {/* : (
                  <ConfirmButton
                    disabled={false}
                    variant="contained"
                    component="label"
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'center',
                      alignItems: 'center',
    
                      width: '20px',
                      height: '20px',
                      background: '#00AAB5',
                      borderRadius: '22px'
                    }}
                    value={files}
                    onChange={event => {
                      setFiles(event.target.files[0]);
                    }}
                  >
                    <img src={Attach} width="20px" height="18px" />
                    <input type="file" hidden multiple={false} />
                  </ConfirmButton>
                )} */}
            </Box>
          </Box>
        ) : (
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              // justifyContent: 'space-between',
              alignItems: 'flex-start',
              padding: '20px',
              gap: '20px',
              // height: '200px',
              background: '#FFFFFF'
            }}
          >
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
              {users?.map((item, index) => {
                return (
                  <Box sx={{ display: 'inline-flex', alignItems: 'center' }}>
                    <Box
                      sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'flex-start',
                        gap: '10px',
                        background: '#CCD6E2',
                        borderRadius: '20px',
                        marginRight: '5px'
                      }}
                    >
                      <img
                        src={item?.profile_image}
                        style={{
                          width: '40px',
                          height: '40px',
                          borderRadius: '30px'
                        }}
                      />
                    </Box>
                    <InputLabel>
                      {item.first_name + ' ' + item.last_name}
                      {/* {'فریده' + ' ' + 'حسینی'} */}
                    </InputLabel>
                  </Box>
                );
              })}
            </Box>
          </Box>
        )}
      </Drawer>
      <Main open={open}>
        <DrawerHeader />
        <div
          style={{
            width: '100%',
            height: '100%'
          }}
          dangerouslySetInnerHTML={{
            __html:
              '<iframe width="100%" height="100%" src=' +
              session?.link
                .split('src="')
                .pop()
                .split('"')[0] +
              ' frameborder="0" allowFullScreen></iframe>'
          }}
        />
      </Main>
    </Box>
  );
}

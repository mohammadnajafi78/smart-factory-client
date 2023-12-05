import { Box, Button, Drawer } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import Group from 'src/assets/img/group.png';
import Chat from 'src/assets/img/chat.png';
import DownloadImg from 'src/assets/img/download.png';
import InputLabel from 'src/components/Mobile/InputLabel';
import jwtDecode from 'jwt-decode';
import MomentTimeFa from 'src/utils/MomentTimeFa';

const useStyles = makeStyles(theme => ({
  paper: {
    borderRadius: '20px 20px 0px 0px',
    zIndex: 999,
    position: 'fixed',
    bottom: 0,
    minHeight: '60%'
  }
}));

export default function CourseClassMobile(props) {
  const [courseDetail, setCourseDetail] = useState(null);
  const [openChat, setOpenChat] = useState(false);
  const [openUsers, setOpenUsers] = useState(false);
  const [users, setUsers] = useState([]);
  const [comments, setComments] = useState([]);
  const history = useHistory();
  const classes = useStyles();
  const session = props.location.state.session;
  const course = props.location.state.course;
  const [chatSocket, setChatSocket] = useState(
    new WebSocket(
      // `ws://192.168.1.3:8000/chat/${session.session_num}/?token=${
      // `ws://193.141.127.244:8001/chat/${session.session_num}/?token=${
      `ws://0.0.0.0:8001/chat/${session.session_num}/?token=${
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
    chatSocket.send(
      JSON.stringify({
        command: 'SEND',
        room: session.session_num,
        message: 'first message'
        // page_number: pageNumber
      })
    );
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

  return (
    <>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          paddingTop: '100px',
          backgroundColor: '#E5E5E5',
          justifyContent: 'center',
          alignItems: 'flex-start',
          width: '100%',
          padding: '100px 10px 10px'
          // paddingBottom: '100px'
        }}
      >
        <InputLabel style={{ color: '#00346D' }}>{course?.name}</InputLabel>
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
      </Box>

      <Box
        sx={{
          position: 'fixed',
          bottom: '0%',
          width: '100%',
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          height: '70px',
          padding: '10px',
          background: '#00346D',
          color: 'white',
          gap: 3
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
          }}
          onClick={() => setOpenUsers(true)}
        >
          <img src={Group} width="20px" height={'20px'} />
          <InputLabel style={{ color: 'white', fontSize: '14px' }}>
            شرکت کنندگان
          </InputLabel>
        </Box>

        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column'
            // alignItems: 'center'
          }}
          onClick={() => setOpenChat(true)}
        >
          <img src={Chat} width="20px" height={'20px'} />
          <InputLabel style={{ color: 'white', fontSize: '14px' }}>
            چت
          </InputLabel>
        </Box>

        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column'
            // alignItems: 'center'
          }}
        >
          <img src={DownloadImg} width="20px" height={'20px'} />
          <InputLabel style={{ color: 'white', fontSize: '14px' }}>
            جزوه
          </InputLabel>
        </Box>
      </Box>

      <Drawer
        anchor={'bottom'}
        open={openChat}
        onClose={() => setOpenChat(false)}
        classes={{
          paper: classes.paper
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            // justifyContent: 'space-between',
            alignItems: 'flex-start',
            padding: '20px',
            gap: '20px',
            height: '185px',
            background: '#FFFFFF'
          }}
        >
          <InputLabel style={{ color: '#335D8A' }}>{'چت'}</InputLabel>
          <Button
            variant="outlined"
            onClick={() => {
              // chatSocket.onmessage = function(message) {
              chatSocket.send(
                JSON.stringify({
                  command: 'SEND',
                  room: session.session_num,
                  message: 'second message'
                  // page_number: pageNumber
                })
              );
              // chatSocket.send(
              //   JSON.stringify({
              //     command: 'ALL',
              //     room: session.session_num
              //     // page_number: 1
              //   })
              // );
              // };
            }}
          >
            شروع
          </Button>
          {comments &&
            comments.map((item, index) => {
              return (
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
                        boxShadow: '0px 4px 8px rgba(146, 146, 146, 0.25)',
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
                    {/* <Box
                      sx={{
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'center',
                        padding: '0px 4px 0px 0px',
                        gap: '10px'
                      }}
                    >
                      <InputLabel
                        style={{
                          fontWeight: 400,
                          fontSize: '10px',
                          lineHeight: '16px',
                          textAlign: 'right',
                          color: '#A7A5A6',
                          direction: 'ltr'
                        }}
                      >
                        {MomentTimeFa(item?.timestamp)}
                      </InputLabel>
                    </Box> */}
                  </Box>
                </Box>
              );
            })}
        </Box>
      </Drawer>

      <Drawer
        anchor={'bottom'}
        open={openUsers}
        onClose={() => setOpenUsers(false)}
        classes={{
          paper: classes.paper
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            // justifyContent: 'space-between',
            alignItems: 'flex-start',
            padding: '20px',
            gap: '20px',
            height: '185px',
            background: '#FFFFFF'
          }}
        >
          <InputLabel style={{ color: '#335D8A' }}>شرکت کنندگان</InputLabel>
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

        {/* <Box
          sx={{
            display: 'inline-flex',
            justifyContent: 'space-between',
            gap: 2,
            width: '100%',
            borderTop: '0.5px solid #D3D2D2',
            padding: '12px 16px'
          }}
        >
          <ConfirmButton
            disabled={false}
            variant="outlined"
            onClick={() => {
              setOpen(false);
            }}
          >
            {'بستن'}
          </ConfirmButton>
          <ConfirmButton
            disabled={false}
            onClick={() => {
              httpService
                .post(
                  `${API_BASE_URL}/api/lms/course/register/?course_num=${props?.location?.state?.course}`
                )
                .then(res => {
                  if (res.status === 200) {
                    setOpen(false);
                  }
                });
            }}
          >
            {'ثبت نام'}
          </ConfirmButton>
        </Box> */}
      </Drawer>
    </>
  );
}

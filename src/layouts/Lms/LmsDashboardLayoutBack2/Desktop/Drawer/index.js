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
import School from 'src/assets/img/school.png';
import SchoolSelected from 'src/assets/img/schoolSelected.png';
import Person from 'src/assets/img/person.png';
import PersonSelected from 'src/assets/img/personSelected.png';
import Calendar from 'src/assets/img/calendar.png';
import CalendarSelected from 'src/assets/img/calendarSelected.png';
import Exam from 'src/assets/img/exam.png';
import ExamSelected from 'src/assets/img/examSelected.png';
import Vector from 'src/assets/img/icons/Vector.svg';
import { useHistory } from 'react-router-dom';

export default function DrawerComp(props) {
  const history = useHistory();
  let data = [
    { name: 'profile', title: 'پروفایل', path: '/lms/profile' },
    { name: 'course', title: 'دوره ها', path: '/lms/course' },
    // { name: 'calendar', title: 'برنامه هفتگی', path: '/lms/calendar' },
    { name: 'exam', title: 'آزمون ها', path: '/lms/exam' }
  ];

  let path = history.location.pathname.split('/')[2];
  const [selected, setSelected] = useState(
    ['course', 'profile', 'calendar', 'exam'].includes(path) ? path : 'profile'
  );

  useEffect(() => {
    path = history.location.pathname.split('/')[2];
    setSelected(
      ['course', 'profile', 'calendar', 'exam'].includes(path)
        ? path
        : 'profile'
    );
  }, [props]);

  return (
    <Drawer
      sx={{
        width: '130px',
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: '130px',
          boxSizing: 'border-box',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center'
        },

        // padding: '80px 30px',
        width: '128.62px',

        background: '#FFFFFF',
        boxShadow: '-1px 0px 10px rgba(155, 155, 155, 0.25)'
      }}
      variant="permanent"
      anchor="left"
    >
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
          {data.map((item, index) => (
            <ListItem
              key={index}
              onClick={() => {
                history.push(item.path);
                setSelected(item.name);
              }}
            >
              <ListItemButton sx={{ flexDirection: 'column' }}>
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
                        <img src={Person} width="44px" height={'32px'} />
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
                          src={PersonSelected}
                          width="44px"
                          height={'32px'}
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
                        <img src={School} width="44px" height={'32px'} />
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
                          src={SchoolSelected}
                          width="44px"
                          height={'32px'}
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
                        <img src={Calendar} width="44px" height={'32px'} />
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
                          src={CalendarSelected}
                          width="44px"
                          height={'32px'}
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
                        <img src={Exam} width="44px" height={'32px'} />
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
                        <img src={ExamSelected} width="44px" height={'32px'} />
                      </Box>
                    ))}
                </ListItemIcon>
                <ListItemText
                  primary={item.title}
                  sx={{ textAlign: 'center' }}
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Box>
    </Drawer>
  );
}

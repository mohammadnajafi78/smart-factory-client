import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { AppBar, Toolbar, SvgIcon, Box } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import { THEMES } from 'src/constants';
import School from 'src/assets/img/school.png';
import SchoolSelected from 'src/assets/img/schoolSelected.png';
import Person from 'src/assets/img/person.png';
import PersonSelected from 'src/assets/img/personSelected.png';
import Calendar from 'src/assets/img/calendar.png';
import CalendarSelected from 'src/assets/img/calendarSelected.png';
import Exam from 'src/assets/img/exam.png';
import ExamSelected from 'src/assets/img/examSelected.png';
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
    { name: 'profile', title: 'پروفایل', path: '/lms/profile' },
    { name: 'course', title: 'دوره ها', path: '/lms/course' },
    // { name: 'calendar', title: 'برنامه هفتگی', path: '/lms/calendar' },
    { name: 'exam', title: 'آزمون ها', path: '/lms/exam' }
  ];

  const history = useHistory();
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
                        <img src={Person} />
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
                        <img src={School} width="31px" height={'32px'} />
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
                        <img src={Calendar} />
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
                        <img src={Exam} />
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
                        <img src={ExamSelected} width="31px" height={'22px'} />
                      </Box>
                    ))}
                </ListItemIcon>
                <ListItemText
                  sx={{
                    fontSize: '10px',
                    textAlign: 'center',
                    '.MuiTypography-root': {
                      fontSize: '12px'
                    }
                  }}
                  primary={item.title}
                />
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

import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import SwipeableViews from 'react-swipeable-views';
import { useTheme } from '@mui/material/styles';
// import UserProfile from './UserProfile';
import ClubGrade from './clubGrade';
import GiftTypes from './giftTypes';
import SuggestionType from './suggestionType';
import SuggestionTopic from './suggestionTopic';

// import Club from './Club';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`
  };
}

export default function SettingDesktop(props) {
  const [value, setValue] = React.useState(0);
  const theme = useTheme();

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const handleChangeIndex = index => {
    setValue(index);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          <Tab
            label="سطوح کاربری"
            {...a11yProps(0)}
            sx={{
              fontFamily: 'IRANSans',
              fontSize: '16px',
              fontWeight: 400,
              color: '#335D8A'
            }}
          />
          <Tab
            label="نوع هدایا"
            {...a11yProps(1)}
            sx={{
              fontFamily: 'IRANSans',
              fontSize: '16px',
              fontWeight: 400,
              color: '#335D8A'
            }}
          />
          <Tab
            label="عنوان پیشنهادات"
            {...a11yProps(2)}
            sx={{
              fontFamily: 'IRANSans',
              fontSize: '16px',
              fontWeight: 400,
              color: '#335D8A'
            }}
          />
          <Tab
            label="موضوع پیشنهادات"
            {...a11yProps(3)}
            sx={{
              fontFamily: 'IRANSans',
              fontSize: '16px',
              fontWeight: 400,
              color: '#335D8A'
            }}
          />
        </Tabs>
      </Box>
      <SwipeableViews
        axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
        index={value}
        onChangeIndex={handleChangeIndex}
      >
        <TabPanel value={value} index={0} dir={theme.direction}>
          <ClubGrade />
        </TabPanel>
        <TabPanel value={value} index={1} dir={theme.direction}>
          <GiftTypes />
        </TabPanel>
        <TabPanel value={value} index={2} dir={theme.direction}>
          <SuggestionType />
        </TabPanel>
        <TabPanel value={value} index={3} dir={theme.direction}>
          <SuggestionTopic />
        </TabPanel>
      </SwipeableViews>
    </Box>
  );
}

import React, { useState } from 'react';
import { Box } from '@mui/material';
import InputLabel from 'src/components/Desktop/InputLabel';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import SwipeableViews from 'react-swipeable-views';
import { useTheme } from '@mui/material/styles';

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

export default function Club(props) {
  const [data, setData] = useState(props.data);
  const [value, setValue] = React.useState(0);
  const theme = useTheme();

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const handleChangeIndex = index => {
    setValue(index);
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start'
        // padding: '20px'
      }}
    >
      <Box
        sx={{
          display: 'flex',
          backgroundColor: 'white',
          width: '100%',
          padding: '12px 20px',
          gap: '90px',
          borderRadius: '8px'
        }}
      >
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            width: '100%',
            marginTop: '12px'
          }}
        >
          <div style={{ display: 'inline-flex' }}>
            <InputLabel style={{ color: '#00AAB5' }}>سطح کاربر:</InputLabel>
            <InputLabel style={{ color: '#335D8A' }}>
              {data?.national_id}
            </InputLabel>
          </div>
          <div style={{ display: 'inline-flex' }}>
            <InputLabel style={{ color: '#00AAB5' }}>امتیاز :</InputLabel>
            <InputLabel style={{ color: '#335D8A' }}>{data?.mobile}</InputLabel>
          </div>
          <div style={{ display: 'inline-flex' }}>
            <InputLabel style={{ color: '#00AAB5' }}>
              تاریخ ثبت نام :
            </InputLabel>
            <InputLabel style={{ color: '#335D8A' }}>
              {data?.username}
            </InputLabel>
          </div>
        </Box>
      </Box>

      <Box
        sx={{
          width: '100%',
          backgroundColor: 'white',
          marginTop: '24px',
          borderRadius: '8px'
        }}
      >
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="basic tabs example"
          >
            <Tab
              label="دریافتی"
              {...a11yProps(0)}
              sx={{
                fontFamily: 'IRANSans',
                fontSize: '16px',
                fontWeight: 400,
                color: '#335D8A'
              }}
            />
            <Tab
              label="مسابقات"
              {...a11yProps(1)}
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
            {/* <UserProfile data={userData} /> */}
          </TabPanel>
          <TabPanel value={value} index={1} dir={theme.direction}>
            {/* <Club /> */}
          </TabPanel>
        </SwipeableViews>
      </Box>
    </Box>
  );
}

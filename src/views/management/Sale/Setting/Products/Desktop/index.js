import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import SwipeableViews from 'react-swipeable-views';
import { useTheme } from '@mui/material/styles';
// import UserProfile from './UserProfile';
import ProductCategory from './ProductCategory';
import ProductType from './ProductType';
import ProductSubCategory from './ProductSubCategory';
import Products from './Products';
// import ClubGrade from './clubGrade';
// import GiftTypes from './giftTypes';
// import SuggestionType from './suggestionType';
// import SuggestionTopic from './suggestionTopic';

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

export default function ProductsDesktop(props) {
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
            label="دسته محصولات"
            {...a11yProps(0)}
            sx={{
              fontFamily: 'IRANSans',
              fontSize: '16px',
              fontWeight: 400,
              color: '#335D8A'
            }}
          />
          <Tab
            label="زیر دسته محصولات"
            {...a11yProps(1)}
            sx={{
              fontFamily: 'IRANSans',
              fontSize: '16px',
              fontWeight: 400,
              color: '#335D8A'
            }}
          />
          <Tab
            label="انواع محصولات"
            {...a11yProps(2)}
            sx={{
              fontFamily: 'IRANSans',
              fontSize: '16px',
              fontWeight: 400,
              color: '#335D8A'
            }}
          />
          <Tab
            label="محصولات"
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
          <ProductCategory />
        </TabPanel>
        <TabPanel value={value} index={1} dir={theme.direction}>
          <ProductSubCategory />
        </TabPanel>
        <TabPanel value={value} index={2} dir={theme.direction}>
          <ProductType />
        </TabPanel>
        <TabPanel value={value} index={3} dir={theme.direction}>
          <Products />
        </TabPanel>
      </SwipeableViews>
    </Box>
  );
}

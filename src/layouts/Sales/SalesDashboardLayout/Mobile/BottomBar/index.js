import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { AppBar, Toolbar, SvgIcon, Box } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import { THEMES } from 'src/constants';
import SendSale from 'src/assets/img/sendSales.svg';
import SendSaleSelected from 'src/assets/img/sendSaleSelected.svg';
import Products from 'src/assets/img/products.svg';
import ProductsSelected from 'src/assets/img/productSelected.svg';
import ReceivedSale from 'src/assets/img/receivedSale.svg';
import ReceivedSaleSelected from 'src/assets/img/receivedSaleSelected.svg';
import Tripartite from 'src/assets/img/tripartiteSale.svg';
import TripartiteSelected from 'src/assets/img/tripartiteSelected.svg';
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
    { name: 'send', title: 'ارسالی', path: '/sale/send' },
    { name: 'products', title: 'محصولات', path: '/sale/products' },
    { name: 'received', title: 'دریافتی', path: '/sale/received' },
    { name: 'tripartite', title: 'سه جانبه', path: '/sale/tripartite' }
  ];
  const history = useHistory();
  let path = history.location.pathname.split('/')[2];
  const [selected, setSelected] = useState(
    ['send', 'products', 'received', 'tripartite'].includes(path)
      ? path
      : // : path === 'receivedItem'
        // ? 'received'
        // : path === 'newComment'
        // ? 'comments'
        // : path === 'newCompetition' || path === 'competitionDetails'
        // ? 'competition'
        'products'
  );

  useEffect(() => {
    path = history.location.pathname.split('/')[2];
    setSelected(
      ['send', 'products', 'received', 'tripartite'].includes(path)
        ? path
        : // : path === 'receivedItem'
          // ? 'received'
          // : path === 'newComment'
          // ? 'comments'
          // : path === 'newCompetition' || path === 'competitionDetails'
          // ? 'competition'
          'products'
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
                        <img src={SendSale} />
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
                          src={SendSaleSelected}
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
                        <img src={Products} width="31px" height={'32px'} />
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
                          src={ProductsSelected}
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
                        <img src={ReceivedSale} />
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
                          src={ReceivedSaleSelected}
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
                        <img src={Tripartite} />
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
                          src={TripartiteSelected}
                          width="31px"
                          height={'22px'}
                        />
                      </Box>
                    ))}
                </ListItemIcon>
                <ListItemText sx={{ fontSize: '10px' }} primary={item.title} />
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

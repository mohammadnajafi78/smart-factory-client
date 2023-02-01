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
import SendSale from 'src/assets/img/sendSales.svg';
import SendSaleSelected from 'src/assets/img/sendSaleSelected.svg';
import Products from 'src/assets/img/products.svg';
import ProductsSelected from 'src/assets/img/productSelected.svg';
import ReceivedSale from 'src/assets/img/receivedSale.svg';
import ReceivedSaleSelected from 'src/assets/img/receivedSaleSelected.svg';
import Tripartite from 'src/assets/img/tripartiteSale.svg';
import TripartiteSelected from 'src/assets/img/tripartiteSelected.svg';
import Vector from 'src/assets/img/icons/Vector.svg';
import { useHistory } from 'react-router-dom';

export default function DrawerComp(props) {
  const history = useHistory();
  let data = [
    { name: 'send', title: 'ارسالی', path: '/sale/send' },
    { name: 'products', title: 'محصولات', path: '/sale/products' },
    { name: 'received', title: 'دریافتی', path: '/sale/received' },
    { name: 'tripartite', title: 'سه جانبه', path: '/sale/tripartite' }
  ];
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
                        <img src={SendSale} width="44px" height={'32px'} />
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
                        <img src={Products} width="44px" height={'32px'} />
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
                        <img src={ReceivedSale} width="44px" height={'32px'} />
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
                        <img src={Tripartite} width="44px" height={'32px'} />
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
                          width="44px"
                          height={'32px'}
                        />
                      </Box>
                    ))}
                </ListItemIcon>
                <ListItemText primary={item.title} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Box>
    </Drawer>
  );
}

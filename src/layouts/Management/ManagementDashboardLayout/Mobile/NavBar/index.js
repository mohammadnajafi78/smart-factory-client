/* eslint-disable no-use-before-define */
import React, { useEffect } from 'react';
import {
  Link as RouterLink,
  matchPath,
  useHistory,
  useLocation
} from 'react-router-dom';
import PerfectScrollbar from 'react-perfect-scrollbar';
import PropTypes from 'prop-types';
import {
  Avatar,
  Box,
  Divider,
  Drawer,
  Hidden,
  Link,
  List,
  ListItemIcon,
  ListSubheader,
  Menu,
  MenuItem
} from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import {
  BarChart as BarChartIcon,
  Briefcase as BriefcaseIcon,
  Calendar as CalendarIcon,
  Coffee as CoffeeIcon,
  Command as CommandIcon,
  PieChart as PieChartIcon,
  ShoppingCart as ShoppingCartIcon,
  Users as UsersIcon,
  Home as HomeIcon
} from 'react-feather';
import useAuth from 'src/hooks/useAuth';
import NavItem from './NavItem';
import { useTranslation } from 'react-i18next';
import { PersonAdd, Settings } from '@mui/icons-material';

/* const sections = [
  {
    subheader: 'Reports',
    items: [
      {
        title: 'Dashboard',
        icon: PieChartIcon,
        href: '/app/reports/dashboard'
      },
      {
        title: 'Dashboard Alternative',
        icon: BarChartIcon,
        href: '/app/reports/dashboard-alternative'
      }
    ]
  },
  {
    subheader: 'Management',
    items: [
      {
        title: 'Customers',
        icon: UsersIcon,
        href: '/app/management/customers',
        items: [
          {
            title: 'List Customers',
            href: '/app/management/customers'
          },
          {
            title: 'View Customer',
            href: '/app/management/customers/1'
          },
          {
            title: 'Edit Customer',
            href: '/app/management/customers/1/edit'
          }
        ]
      },
      {
        title: 'Products',
        icon: ShoppingCartIcon,
        href: '/app/management/products',
        items: [
          {
            title: 'List Products',
            href: '/app/management/products'
          },
          {
            title: 'Create Product',
            href: '/app/management/products/create'
          }
        ]
      },
      {
        title: 'Orders',
        icon: FolderIcon,
        href: '/app/management/orders',
        items: [
          {
            title: 'List Orders',
            href: '/app/management/orders'
          },
          {
            title: 'View Order',
            href: '/app/management/orders/1'
          }
        ]
      },
      {
        title: 'Invoices',
        icon: ReceiptIcon,
        href: '/app/management/invoices',
        items: [
          {
            title: 'List Invoices',
            href: '/app/management/invoices'
          },
          {
            title: 'View Invoice',
            href: '/app/management/invoices/1'
          }
        ]
      }
    ]
  },
  {
    subheader: 'Applications',
    items: [
      {
        title: 'Projects Platform',
        href: '/app/projects',
        icon: BriefcaseIcon,
        items: [
          {
            title: 'Overview',
            href: '/app/projects/overview'
          },
          {
            title: 'Browse Projects',
            href: '/app/projects/browse'
          },
          {
            title: 'Create Project',
            href: '/app/projects/create'
          },
          {
            title: 'View Project',
            href: '/app/projects/1'
          }
        ]
      },
      {
        title: 'Social Platform',
        href: '/app/social',
        icon: ShareIcon,
        items: [
          {
            title: 'Profile',
            href: '/app/social/profile'
          },
          {
            title: 'Feed',
            href: '/app/social/feed'
          }
        ]
      },
      {
        title: 'Kanban',
        href: '/app/kanban',
        icon: TrelloIcon
      },
      {
        title: 'Mail',
        href: '/app/mail',
        icon: MailIcon
      },
      {
        title: 'Chat',
        href: '/app/chat',
        icon: MessageCircleIcon,
        info: () => (
          <Chip
            color="secondary"
            size="small"
            label="Updated"
          />
        )
      },
      {
        title: 'Calendar',
        href: '/app/calendar',
        icon: CalendarIcon,
        info: () => (
          <Chip
            color="secondary"
            size="small"
            label="Updated"
          />
        )
      }
    ]
  },
  {
    subheader: 'Auth',
    items: [
      {
        title: 'Login',
        href: '/login-unprotected',
        icon: LockIcon
      },
      {
        title: 'Register',
        href: '/register-unprotected',
        icon: UserPlusIcon
      }
    ]
  },
  {
    subheader: 'Pages',
    items: [
      {
        title: 'Account',
        href: '/app/account',
        icon: UserIcon
      },
      {
        title: 'Error',
        href: '/404',
        icon: AlertCircleIcon
      },
      {
        title: 'Pricing',
        href: '/pricing',
        icon: DollarSignIcon
      }
    ]
  },
  {
    subheader: 'Extra',
    items: [
      {
        title: 'Charts',
        href: '/app/extra/charts',
        icon: BarChartIcon,
        items: [
          {
            title: 'Apex Charts',
            href: '/app/extra/charts/apex'
          }
        ]
      },
      {
        title: 'Forms',
        href: '/app/extra/forms',
        icon: EditIcon,
        items: [
          {
            title: 'Formik',
            href: '/app/extra/forms/formik'
          },
          {
            title: 'Redux Forms',
            href: '/app/extra/forms/redux'
          },
        ]
      },
      {
        title: 'Editors',
        href: '/app/extra/editors',
        icon: LayoutIcon,
        items: [
          {
            title: 'DraftJS Editor',
            href: '/app/extra/editors/draft-js'
          },
          {
            title: 'Quill Editor',
            href: '/app/extra/editors/quill'
          }
        ]
      }
    ]
  }
]; */

const sections = [
  {
    subheader: 'common.Home',
    items: [
      {
        title: 'common.Home',
        icon: HomeIcon,
        href: '/home'
      }
    ]
  },
  {
    subheader: 'common.Reports',
    items: [
      {
        title: 'common.Dashboard',
        icon: PieChartIcon,
        href: '/app/reports/dashboard'
      },
      {
        title: 'common.DashboardAlternative',
        icon: BarChartIcon,
        href: '/app/reports/dashboard-alternative'
      }
    ]
  },
  {
    subheader: 'common.Management',
    items: [
      {
        title: 'common.Users',
        icon: CoffeeIcon,
        href: '/app/management/users',
        items: [
          {
            title: 'common.AddUsers',
            href: '/app/management/users'
          }
        ]
      },
      {
        title: 'common.Customers',
        icon: UsersIcon,
        href: '/app/management/customers',
        items: [
          {
            title: 'common.ListCustomers',
            href: '/app/management/customers'
          },
          {
            title: 'common.ViewCustomer',
            href: '/app/management/customers/1'
          },
          {
            title: 'common.EditCustomer',
            href: '/app/management/customers/1/edit'
          }
        ]
      },
      {
        title: 'common.Products',
        icon: ShoppingCartIcon,
        href: '/app/management/products',
        items: [
          {
            title: 'common.ListProducts',
            href: '/app/management/products'
          },
          {
            title: 'common.CreateProduct',
            href: '/app/management/products/create'
          }
        ]
      }
    ]
  },
  {
    subheader: 'common.Applications',
    items: [
      {
        title: 'common.SecurityManagement',
        href: '/app/projects',
        icon: BriefcaseIcon,
        items: [
          {
            title: 'common.Overview',
            href: '/app/projects/overview'
          },
          {
            title: 'common.BrowseProjects',
            href: '/app/projects/browse'
          },
          {
            title: 'common.CreateProject',
            href: '/app/projects/create'
          },
          {
            title: 'common.ViewProject',
            href: '/app/projects/1'
          }
        ]
      }
    ]
  },
  {
    subheader: 'common.User',
    items: [
      {
        title: 'common.Components',
        href: '/app/projects',
        icon: CommandIcon,
        items: [
          {
            title: 'common.Overview',
            href: '/app/components/overview'
          },
          {
            title: 'common.Browse',
            href: '/app/projects/browse'
          }
        ]
      },
      {
        title: 'common.Calendar',
        href: '/app/calendar',
        icon: CalendarIcon
        /*        info: () => (
          <Chip
            color="secondary"
            size="small"
            label="Updated"
          />
        )*/
      }
    ]
  }
];

function renderNavItems({ items, pathname, depth = 0 }) {
  return (
    <List disablePadding>
      {items.reduce(
        (acc, item) => ReduceChildRoutes({ acc, item, pathname, depth }),
        []
      )}
    </List>
  );
}

const ReduceChildRoutes = ({ acc, pathname, item, depth }) => {
  const key = item.title + depth;
  const { t } = useTranslation();

  if (item.items) {
    const open = matchPath(pathname, {
      path: item.href,
      exact: false
    });

    acc.push(
      <NavItem
        depth={depth}
        icon={item.icon}
        info={item.info}
        key={key}
        open={Boolean(open)}
        title={t(item.title)}
      >
        {renderNavItems({
          depth: depth + 1,
          pathname,
          items: item.items
        })}
      </NavItem>
    );
  } else {
    acc.push(
      <NavItem
        depth={depth}
        href={item.href}
        icon={item.icon}
        info={item.info}
        key={key}
        title={t(item.title)}
      />
    );
  }

  return acc;
};

const useStyles = makeStyles(() => ({
  root: {
    fontFamily: 'IRANSans'
  },
  mobileDrawer: {
    width: 256
  },
  desktopDrawer: {
    width: 256,
    top: 64,
    height: 'calc(100% - 64px)'
  },
  avatar: {
    cursor: 'pointer',
    width: 64,
    height: 64
  }
}));

const NavBar = ({ onMobileClose, openMobile }) => {
  const classes = useStyles();
  const location = useLocation();
  const { user } = useAuth();
  const { t } = useTranslation();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const history = useHistory();

  useEffect(() => {
    if (openMobile && onMobileClose) {
      onMobileClose();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname]);

  // const content = (
  //   <Box height="100%" display="flex" flexDirection="column">
  //     <PerfectScrollbar options={{ suppressScrollX: true }}>
  //       <Hidden lgUp>
  //         <Box p={2} display="flex" justifyContent="center">
  //           <RouterLink to="/">
  //             <Logo />
  //           </RouterLink>
  //         </Box>
  //       </Hidden>
  //       <Box p={2}>
  //         <Box display="flex" justifyContent="center">
  //           <RouterLink to="/app/account">
  //             <Avatar
  //               //alt="User"
  //               className={classes.avatar}
  //               src={user.avatar}
  //             />
  //           </RouterLink>
  //         </Box>
  //         <Box mt={2} textAlign="center">
  //           <Link
  //             component={RouterLink}
  //             to="/app/account"
  //             variant="h5"
  //             color="textPrimary"
  //             underline="none"
  //           >
  //             {user.name}
  //           </Link>
  //           {/*            <Typography
  //             variant="body2"
  //             color="textSecondary"
  //           >
  //             Your tier:
  //             {' '}
  //             <Link
  //               component={RouterLink}
  //               to="/pricing"
  //             >
  //               {user.tier}
  //             </Link>
  //           </Typography>*/}
  //         </Box>
  //       </Box>
  //       <Divider />
  //       <Box p={2}>
  //         {sections.map(section => (
  //           <List
  //             key={section.subheader}
  //             subheader={
  //               <ListSubheader disableGutters disableSticky>
  //                 {t(section.subheader)}
  //               </ListSubheader>
  //             }
  //           >
  //             {renderNavItems({
  //               items: section.items,
  //               pathname: location.pathname
  //             })}
  //           </List>
  //         ))}
  //       </Box>
  //       <Divider />
  //       {/* <Box p={2}>
  //         <Box
  //           p={2}
  //           borderRadius="borderRadius"
  //           bgcolor="background.dark"
  //         >
  //           <Typography
  //             variant="h6"
  //             color="textPrimary"
  //           >
  //             Need Help?
  //           </Typography>
  //           <Link
  //             variant="subtitle1"
  //             color="secondary"
  //             component={RouterLink}
  //             to="/docs"
  //           >
  //             Check our docs
  //           </Link>
  //         </Box>
  //       </Box> */}
  //     </PerfectScrollbar>
  //   </Box>
  // );
  // const contentMobile = (
  //   <Box height="100%" display="flex" flexDirection="column">
  //     <PerfectScrollbar options={{ suppressScrollX: true }}>
  //       <Hidden lgUp>
  //         <Box p={2} display="flex" justifyContent="center">
  //           <RouterLink to="/">
  //             <LogoMobile />
  //           </RouterLink>
  //         </Box>
  //       </Hidden>
  //       <Box p={2}>
  //         <Box display="flex" justifyContent="center">
  //           <RouterLink to="/app/account">
  //             <Avatar
  //               //alt="User"
  //               className={classes.avatar}
  //               src={user.avatar}
  //             />
  //           </RouterLink>
  //         </Box>
  //         <Box mt={2} textAlign="center">
  //           <Link
  //             component={RouterLink}
  //             to="/app/account"
  //             variant="h5"
  //             color="textPrimary"
  //             underline="none"
  //           >
  //             {user.name}
  //           </Link>
  //         </Box>
  //       </Box>
  //       <Divider />
  //       <Box p={2}>
  //         {sections.map(section => (
  //           <List
  //             key={section.subheader}
  //             subheader={
  //               <ListSubheader disableGutters disableSticky>
  //                 {t(section.subheader)}
  //               </ListSubheader>
  //             }
  //           >
  //             {renderNavItems({
  //               items: section.items,
  //               pathname: location.pathname
  //             })}
  //           </List>
  //         ))}
  //       </Box>
  //       <Divider />
  //     </PerfectScrollbar>
  //   </Box>
  // );

  return (
    <>
      {/* <Hidden lgUp>
        <Drawer
          anchor="left"
          classes={{ paper: classes.mobileDrawer }}
          onClose={onMobileClose}
          open={openMobile}
          variant="temporary"
        >
          {contentMobile}
        </Drawer>
      </Hidden>
      <Hidden lgDown>
        <Drawer
          anchor="left"
          classes={{ paper: classes.desktopDrawer }}
          open
          variant="persistent"
        >
          {content}
        </Drawer>
      </Hidden> */}
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={openMobile}
        onClose={onMobileClose}
        onClick={onMobileClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: 'visible',
            // filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            background: ' #FFFFFF',
            boxShadow: '1px 1px 8px rgba(123, 123, 123, 0.25)',
            borderRadius: '6px',
            mt: 4.5,
            borderRadius: '6px',
            padding: '10px 12px 10px  12px',
            '& .MuiAvatar-root': {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 0.75
            },
            fontSize: '16px',
            fontWeight: 400,
            fontFamily: 'IRANSans',
            '&:before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              // bgcolor: 'background.paper',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0
            }
          }
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'top' }}
      >
        {/* <MenuItem>
          <Avatar /> Profile
        </MenuItem>
        <MenuItem>
          <Avatar /> My account
        </MenuItem>
        <Divider /> */}
        <MenuItem color="#00346D" onClick={() => history.push('/profile')}>
          <ListItemIcon>
            <PersonAdd fontSize="small" />
          </ListItemIcon>
          حساب کاربری
        </MenuItem>
        <MenuItem color="#00346D" onClick={() => history.push('/profile')}>
          <ListItemIcon>
            <Settings fontSize="small" />
          </ListItemIcon>
          صندوق پیام ها
        </MenuItem>
        {/* <MenuItem>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          Logout
        </MenuItem> */}
      </Menu>
    </>
  );
};

NavBar.propTypes = {
  onMobileClose: PropTypes.func,
  openMobile: PropTypes.bool
};

export default NavBar;

import React from 'react';
import makeStyles from '@mui/styles/makeStyles';
import Page from 'src/components/Page';
import useAuth from 'src/hooks/useAuth';
import IrisaLogin from './IrisaLogin/IrisaLogin';

const methodIcons = {
  Auth0: '/static/images/auth0.svg',
  FirebaseAuth: '/static/images/firebase.svg',
  JWT: '/static/images/jwt.svg'
};

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh'
  },
  banner: {
    backgroundColor: theme.palette.background.paper,
    paddingBottom: theme.spacing(2),
    paddingTop: theme.spacing(2),
    borderBottom: `1px solid ${theme.palette.divider}`
  },
  bannerChip: {
    marginRight: theme.spacing(2)
  },
  methodIcon: {
    height: 30,
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2)
  },
  cardContainer: {
    paddingBottom: 80,
    paddingTop: 80
  },
  cardContent: {
    padding: theme.spacing(4),
    display: 'flex',
    flexDirection: 'column',
    minHeight: 400
  },
  currentMethodIcon: {
    height: 40,
    '& > img': {
      width: 'auto',
      maxHeight: '100%'
    }
  }
}));

const LoginView = () => {
  const classes = useStyles();
  const { method } = useAuth();

  return (
    <Page title="Login">
      {/* <div className={classes.banner}>
        <Container maxWidth="md">
          <Box alignItems="center" display="flex" justifyContent="center">
            <Chip
              color="secondary"
              label="NEW"
              size="small"
              className={classes.bannerChip}
            />
            <Box alignItems="center" display="flex">
              <Typography color="textPrimary" variant="h6">
                Visit our{' '}
                <Link component={RouterLink} to="/docs">
                  docs
                </Link>{' '}
                and find out how to switch between
              </Typography>
              <Tooltip title="Auth0">
                <img
                  alt="Auth0"
                  className={classes.methodIcon}
                  src={methodIcons['Auth0']}
                />
              </Tooltip>
              <Tooltip title="Firebase">
                <img
                  alt="Firebase"
                  className={classes.methodIcon}
                  src={methodIcons['FirebaseAuth']}
                />
              </Tooltip>
              <Tooltip title="JSON Web Token">
                <img
                  alt="JWT"
                  className={classes.methodIcon}
                  src={methodIcons['JWT']}
                />
              </Tooltip>
            </Box>
          </Box>
        </Container>
      </div> */}
      {/* <Container className={classes.cardContainer} maxWidth="sm">
        <Box mb={8} display="flex" justifyContent="center">
          <RouterLink to="/">
            <Logo />
          </RouterLink>
        </Box>
        <Card>
          <CardContent className={classes.cardContent}>
            <Box
              alignItems="center"
              display="flex"
              justifyContent="space-between"
              mb={3}
            >
              <div>
                <Typography color="textPrimary" gutterBottom variant="h2">
                  Sign in
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Sign in on the internal platform
                </Typography>
              </div>
              <div className={classes.currentMethodIcon}>
                <img alt="Auth method" src={methodIcons[method]} />
              </div>
            </Box>
            <Box flexGrow={1} mt={3}>
              {method === 'Auth0' && <Auth0Login />}
              {method === 'FirebaseAuth' && <FirebaseAuthLogin />}
              {method === 'JWT' && <IrisaLogin />}
            </Box>
            <Box my={3}>
              <Divider />
            </Box>
            <Link
              component={RouterLink}
              to="/register"
              variant="body2"
              color="textSecondary"
            >
              Create new account
            </Link>
          </CardContent>
        </Card>
      </Container> */}
      {/* <Box alignItems="center" display="flex"> */}
      <IrisaLogin />
      {/* </Box> */}
    </Page>
  );
};

export default LoginView;

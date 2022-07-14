import React from 'react';
import { Box, Container } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import Page from 'src/components/Page';
import Header from './Header';
import UserAddForm from './UserAddForm';
import { useTranslation } from 'react-i18next';

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(3),
    fontFamily: 'IRANSans'
  }
}));

const UserAddView = () => {
  const classes = useStyles();
  const { t } = useTranslation();

  return (
    <Page className={classes.root} title={t('user.AddUser')}>
      <Container maxWidth={false}>
        <Header />
      </Container>
      <Box mt={3}>
        <Container maxWidth="lg">
          <UserAddForm />
        </Container>
      </Box>
    </Page>
  );
};

export default UserAddView;

import createStyles from '@mui/styles/createStyles';
import makeStyles from '@mui/styles/makeStyles';

const useStyles = makeStyles(() =>
  createStyles({
    '@global': {
      '*': {
        boxSizing: 'border-box',
        margin: 0,
        padding: 0,
        fontFamily: 'Montserrat',
        fontSize: '14px',
        fontWeight: 400
      },
      html: {
        '-webkit-font-smoothing': 'antialiased',
        '-moz-osx-font-smoothing': 'grayscale',
        height: '100%',
        width: '100%',
        fontFamily: 'Montserrat'
      },
      body: {
        height: '100%',
        width: '100%',
        fontFamily: 'Montserrat'
      },
      '#root': {
        height: '100%',
        width: '100%',
        fontFamily: 'Montserrat'
      }
    }
  })
);

const GlobalStyles = () => {
  useStyles();

  return null;
};

export default GlobalStyles;

import React, { useEffect, useState } from 'react';
import { Box, Divider, Drawer } from '@mui/material';
import LinkIconButton from 'src/components/Mobile/Button/LinkIcon';
import LinkButton from 'src/components/Mobile/Button/Link';
import InputLabel from 'src/components/Mobile/InputLabel';
import iphone13 from 'src/assets/img/icons/iphone13.jpeg';
import { Star } from 'react-feather';
import Received from 'src/assets/img/icons/received.svg';
import Presents from 'src/assets/img/icons/presents.svg';
import InputLabelHeader from 'src/components/Mobile/InputLabel/InputLabelHeader';
import ConfirmButton from 'src/components/Mobile/Button/Confirm';
import makeStyles from '@mui/styles/makeStyles';
import httpService from 'src/utils/httpService';
import { API_BASE_URL } from 'src/utils/urls';
import { useHistory } from 'react-router-dom';
import MomentFa from 'src/utils/MomentFa';
import UserClub from 'src/utils/userClub';
import useScore from 'src/hooks/useScore';
import ErrorImg from 'src/assets/img/icons/error.svg';
import Confirmation from './Cofirmation';

const useStyles = makeStyles(theme => ({
  paper: {
    borderRadius: '20px 20px 0px 0px',
    zIndex: 999,
    position: 'fixed',
    bottom: 0,
    minHeight: '40%'
  }
}));
export default function ReceivedDetailMobile(props) {
  const data = props.location.state;
  const [path, setPath] = useState(props.location.pathname.split('/')[4]);

  useEffect(() => {
    setPath(path);
  }, []);

  return <>{<Confirmation {...props} data={data} />}</>;
}

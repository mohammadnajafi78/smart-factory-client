import React from 'react';
import { useMediaQuery, useTheme } from '@mui/material';
import TripartiteMobile from './Mobile';
import TripartiteDesktop from './Desktop';
import { useParams } from 'react-router-dom';

function Tripartite(props) {
  const theme = useTheme();
  const { id } = useParams();
  const mobileDevice = useMediaQuery(theme.breakpoints.down('md'));

  return <>{mobileDevice ? <TripartiteMobile /> : <TripartiteDesktop />}</>;
}

export default Tripartite;

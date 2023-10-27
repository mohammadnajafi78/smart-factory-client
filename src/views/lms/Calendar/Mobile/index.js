import { Box } from '@mui/material';
import { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
// import useProfileSearch from 'src/hooks/useProfileSearch';
// import useSaleOrder from 'src/hooks/useSaleOrder';
// import ProfileList from './ProfileList';

export default function ProfileMobile() {
  // const { Profile, searched, getProfile } = useProfileSearch();
  const history = useHistory();
  // const { order, getOrder } = useSaleOrder();

  // useEffect(() => {
  //   getProfile();
  // }, []);

  return (
    <Box sx={{ padding: '12px', display: 'flex', flexDirection: 'column' }}>
      {/* {Profiles && <ProfileList Profiles={searched ? result : Profiles} />} */}
      Profile
    </Box>
  );
}

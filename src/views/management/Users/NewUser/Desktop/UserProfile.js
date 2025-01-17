import React, { useState } from 'react';
import { Box, Avatar, Divider } from '@mui/material';
import { useHistory } from 'react-router-dom';
import InputLabel from 'src/components/Desktop/InputLabel';
import InputLabelHeader from 'src/components/Desktop/InputLabel/InputLabelHeader';
// import Score from './Score';
import useAuth from 'src/hooks/useAuth';

export default function UserProfile(props) {
  const [data, setData] = useState(props.data);
  const history = useHistory();
  const { logout } = useAuth();

  // useEffect(() => {
  //   httpService.get(`${API_BASE_URL}/api/users/get_user_profile/`).then(res => {
  //     if (res.status === 200) {
  //       setData(res.data);
  //     }
  //   });
  // }, []);

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'row',
        // alignItems: 'flex-start',
        padding: '20px',
        gap: '30px',
        // alignItems: 'flex-start',
        justifyContent: 'flex-start',
        width: '100%',
        // margin: '100px 40px 40px 170px',
        backgroundColor: 'white'
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '0px 40px 60px',
          gap: '20px',
          width: '25%'
        }}
      >
        <Avatar
          alt={data?.user?.first_name}
          src={data?.user?.user_profile_image}
          sx={{
            width: 160,
            height: 160
          }}
        />

        {/* <InputLabel style={{ color: '#00346D' }}>{data?.mobile}</InputLabel>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            padding: '2px 6px !important',
            height: '22px',
            background: '#E3E3E3',
            borderRadius: '4px',
            color: '#4F4C4D'
          }}
        >
          <Star style={{ width: '27px', height: '18px', color: '#A7A5A6' }} />
          <InputLabel style={{ color: '#4F4C4D', fontSize: '' }}>
            {data?.user_club?.grade_info?.name}
          </InputLabel>
        </Box> */}
      </Box>
      <Divider
        // variant="middle"
        light={true}
        orientation="vertical"
        // sx={{ margin: '3px 0px', width: '100%' }}
      />
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          // padding: '0px 40px 60px',
          gap: '20px',
          width: '75%'
        }}
      >
        <Box>
          <InputLabelHeader style={{ color: '#00346D' }}>
            {data?.user?.first_name + ' ' + data?.user?.last_name}
          </InputLabelHeader>
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              width: '100%',
              marginTop: '12px'
            }}
          >
            <div style={{ display: 'inline-flex' }}>
              <InputLabel style={{ color: '#00AAB5' }}>کدملی:</InputLabel>
              <InputLabel style={{ color: '#335D8A' }}>
                {data?.user?.national_id}
              </InputLabel>
            </div>
            <div style={{ display: 'inline-flex' }}>
              <InputLabel style={{ color: '#00AAB5' }}>موبایل :</InputLabel>
              <InputLabel style={{ color: '#335D8A' }}>
                {data?.user?.mobile}
              </InputLabel>
            </div>
            <div style={{ display: 'inline-flex' }}>
              <InputLabel style={{ color: '#00AAB5' }}>
                شماره پرسنلی :
              </InputLabel>
              <InputLabel style={{ color: '#335D8A' }}>
                {data?.user?.username}
              </InputLabel>
            </div>
          </Box>
        </Box>
        <Divider
          variant="middle"
          light={true}
          sx={{ margin: '3px 0px', width: '100%' }}
        />
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            // padding: '0px 30px ',
            gap: '16px',
            width: '100%'
          }}
        >
          <InputLabelHeader style={{ color: '#00346D' }}>آدرس</InputLabelHeader>
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: 'repeat(2, 1fr)',
              width: '100%'
            }}
          >
            <div style={{ display: 'inline-flex' }}>
              <InputLabel style={{ color: '#00AAB5' }}>شهر:</InputLabel>
              <InputLabel style={{ color: '#335D8A' }}>
                {data?.location?.city_name}
              </InputLabel>
            </div>
            <div style={{ display: 'inline-flex' }}>
              <InputLabel style={{ color: '#00AAB5' }}>کد پستی:</InputLabel>
              <InputLabel style={{ color: '#335D8A' }}>
                {data?.location?.postal_code}
              </InputLabel>
            </div>
          </Box>
          <div style={{ display: 'inline-flex' }}>
            <InputLabel style={{ color: '#00AAB5' }}>آدرس:</InputLabel>
            <InputLabel style={{ color: '#335D8A' }}>
              {data?.location?.address}
            </InputLabel>
          </div>
        </Box>
        <Divider
          variant="middle"
          light={true}
          sx={{ margin: '3px 0px', width: '100%' }}
        />
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            // padding: '0px 30px ',
            gap: '16px',
            width: '100%'
          }}
        >
          <InputLabelHeader style={{ color: '#00346D' }}>
            اطلاعات شغلی
          </InputLabelHeader>
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: 'repeat(1, 1fr)',
              width: '100%',
              gap: '20px'
            }}
          >
            <div style={{ display: 'inline-flex' }}>
              <InputLabel style={{ color: '#00AAB5' }}>فعالیت:</InputLabel>
              <InputLabel style={{ color: '#335D8A' }}>
                {data?.user?.user_type_list
                  .map(option => option.translate)
                  .toString()}
              </InputLabel>
            </div>
            <div style={{ display: 'inline-flex' }}>
              <InputLabel style={{ color: '#00AAB5' }}>شرکت:</InputLabel>
              <InputLabel style={{ color: '#335D8A' }}>
                {data?.company?.location_info?.city_name}
              </InputLabel>
            </div>
          </Box>
          <div style={{ display: 'inline-flex' }}>
            <InputLabel style={{ color: '#00AAB5' }}>آدرس:</InputLabel>
            <InputLabel style={{ color: '#335D8A' }}>
              {data?.company?.location_info?.address}
            </InputLabel>
          </div>
        </Box>
      </Box>
    </Box>
  );
}

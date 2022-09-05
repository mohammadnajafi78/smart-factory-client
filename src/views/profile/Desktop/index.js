import React, { useEffect, useState } from 'react';
import { Box, Avatar, Button, Divider } from '@mui/material';
import { useHistory } from 'react-router-dom';
import InputLabel from 'src/components/Desktop/InputLabel';
import InputLabelHeader from 'src/components/Desktop/InputLabel/InputLabelHeader';
import { Star } from 'react-feather';
import Score from './Score';
import { ArrowBack } from '@mui/icons-material';
import profileImg from 'src/assets/img/icons/profile.png';
import edit from 'src/assets/img/icons/edit.svg';
import exit from 'src/assets/img/icons/exit.svg';
import useAuth from 'src/hooks/useAuth';
import httpService from 'src/utils/httpService';
import { API_BASE_URL } from 'src/utils/urls';

export default function ProfileDesktop(props) {
  const [data, setData] = useState();
  const history = useHistory();
  const { logout } = useAuth();

  useEffect(() => {
    httpService.get(`${API_BASE_URL}/api/users/get_user_profile/`).then(res => {
      if (res.status === 200) {
        setData(res.data);
      }
    });
  }, []);

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
        margin: '100px 40px 40px 170px',
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
          alt={data?.first_name}
          src={data?.user_profile_image}
          sx={{
            width: 160,
            height: 160
          }}
        />
        <InputLabelHeader style={{ color: '#00346D' }}>
          {data?.first_name + ' ' + data?.last_name}
        </InputLabelHeader>
        <InputLabel style={{ color: '#00346D' }}>{data?.mobile}</InputLabel>
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
        </Box>
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
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            // padding: '0px 30px 0px 20px',
            gap: '250px',
            width: '100%'
          }}
        >
          <Score />
          <Button
            color="primary"
            fullWidth
            type="submit"
            variant={'outlined'}
            sx={{
              color: '#00346D',
              backgroundColor: '#ECF1F8',
              height: '44px',
              borderRadius: '8px',
              border: '0.733333px solid #00346D',
              fontSize: '12px',
              display: 'flex',
              justifyContent: 'space-between',
              padding: '12px 11px',
              fontWeight: 400,
              width: '20%',
              margin: 0,
              fontFamily: 'IRANSans'
            }}
          >
            انتقال امتیاز
            <ArrowBack color="#00346D" style={{ fontSize: '16px' }} />
          </Button>
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
                {data?.user_location?.city_name}
              </InputLabel>
            </div>
            <div style={{ display: 'inline-flex' }}>
              <InputLabel style={{ color: '#00AAB5' }}>کد پستی:</InputLabel>
              <InputLabel style={{ color: '#335D8A' }}>۱۲۳۴۵۶۷۸۹</InputLabel>
            </div>
          </Box>
          <div style={{ display: 'inline-flex' }}>
            <InputLabel style={{ color: '#00AAB5' }}>آدرس:</InputLabel>
            <InputLabel style={{ color: '#335D8A' }}>
              {data?.user_location?.address}
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
                {data?.user_type_list
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
        <Divider
          variant="middle"
          light={true}
          sx={{ margin: '3px 0px', width: '100%' }}
        />
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
            width: '100%',
            height: '80px'
          }}
        >
          <Box
            sx={{ display: 'inline-flex', cursor: 'pointer' }}
            onClick={() => {
              history.push({
                pathname: '/profile/edit',
                state: {
                  data: data
                }
              });
            }}
          >
            <img src={edit} width="20px" height="20px" />
            <InputLabel style={{ color: '#00AAB5' }}>ویرایش اطلاعات</InputLabel>
          </Box>
          <Box
            sx={{ display: 'inline-flex', cursor: 'pointer' }}
            onClick={() => logout()}
          >
            <img src={exit} width="20px" height="20px" />
            <InputLabel style={{ color: '#ED1C24' }}>
              خروج از حساب کاربری
            </InputLabel>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

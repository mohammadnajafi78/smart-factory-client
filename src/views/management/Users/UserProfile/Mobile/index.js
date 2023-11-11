import React, { useEffect, useState } from 'react';
import { Avatar, Box, Button } from '@mui/material';
import InputLabel from 'src/components/Mobile/InputLabel';
import httpService from 'src/utils/httpService';
import { API_BASE_URL } from 'src/utils/urls';
import ConfirmButton from 'src/components/Mobile/Button/Confirm';
import { Star } from 'react-feather';
import Main from './Main';
import InputLabelHeader from 'src/components/Mobile/InputLabel/InputLabelHeader';
import EditSquare from 'src/assets/img/icons/edit_square.svg';
import ProfileEdit from 'src/assets/img/icons/profileEdit.svg';
import { useSnackbar } from 'notistack';

export default function ProfileMobile() {
  const [data, setData] = useState(null);
  const [editable, setEditable] = useState(false);
  const [profileImage, setProfileImage] = useState(null);
  const { enqueueSnackbar } = useSnackbar();

  function getData() {
    setData(null);
    httpService
      .get(`${API_BASE_URL}/api/users/get_user_profile/`)
      .then(res => {
        if (res.status === 200) {
          setData(res.data);
        }
      })
      .catch(ex => {
        if (ex.response.status === 417) {
          enqueueSnackbar(ex.response.data.error, { variant: 'error' });
        } else {
          enqueueSnackbar('مشکلی پیش آمده! لطفا دوباره سعی کنید', {
            variant: 'error'
          });
        }
      });
  }

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    if (profileImage !== null) {
      const formData = new FormData();
      formData.append('profile_image', profileImage);
      httpService
        .post(`${API_BASE_URL}/api/users/update_user/`, formData)
        .then(res => {
          if (res.status === 200) {
            setProfileImage(null);
            getData();
          }
        })
        .catch(ex => {
          if (ex.response.status === 417) {
            enqueueSnackbar(ex.response.data.error, { variant: 'error' });
          } else {
            enqueueSnackbar('مشکلی پیش آمده! لطفا دوباره سعی کنید', {
              variant: 'error'
            });
          }
        });
    }
  }, [profileImage]);

  return (
    <>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-end',
          paddingTop: '25px',
          gap: '12px',
          alignItems: 'center',
          justifyContent: 'flex-start',
          width: '100%'
        }}
      >
        {data && (
          <>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'flex-start',
                padding: '0px 20px 20px',
                gap: '20px',
                width: '100%'
              }}
            >
              <Avatar
                alt={data?.first_name}
                src={data?.user_profile_image}
                sx={{
                  width: 100,
                  height: 100
                }}
              />
              <Button
                sx={{
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignItems: 'center',
                  padding: '10px 9px 10px 11px',
                  gap: '10px',

                  position: 'absolute',
                  width: '32px',
                  minWidth: '30.38px',
                  height: '30.4px',
                  left: '30px',
                  top: '150px',
                  backgroundColor: '#DDF5F6',
                  borderRadius: '8px'
                }}
                component="label"
                onChange={event => {
                  setProfileImage(event.target.files[0]);
                }}
              >
                <img src={EditSquare} width="19px" height={'19px'} />
                <input type="file" hidden multiple={false} />
              </Button>
              <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                <InputLabelHeader
                  style={{ color: '#00346D', fontSize: '20px' }}
                >
                  {data?.first_name + ' ' + data?.last_name}
                </InputLabelHeader>
                <InputLabel style={{ color: '#00346D' }}>
                  {data?.user_id}
                </InputLabel>
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                    padding: '3px !important',
                    // height: '22px',
                    background: '#E3E3E3',
                    borderRadius: '4px',
                    color: '#4F4C4D'
                  }}
                >
                  <Star
                    style={{ width: '27px', height: '18px', color: '#A7A5A6' }}
                  />
                  <InputLabel style={{ color: '#4F4C4D' }}>
                    {data?.user_club?.grade_info?.name}
                  </InputLabel>
                  {/* <InputLabel style={{ color: '#4F4C4D', fontSize: '' }}>
                {data?.user_club?.grade_info?.total_credit}
              </InputLabel> */}
                </Box>
              </Box>
            </Box>
            {editable === false && (
              <ConfirmButton
                style={{
                  width: '90%',
                  backgroundColor: '#CCEEF0',
                  color: '#00AAB5'
                }}
                onClick={() => setEditable(true)}
              >
                <img src={ProfileEdit} style={{ marginLeft: '5px' }} />
                ویرایش پروفایل
              </ConfirmButton>
            )}
            <Main
              data={data}
              editable={editable}
              setEditable={setEditable}
              getData={() => getData()}
            />
          </>
        )}
        {/* <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '0px',
            width: '98%'
          }}
        >
          <InputLabel style={{ color: '#6685A7' }}>سطح شما</InputLabel>
          <InputLabel style={{ color: '#00346D' }}>
            {data?.user_club?.grade_info?.name}
          </InputLabel>
        </Box>
        <Divider variant="middle" sx={{ margin: '3px 0px', width: '98%' }} />
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '0px',
            width: '98%'
          }}
          onClick={() =>
            history.push({
              pathname: '/profile/detail',
              state: {
                data: data
              }
            })
          }
        >
          <InputLabel style={{ color: '#00346D' }}>اطلاعات کاربری</InputLabel>
          <KeyboardArrowLeft style={{ color: '#00346D' }} />
        </Box>
        <Divider variant="middle" sx={{ margin: '3px 0px', width: '98%' }} />
        <InputLabel
          style={{ color: '#ED1C24', cursor: 'pointer' }}
          onClick={() => {
            logout();
          }}
        >
          خروج از حساب کاربری
        </InputLabel> */}
      </Box>
    </>
  );
}

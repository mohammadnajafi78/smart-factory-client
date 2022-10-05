import React, { useEffect, useState } from 'react';
import { Box, Avatar, Button, Divider, Drawer, TextField } from '@mui/material';
import { useHistory } from 'react-router-dom';
import InputLabel from 'src/components/Desktop/InputLabel';
import InputLabelHeader from 'src/components/Desktop/InputLabel/InputLabelHeader';
import { Minus, Plus, Star } from 'react-feather';
import Score from './Score';
import { ArrowBack } from '@mui/icons-material';
import profileImg from 'src/assets/img/icons/profile.png';
import edit from 'src/assets/img/icons/edit.svg';
import exit from 'src/assets/img/icons/exit.svg';
import useAuth from 'src/hooks/useAuth';
import httpService from 'src/utils/httpService';
import { API_BASE_URL } from 'src/utils/urls';
import CustomizedDialogs from 'src/components/Desktop/Dialog';
import { styled } from '@mui/material/styles';
import ConfirmButton from 'src/components/Desktop/Button/Confirm';
import useScore from 'src/hooks/useScore';
import MomentFa from 'src/utils/MomentFa';
import Main from './Main';
import EditSquare from 'src/assets/img/icons/edit_square.svg';
import ProfileEdit from 'src/assets/img/icons/profileEdit.svg';

const CssTextField = styled(TextField)({
  '& .MuiOutlinedInput-input': {
    textAlign: 'center'
  }
});
export default function ProfileDesktop(props) {
  const [data, setData] = useState();
  const [openTransfer, setOpenTransfer] = useState(false);
  const [count, setCount] = useState(0);
  const [userId, setUserId] = useState();
  const [editable, setEditable] = useState(false);
  const history = useHistory();
  const { logout } = useAuth();
  const { setScore } = useScore();
  const [profileImage, setProfileImage] = useState(null);

  function getData() {
    httpService.get(`${API_BASE_URL}/api/users/get_user_profile/`).then(res => {
      if (res.status === 200) {
        setData(res.data);
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
            getData();
          }
        });
    }
  }, [profileImage]);

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
        backgroundColor: 'white',
        overflow: 'auto'
      }}
    >
      {data && (
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            // padding: '0px 40px 60px',
            gap: '20px',
            width: '25%'
          }}
        >
          <Box sx={{ position: 'relative' }}>
            <Avatar
              alt={data?.first_name}
              src={data?.user_profile_image}
              sx={{
                width: 160,
                height: 160
                // position: 'relative'
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
                left: '20px',
                top: '130px',
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
          </Box>

          <InputLabelHeader style={{ color: '#00346D' }}>
            {data?.first_name + ' ' + data?.last_name}
          </InputLabelHeader>
          <InputLabel style={{ color: '#00346D' }}>{data?.user_id}</InputLabel>
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
          {editable === false && (
            <ConfirmButton
              style={{
                // width: '90%',
                backgroundColor: '#CCEEF0',
                color: '#00AAB5'
              }}
              onClick={() => setEditable(true)}
            >
              <img src={ProfileEdit} style={{ marginLeft: '5px' }} />
              ویرایش پروفایل
            </ConfirmButton>
          )}
        </Box>
      )}
      <Divider
        // variant="middle"
        light={true}
        orientation="vertical"
        // sx={{ margin: '3px 0px', width: '100%' }}
      />
      {data && (
        <Main
          data={data}
          editable={editable}
          setEditable={setEditable}
          getData={getData}
        />
      )}
      {/* <Box
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
            onClick={() => {
              setOpenTransfer(true);
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
            gap: '16px',
            width: '100%'
          }}
        >
          <InputLabelHeader style={{ color: '#00346D' }}>
            اطلاعات هویتی
          </InputLabelHeader>

          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: 'repeat(2, 1fr)',
              width: '100%'
            }}
          >
            <div style={{ display: 'inline-flex' }}>
              <InputLabel style={{ color: '#00AAB5' }}>کدملی:</InputLabel>
              <InputLabel style={{ color: '#335D8A' }}>
                {data?.national_id}
              </InputLabel>
            </div>{' '}
            <div style={{ display: 'inline-flex' }}>
              <InputLabel style={{ color: '#00AAB5' }}>تاریخ تولد:</InputLabel>
              <InputLabel style={{ color: '#335D8A' }}>
                {MomentFa(data?.birth_date || new Date())}
              </InputLabel>
            </div>
            <div style={{ display: 'inline-flex' }}>
              <InputLabel style={{ color: '#00AAB5' }}>شماره تلفن:</InputLabel>
              <InputLabel style={{ color: '#335D8A' }}>
                {data?.mobile}
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
            height: '80px',
            padding: '30px 0px'
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
      </Box> */}
      {/* <CustomizedDialogs
        // anchor={'bottom'}
        open={openTransfer}
        handleClose={() => setOpenTransfer(false)}
        // classes={{
        //   paper: classes.paper
        // }}
        title={'انتقال امتیاز'}
        content={
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'flex-start',
              alignItems: 'flex-start',
              padding: '15px 10px 0px',
              gap: '20px',
              background: '#FFFFFF'
              // mb: 1
            }}
          >
            <InputLabel>
              جهت انتقال امتیاز، اطلاعات زیر را وارد کنید:
            </InputLabel>
            <Box sx={{ mt: 2, width: '100%' }}>
              <InputLabel style={{ color: '#7B7979' }}>
                کد کاربر دریافت کننده
              </InputLabel>
              <TextField
                id="address"
                aria-describedby="my-helper-text"
                fullWidth
                sx={{
                  background: '#F2F2F2',
                  borderRadius: '4px',
                  margin: '6px 3px'
                }}
                value={userId}
                onChange={event => setUserId(event.target.value)}
              />
            </Box>

            <Box sx={{ mt: 2, width: '100%' }}>
              <InputLabel style={{ color: '#7B7979' }}>امتیاز</InputLabel>
              <Box sx={{ display: 'flex', flexDirection: 'row', gap: 2 }}>
                <ConfirmButton variant="outlined" onClick={() => setCount(50)}>
                  50 امتیاز
                </ConfirmButton>
                <ConfirmButton variant="outlined" onClick={() => setCount(100)}>
                  100 امتیاز
                </ConfirmButton>
                <ConfirmButton variant="outlined" onClick={() => setCount(200)}>
                  200 امتیاز
                </ConfirmButton>
              </Box>
              <Divider sx={{ m: 2 }} />
              <Box sx={{ display: 'flex', flexDirection: 'row', gap: 3 }}>
                <ConfirmButton
                  variant="outlined"
                  sx={{ width: '50px' }}
                  onClick={() => {
                    setCount(count + 1);
                  }}
                >
                  <Plus />
                </ConfirmButton>
                <CssTextField
                  value={count}
                  onChange={event => setCount(event.target.value)}
                  sx={{ textAlign: 'center' }}
                />
                <ConfirmButton
                  variant="outlined"
                  sx={{ width: '50px' }}
                  onClick={() => {
                    setCount(count - 1);
                  }}
                >
                  <Minus />
                </ConfirmButton>
              </Box>
            </Box>
          </Box>
        }
        actions={
          <Box
            sx={{
              // position: 'absolute',
              // bottom: '0%',
              // width: '55%',
              backgroundColor: 'white',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              height: '60px',
              gap: '12px',
              width: '100%'
              // borderTop: '1px solid #D3D2D2',
              // paddingTop: '5px'
            }}
          >
            <ConfirmButton
              disabled={false}
              variant="outlined"
              style={{ width: '150px' }}
              onClick={() => setOpenTransfer(false)}
            >
              {'لغو'}
            </ConfirmButton>
            <ConfirmButton
              disabled={false}
              style={{ width: '150px' }}
              onClick={() => {
                httpService
                  .post(`${API_BASE_URL}/api/club/user_club/transfer_credit/`, {
                    user_id: userId,
                    credit: count
                  })
                  .then(res => {
                    if (res.status === 200) {
                      setOpenTransfer(false);
                      setScore();
                    }
                  });
              }}
            >
              {'ثبت'}
            </ConfirmButton>
          </Box>
        }
      /> */}
    </Box>
  );
}

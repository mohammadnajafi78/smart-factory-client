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
    setData(null);
    httpService
      .get(
        `${API_BASE_URL}/api/management/user/get_user_profile/?user_id=${props?.location.state.user_id}`
      )
      .then(res => {
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
        .post(`${API_BASE_URL}/api/management/users/update_user/`, formData)
        .then(res => {
          if (res.status === 200) {
            setProfileImage(null);
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
        // margin: '100px 40px 40px 170px',
        backgroundColor: 'white',
        overflow: 'auto',
        height: '83vh'
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
              alt={data?.user?.first_name}
              src={data?.user?.user_profile_image}
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
            {data?.user?.first_name + ' ' + data?.user?.last_name}
          </InputLabelHeader>
          <InputLabel style={{ color: '#00346D' }}>
            {data?.user?.user_id}
          </InputLabel>
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
              {data?.user?.user_club?.grade_info?.name}
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
      <Divider light={true} orientation="vertical" />
      {data && (
        <Main
          data={data}
          editable={editable}
          setEditable={setEditable}
          getData={getData}
        />
      )}
    </Box>
  );
}

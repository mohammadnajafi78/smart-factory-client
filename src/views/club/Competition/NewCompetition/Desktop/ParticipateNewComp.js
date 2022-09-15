import React, { useState } from 'react';
import { Box, Button, IconButton, Divider } from '@mui/material';
import InputLabelHeader from 'src/components/Desktop/InputLabel';
import InputLabel from 'src/components/Desktop/InputLabel';
import Upload from 'src/assets/img/icons/upload.svg';
import ConfirmButton from 'src/components/Desktop/Button/Confirm';
import Delete from 'src/assets/img/icons/delete.svg';
import Attach from 'src/assets/img/icons/attach.svg';
import httpService from 'src/utils/httpService';
import { API_BASE_URL } from 'src/utils/urls';
import Participants from './Participants';

export default function ParticipateNewComp({ selected, setSelected }) {
  const [file, setFile] = useState(null);
  const userId = JSON.parse(localStorage.getItem('user')).user_id;

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        padding: '30px',
        gap: '30px'
      }}
    >
      <InputLabelHeader style={{ fontWeight: 700, fontSize: '20px' }}>
        شرکت در مسابقه
      </InputLabelHeader>
      <InputLabel>{selected?.description}</InputLabel>

      {selected?.participants?.length <= 0 ? (
        <>
          <InputLabel>
            جهت شرکت در مسابقه عکس مورد نظر خود را انتخاب کنید:
          </InputLabel>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              width: '100%',
              marginBottom: '30px'
            }}
          >
            {!file ? (
              <Button
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center',
                  padding: '40px 0px',
                  gap: '30px',
                  width: '480px',
                  height: '150px',
                  border: '2px dashed #99DDE1',
                  borderRadius: '4px',
                  color: '#4F4C4D',
                  fontFamily: 'IRANSans',
                  fontWeight: 400,
                  fontSize: '16px'
                }}
                component="label"
                onChange={event => {
                  console.log('file', event.target.files[0]);
                  setFile(event.target.files[0]);
                }}
              >
                <img src={Upload} with="33px" height="28px" />
                {'انتخاب فایل'}
                <input type="file" hidden multiple={false} />
              </Button>
            ) : (
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'flex-end',
                  alignItems: 'center',
                  padding: '20px 0px 5px',
                  gap: '20px',
                  width: '480px',
                  height: '320px',
                  border: '2px dashed #99DDE1',
                  borderRadius: '4px'
                }}
              >
                <img
                  src={URL.createObjectURL(file)}
                  width="300px"
                  height="180px"
                  style={{ borderRadius: '8px' }}
                />
                <InputLabel style={{ color: '#335D8A' }}>
                  {file.name}
                </InputLabel>
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-around',
                    width: '100%'
                  }}
                >
                  <Button
                    sx={{
                      fontFamily: 'IRANSans',
                      fontSize: '16px',
                      fontWeight: 400
                    }}
                    onClick={() => {
                      setFile(null);
                    }}
                  >
                    <img src={Delete} width="13px" height="13px" />
                    پاک کردن
                  </Button>
                  <Button
                    sx={{
                      fontFamily: 'IRANSans',
                      fontSize: '16px',
                      fontWeight: 400
                    }}
                    component="label"
                    onChange={e => {
                      setFile(e.target.files[0]);
                    }}
                  >
                    <img src={Attach} width="13px" height="20px" />
                    تغییر فایل
                    <input type="file" hidden multiple={false} />
                  </Button>
                </Box>
              </Box>
            )}
          </Box>
        </>
      ) : (
        <Box
          sx={{
            width: '100%',
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center'
          }}
        >
          <Box sx={{ width: '50%' }}>
            <Participants
              data={selected?.participants.filter(f => f.user_id === userId)}
            />
          </Box>
        </Box>
      )}

      {selected?.participants?.length <= 0 && (
        <Box
          sx={{
            position: 'absolute',
            bottom: '0%',
            width: '55%',
            backgroundColor: 'white',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '60px',
            gap: '12px'
          }}
        >
          <ConfirmButton
            disabled={false}
            variant="outlined"
            style={{ width: '150px' }}
            //   onClick={() => setOpen(false)}
          >
            {'لغو'}
          </ConfirmButton>
          <ConfirmButton
            disabled={false}
            style={{ width: '150px' }}
            onClick={() => {
              const formData = new FormData();
              formData.append('files', file);
              formData.append('match_id', selected.match_id);

              httpService
                .post(
                  `${API_BASE_URL}/api/club/match_participant/participate_to_match/`,
                  formData
                )
                .then(res => {
                  if (res.status === 200) {
                    setSelected(res.data);
                  }
                });
            }}
          >
            {'ثبت'}
          </ConfirmButton>
        </Box>
      )}
    </Box>
  );
}

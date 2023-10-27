import React, { useEffect } from 'react';
import { ChevronRight } from '@mui/icons-material';
import ConfirmButton from 'src/components/Desktop/Button/Confirm';
import { Box, Button } from '@mui/material';
import Upload from 'src/assets/img/icons/upload.svg';
import { useState } from 'react';
import { API_BASE_URL } from 'src/utils/urls';
import httpService from 'src/utils/httpService';
import { useSnackbar } from 'notistack';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { Formik } from 'formik';

const AcceptRequest = ({ accept, postInfo, api }) => {
  const history = useHistory();
  const { enqueueSnackbar } = useSnackbar();
  const [file, setFile] = useState();
  const [fieldValue, setFieldValue] = useState();
  const [isSubmitting, setSubmitting] = useState();

  return (
    <>
      <div
        style={{
          background: '#E6EBF0',
          display: 'flex',
          color: '#00AAB5',
          cursor: 'pointer'
        }}
        onClick={accept}
      >
        <ChevronRight style={{ color: '#00AAB5', fontSize: '22px' }} />
        بازگشت
      </div>
      <div
        style={{
          display: 'flex'
        }}
      >
        فایل تخمین هزینه را وارد کنید :
      </div>
      <Formik
        initialValues={{ file: null }}
        onSubmit={(values, { setErrors, setSubmitting }) => {
          setSubmitting(true);
          const formData = new FormData();
          formData.append('DESIGNED_PLAN', values.file);
          formData.append('ref_num', postInfo.ref_num);
          formData.append('action', postInfo.action);
          formData.append('state', postInfo.state);

          httpService
            .post(`${API_BASE_URL}${api}`, formData)
            .then(res => {
              if (res.status === 200) {
                enqueueSnackbar('عدم تایید با موفقیت انجام شد', {
                  variant: 'success'
                });
                setSubmitting(false);
                history.goBack();
              } else {
                setSubmitting(false);
                enqueueSnackbar('دوباره تلاش کنید', {
                  variant: 'error'
                });
              }
            })
            .catch(err => {
              console.log(err);
              setSubmitting(false);
              enqueueSnackbar('دوباره تلاش کنید', {
                variant: 'error'
              });
            });
        }}
      >
        {({
          errors,
          handleBlur,
          handleChange,
          handleSubmit,
          isSubmitting,
          touched,
          values,
          setFieldValue
        }) => (
          <form noValidate onSubmit={handleSubmit}>
            <Box sx={{ my: 3 }}>
              <Button
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center',
                  padding: '30px 0px',
                  gap: '5px',
                  width: '100%',
                  height: '150px',
                  border: '2px dashed #99DDE1',
                  borderRadius: '4px',
                  color: '#4F4C4D',
                  fontFamily: 'IRANSans',
                  fontWeight: 400,
                  fontSize: '16px',
                  background: '#ffff'
                }}
                component="label"
                onChange={event => {
                  setFile(event.target.files[0]);
                  setFieldValue('file', event.target.files[0]);
                }}
              >
                {file ? (
                  <>
                    <img src={Upload} width="33px" height="28px" />
                    {file?.name}
                    <input hidden id="file" name="file" type="file" />
                  </>
                ) : (
                  <>
                    <img src={Upload} width="33px" height="28px" />
                    {'انتخاب فایل'}

                    <h3 style={{ fontSize: '14px' }}>حداکثر حجم فایل 3Mb</h3>
                    <h5 style={{ fontSize: '10px' }}>
                      فرمت فایل ها : PDF, WORD,...
                    </h5>
                    <input hidden id="file" name="file" type="file" />
                  </>
                )}
              </Button>
            </Box>
            <div
              style={{
                display: 'flex',
                gap: '10px',
                justifyContent: 'flex-end'
              }}
            >
              <ConfirmButton
                style={{
                  background: '#ffff',
                  color: '#00AAB5',
                  border: '1px solid #00AAB5',
                  width: '90px',
                  height: '32px',
                  fontSize: '13px',
                  padding: '0'
                }}
                disabled={false}
                onClick={accept}
              >
                لغو
              </ConfirmButton>
              <ConfirmButton
                style={{
                  width: '125px',
                  height: '32px',
                  fontSize: '13px',
                  padding: '0'
                }}
                disabled={false}
                type={'submit'}
                loading={isSubmitting}
              >
                ثبت
              </ConfirmButton>
            </div>
          </form>
        )}
      </Formik>
    </>
  );
};

export default AcceptRequest;

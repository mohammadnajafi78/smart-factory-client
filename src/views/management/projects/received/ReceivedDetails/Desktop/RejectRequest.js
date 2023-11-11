import { ChevronRight } from '@mui/icons-material';
import { Formik } from 'formik';
import React from 'react';
import ConfirmButton from 'src/components/Desktop/Button/Confirm';
import httpService from 'src/utils/httpService';
import { API_BASE_URL } from 'src/utils/urls';
import { useSnackbar } from 'notistack';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
const RejectRequest = ({ cancel, num, api, state, postInfo }) => {
  const history = useHistory();
  const { enqueueSnackbar } = useSnackbar();

  return (
    <>
      <div
        style={{
          display: 'flex',
          color: '#00AAB5',
          cursor: 'pointer'
        }}
        onClick={cancel}
      >
        <ChevronRight style={{ color: '#00AAB5', fontSize: '22px' }} />
        بازگشت
      </div>
      <div
        style={{
          display: 'flex'
        }}
      >
        علت عدم تایید درخواست را وارد کنید :
      </div>
      <Formik
        //       ref_num: data?.ref_num,
        // action: 'Reject',
        // state: 'Designer'

        initialValues={{ comment: '' }}
        onSubmit={(values, { setErrors, setSubmitting }) => {
          // const formData = new FormData();
          // formData.append('ref_num', postInfo.ref_num);
          // formData.append('action', postInfo.action);
          // formData.append('state', postInfo.state);
          // formData.append('comment', values.comment);

          setSubmitting(true);
          httpService
            .post(`${API_BASE_URL}${api}`, {
              ...postInfo,
              comment: values.comment
            })
            .then(res => {
              if (res.status === 200) {
                // enqueueSnackbar('عدم تایید با موفقیت انجام شد', {
                //   variant: 'success'
                // });
                setSubmitting(false);
                history.goBack();
              } else {
                setSubmitting(false);
                // enqueueSnackbar('دوباره تلاش کنید', {
                //   variant: 'error'
                // });
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
        }}
      >
        {({
          errors,
          handleBlur,
          handleChange,
          handleSubmit,
          isSubmitting,
          touched,
          values
        }) => (
          <form noValidate onSubmit={handleSubmit}>
            <div>
              <textarea
                id="comment"
                type="text"
                placeholder="بنویسید..."
                style={{
                  width: '100%',
                  height: '100px',
                  padding: '12px',
                  background: '#ffff',
                  borderRadius: '4px',
                  margin: '6px 3px',
                  border: 'none'
                }}
                value={values.comment}
                onChange={handleChange}
              />
            </div>
            <div
              style={{
                display: 'flex',
                gap: '10px',
                alignSelf: 'end'
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
                onClick={cancel}
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
                type="submit"
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

export default RejectRequest;

import { Box } from '@mui/material';
import { useHistory } from 'react-router-dom';
import DesignServices from 'src/assets/img/design_services.png';
import Engineering from 'src/assets/img/engineering.png';
import Tune from 'src/assets/img/tune.png';
import ConfirmButton from 'src/components/Mobile/Button/Confirm';
import InputLabel from 'src/components/Mobile/InputLabel';
import InputLabelHeader from 'src/components/Mobile/InputLabel/InputLabelHeader';
import CustomizedProgressBars from 'src/components/Mobile/ProgressBar';
import { useSnackbar } from 'notistack';

import makeStyles from '@mui/styles/makeStyles';
import httpService from 'src/utils/httpService';
import { API_BASE_URL } from 'src/utils/urls';

const useStyles = makeStyles(theme => ({
  paper: {
    borderRadius: '20px 20px 0px 0px',
    zIndex: 999,
    position: 'fixed',
    bottom: 0,
    minHeight: '40%'
  }
}));
function ConfirmInfoMobile(props) {
  let data = props.location.state;
  const { enqueueSnackbar } = useSnackbar();

  const history = useHistory();

  return (
    <Box sx={{ mt: '20px' }}>
      <InputLabelHeader style={{ marginRight: '10px' }}>تایید</InputLabelHeader>
      <CustomizedProgressBars percentage={100} />
      <Box sx={{ mt: 2, ml: 2 }}>
        <InputLabel>خلاصه درخواست طراحی شما</InputLabel>
      </Box>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '0px',
          // gap: '159px',
          position: 'absolute',
          width: '90%',
          height: '80%',
          left: '20px',
          mt: 2
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            border: '1px solid #CCD6E2',
            borderRadius: '4px',
            padding: '5px'
          }}
        >
          <Box sx={{ display: 'inline-flex', mt: 2 }}>
            <img src={DesignServices} style={{ marginLeft: '2px' }} />
            <InputLabel style={{ color: '#335D8A', fontSize: '14px' }}>
              نوع طراحی
            </InputLabel>
          </Box>
          <Box sx={{ display: 'inline-flex', mt: 1, ml: 3 }}>
            <InputLabel style={{ color: '#335D8A', fontSize: '14px' }}>
              آبرسانی- گرمایش ....
            </InputLabel>
          </Box>

          <Box sx={{ display: 'inline-flex', mt: 2 }}>
            <img src={Tune} style={{ marginLeft: '2px' }} />
            <InputLabel style={{ color: '#335D8A', fontSize: '14px' }}>
              نوع سیستم کنترل
            </InputLabel>
          </Box>
          <Box sx={{ display: 'inline-flex', mt: 1, ml: 3 }}>
            <InputLabel style={{ color: '#335D8A', fontSize: '14px' }}>
              ترموستاتیک
            </InputLabel>
          </Box>

          <Box sx={{ display: 'inline-flex', mt: 2 }}>
            <img src={Engineering} style={{ marginLeft: '2px' }} />
            <InputLabel style={{ color: '#335D8A', fontSize: '14px' }}>
              طراحی توسط
            </InputLabel>
          </Box>
          <Box sx={{ display: 'inline-flex', mt: 1, ml: 3 }}>
            <InputLabel style={{ color: '#335D8A', fontSize: '14px' }}>
              شرکت
            </InputLabel>
          </Box>

          <Box
            sx={{
              backgroundColor: '#E6EBF0',
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
              borderRadius: '4px',
              padding: '6px 10px',
              m: 1
            }}
          >
            <InputLabel style={{ color: '#335D8A', fontSize: '14px' }}>
              فرم اطلاعات فنی طراحی
            </InputLabel>
            <InputLabel style={{ color: '#335D8A', fontSize: '14px' }}>
              تکمیل شده
            </InputLabel>
          </Box>
          <Box
            sx={{
              backgroundColor: '#E6EBF0',
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
              borderRadius: '4px',
              padding: '6px 10px',
              m: 1
            }}
          >
            <InputLabel style={{ color: '#335D8A', fontSize: '14px' }}>
              نقشه AutoCad پروژه
            </InputLabel>
            <InputLabel style={{ color: '#335D8A', fontSize: '14px' }}>
              آپلود شده
            </InputLabel>
          </Box>
        </Box>

        <Box
          sx={{
            display: 'inline-flex',
            justifyContent: 'center',
            gap: 2
          }}
        >
          {/* <ConfirmButton
            disabled={false}
            variant="outlined"
            onClick={() => {
              history.push({
                pathname: '/project/request/new/design/designerInfo',
                state: data
              });
            }}
          >
            {'بازگشت'}
          </ConfirmButton> */}
          <ConfirmButton
            onClick={() => {
              httpService
                .post(`${API_BASE_URL}/api/project/design/submit_design/`, {
                  ref_num: data?.ref_num
                })
                .then(res => {
                  if (res.status === 200) {
                    history.push('/project/request/');
                  }
                })
                .catch(ex => {
                  if (ex.response.status === 417) {
                    enqueueSnackbar(ex.response.data.error, {
                      variant: 'error'
                    });
                  } else {
                    enqueueSnackbar('مشکلی پیش آمده! لطفا دوباره سعی کنید', {
                      variant: 'error'
                    });
                  }
                });
            }}
          >
            {'ثبت'}
          </ConfirmButton>
        </Box>
      </Box>
    </Box>
  );
}

export default ConfirmInfoMobile;

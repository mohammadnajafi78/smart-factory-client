import { Box } from '@mui/material';
import { useHistory } from 'react-router-dom';
import DesignServices from 'src/assets/img/design_services.png';
import Tune from 'src/assets/img/tune.png';
import ConfirmButton from 'src/components/Desktop/Button/Confirm';
import InputLabel from 'src/components/Desktop/InputLabel';
import InputLabelHeader from 'src/components/Desktop/InputLabel/InputLabelHeader';
import CustomizedProgressBars from 'src/components/Desktop/ProgressBar';

import makeStyles from '@mui/styles/makeStyles';

const useStyles = makeStyles(theme => ({
  paper: {
    borderRadius: '20px 20px 0px 0px',
    zIndex: 999,
    position: 'fixed',
    bottom: 0,
    minHeight: '40%'
  }
}));
function ConfirmInfoDesktop(props) {
  // let data = props.location.state;

  const history = useHistory();

  return (
    <Box
      sx={{
        mt: '80px',
        ml: '120px',
        width: '400px',
        background: 'white',
        padding: '20px',
        height: '650px',
        borderRadius: '8px'
      }}
    >
      <InputLabelHeader style={{ marginRight: '10px' }}>تایید</InputLabelHeader>
      <CustomizedProgressBars activeStep={2} steps={['', '', '']} />
      <Box sx={{ mt: 2, ml: 2 }}>
        <InputLabel>خلاصه درخواست BOM شما</InputLabel>
      </Box>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '0px',
          width: '100%',
          height: '80%',
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
              نوع سیستم
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
          <ConfirmButton
            disabled={false}
            variant="outlined"
            // onClick={() => {
            //   history.push({
            //     pathname: '/project/project/new/2',
            //     state: data
            //   });
            // }}
            type={'button'}
          >
            {'بازگشت'}
          </ConfirmButton>
          <ConfirmButton type="submit">{'ثبت'}</ConfirmButton>
        </Box>
      </Box>
    </Box>
  );
}

export default ConfirmInfoDesktop;

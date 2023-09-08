import { Box } from '@mui/material';
import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import DesignServices from 'src/assets/img/design_services.png';
import Domain from 'src/assets/img/domain22.png';
import LocationAway from 'src/assets/img/location_away.png';
import PersonFilled from 'src/assets/img/person_filled.png';
import Tune from 'src/assets/img/tune.png';
import ConfirmButton from 'src/components/Mobile/Button/Confirm';
import InputLabel from 'src/components/Mobile/InputLabel';
import InputLabelHeader from 'src/components/Mobile/InputLabel/InputLabelHeader';
import CustomizedProgressBars from 'src/components/Mobile/ProgressBar';

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
function ConfirmInfoMobile(props) {
  // let data = props.location.state;
  const [requestTypeList, setRequestTypeList] = useState(null);
  const [requestTypeId, setRequestTypeId] = useState(null);
  const [projectList, setProjectList] = useState(null);
  const [projectId, setProjectId] = useState(null);
  const [selected, setSelected] = useState('BTS_WE');
  const [openDesigner, setOpenDesigner] = useState(false);
  const [openOther, setOpenOther] = useState(false);
  const classes = useStyles();

  let types = [
    { name: 'BTS_WE', label: 'طراحی توسط شرکت', image: Domain },
    { name: 'BTS_DESIGNER', label: 'طراح عضو اپلیکیشن', image: LocationAway },
    { name: 'OTHER', label: 'طراح غیر عضو', image: PersonFilled }
  ];

  useEffect(() => {
    if (selected === 'BTS_DESIGNER') {
      setOpenDesigner(true);
    } else if (selected === 'OTHER') {
      setOpenOther(true);
    }
  }, [selected]);

  const history = useHistory();

  return (
    <Box sx={{ mt: '20px' }}>
      <InputLabelHeader style={{ marginRight: '10px' }}>تایید</InputLabelHeader>
      <CustomizedProgressBars percentage={100} />
      <Box sx={{ mt: 2, ml: 2 }}>
        <InputLabel>خلاصه درخواست BOM شما</InputLabel>
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

export default ConfirmInfoMobile;

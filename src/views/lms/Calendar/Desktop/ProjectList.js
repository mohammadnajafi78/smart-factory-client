import React, { useState, useEffect } from 'react';
import { Box } from '@mui/material';
import ConfirmButton from 'src/components/Desktop/Button/Confirm';
import FilterButton from 'src/components/Desktop/Button/Filter';
import { useHistory } from 'react-router-dom';
import InputLabel from 'src/components/Desktop/InputLabel';
import Scan from 'src/assets/img/icons/scan-qr.svg';
import InputLabelHeader from 'src/components/Desktop/InputLabel/InputLabelHeader';
import httpService from 'src/utils/httpService';
import { API_BASE_URL } from 'src/utils/urls';
import CustomizedDialogs from 'src/components/Desktop/Dialog';
import { QrReader } from 'react-qr-reader';
import ProjectItem from './ProjectItem';
import DomainAdd from 'src/assets/img/domain_add.png';

export default function ProjectListDesktop({
  selected,
  setSelected,
  refresh,
  setRefresh
}) {
  const history = useHistory();
  const [project, setProject] = useState(null);
  const [openScan, setOpenScan] = useState(null);
  const [all, setAll] = useState(null);
  const [filters, setFilters] = useState(null);
  const [filterSelected, setFilterSelected] = useState(1);
  const [scan, setScan] = useState(null);

  function getData() {
    httpService.post(`${API_BASE_URL}/api/project/get_sent/`).then(res => {
      if (res.status === 200) {
        setProject(res.data);
        setAll(res.data);
      }
    });
  }

  // useEffect(() => {
  //   httpService.get(`${API_BASE_URL}/api/club/gift_type/`).then(res => {
  //     if (res.status === 200) {
  //       setFilters(res.data);
  //     }
  //   });
  // }, []);

  useEffect(() => {
    getData();
  }, [refresh]);

  function handleScan(data) {
    setScan(data);
  }

  function handleError(err) {
    console.error(err);
  }

  return (
    <>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          // alignItems: 'center',
          padding: '12px 12px 0px',
          gap: '10px',
          width: '100%',
          padding: '40px 30px 0px',
          paddingBottom: '40px'
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}
        >
          <InputLabelHeader style={{ color: '#00346D' }}>
            پروژه ها
          </InputLabelHeader>
          <ConfirmButton
            style={{
              margin: '0px 10px',
              backgroundColor: '#00346D',
              width: '150px'
            }}
            onClick={() => history.push('/project/project/new/1')}
          >
            <img src={DomainAdd} style={{ marginLeft: '3px' }} />
            ثبت پروژه جدید
          </ConfirmButton>
        </Box>

        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            padding: '12px 0px 60px',
            gap: '14px',
            overflowY: 'auto'
          }}
        >
          {project &&
            project.map((item, index) => {
              return (
                <ProjectItem
                  data={item}
                  key={index}
                  selected={selected}
                  setSelected={setSelected}
                />
              );
            })}
        </Box>
      </Box>
      {/* <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          padding: '12px 0px 0px',
          gap: '14px',
          // height: '640px',
          overflowY: 'auto'
        }}
      >
        <Box
          sx={{
            position: 'absolute',
            bottom: '0%',
            width: '35.6%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'white',
            height: '60px',
            // padding: '10px',
            gap: '10px',
            padding: '0px 30px 0px'
          }}
        >
          <ConfirmButton
            style={{
              margin: '0px 10px',
              backgroundColor: '#00346D',
              width: '70%'
            }}
            onClick={() => setOpenScan(true)}
          >
            <img src={Scan} style={{ marginLeft: '3px' }} />
            دریافت جایزه
          </ConfirmButton>
        </Box>
      </Box> */}

      {/* <CustomizedDialogs
        open={openScan}
        handleClose={() => setOpenScan(false)}
        title={'بارکد'}
        content={
          <Box sx={{ width: '300px', height: '300px' }}>
            <QrReader
              delay={100}
              //style={previewStyle}
              onError={handleError}
              onScan={handleScan}
              onResult={(result, error) => {
                if (result) {
                  if (result) {
                    if (result.text) {
                      setScan(result.text);
                      setOpenScan(false);
                      httpService
                        .post(
                          `${API_BASE_URL}/api/club/user_gifts/transfer_gift/`,
                          {
                            qr_code: result.text
                          }
                        )
                        .then(res => {
                          if (res.status === 200) {
                            // alert('انتقال انجام شد');
                            getData();
                          }
                        });
                    }
                  }
                  console.log('result scan', result);
                }

                if (!!error) {
                  console.info(error);
                }
              }}
              constraints={{
                facingMode: 'environment'
              }}
            />
            <p>{scan}</p>
          </Box>
        }
      /> */}
    </>
  );
}

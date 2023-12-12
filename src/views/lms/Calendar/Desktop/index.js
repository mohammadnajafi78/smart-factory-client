import React, { useEffect, useState } from 'react';
import { Box } from '@mui/material';
// import ProfileList from './ProfileList';
import Received from 'src/assets/img/icons/received.svg';
import httpService from 'src/utils/httpService';
import { API_BASE_URL } from 'src/utils/urls';
// import ProfileItemSelected from './ProfileItemSelected';
import { useSnackbar } from 'notistack';
import MomentFa from 'src/utils/MomentFa';

export default function ProfileDesktop() {
  const [selected, setSelected] = useState(null);
  const [refresh, setRefresh] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const [data, setData] = useState([]);

  useEffect(() => {
    httpService
      .get(`${API_BASE_URL}/api/lms/course/get_calendar/?start_date=2023-09-10`)
      .then(res => {
        if (res.status === 200) {
          setData(res.data);
          console.log('calendar', res.data);
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
  }, []);

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'row',
        width: '100%',
        marginTop: '50px',
        marginRight: '165px'
      }}
    >
      {data.length > 0 && (
        <table style={{ height: '350px' }}>
          {/* <tr> */}
          {data.map((item, index) => {
            return (
              <tr>
                <th style={{ padding: '0px 10px' }}>{MomentFa(item.date)}</th>
                {item.sessions.length > 0 &&
                  item.sessions.map((sess, index) => {
                    return (
                      <td style={{ padding: '0px 10px' }}>
                        {sess.session_num}
                      </td>
                    );
                  })}
              </tr>
            );
          })}
          {/* </tr> */}

          {/* {data.map((item, index) => {
            var arr = [];
            for (var i = 0; i < index; i++) {
              arr.push(i.toString());
            }
            return (
              <>
                {item.sessions.length > 0 &&
                  item.sessions.map((sess, index) => {
                    return (
                      <tr>
                        {arr.map((it, key) => {
                          return <td>{``}</td>;
                        })}
                        <td>{sess.session_num}</td>
                      </tr>
                    );
                  })}
              </>
            );
          })} */}
        </table>
      )}
    </div>
  );
}

import { Box, Divider } from '@mui/material';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import makeStyles from '@mui/styles/makeStyles';
import { useSnackbar } from 'notistack';
import { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import ConfirmButton from 'src/components/Mobile/Button/Confirm';
import InputLabel from 'src/components/Mobile/InputLabel';
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
export default function ExamQuestionDesktop(props) {
  const [examQuestion, setExamQuestion] = useState(null);
  const [rowsPerPage, setRowsPerPage] = useState(4);
  const [page, setPage] = useState(0);
  const [pageCount, setPageCount] = useState(0);
  const [open, setOpen] = useState(false);
  const history = useHistory();
  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    httpService
      .get(
        `${API_BASE_URL}/api/lms/exam/get_exam_question/?ref_num=${
          props.location.state.exam.ref_num
        }&limit=${rowsPerPage}&offset=${page * rowsPerPage}`
      )
      .then(res => {
        if (res.status === 200) {
          setExamQuestion(res.data.results);
          setPageCount(res.data.page_count);
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
  }, [page]);

  return (
    <>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          width: '100%',
          marginTop: '60px',
          padding: '0px 20px',
          marginRight: '140px',
          overflow: 'auto'
        }}
      >
        <Box
          sx={{
            // position: 'absolute',
            // top: '10%',
            // backgroundColor: '#335D8A',
            color: '#00346D',
            padding: '10px 20px',
            width: '100%',
            display: 'flex',
            flexDirection: 'column'
          }}
        >
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between'
            }}
          >
            <InputLabel style={{ color: '#00346D' }}>
              {props.location.state.exam.name}
            </InputLabel>
          </Box>
          {/* <Divider sx={{ my: 1 }} color="#99AEC5" />
          <InputLabel
            style={{ color: '#00346D', fontSize: '14px' }}
          >{`مدت زمان آزمون: ${props.location.state.exam.duration}`}</InputLabel> */}
        </Box>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            padding: '20px 0px',
            backgroundColor: '#E5E5E5',
            justifyContent: 'center',
            alignItems: 'center',
            width: '100%'
          }}
        >
          {examQuestion &&
            examQuestion
              // .sort((a, b) => {
              //   return a.id > b.id;
              // })
              .map((item, key) => {
                return (
                  <>
                    <Box
                      sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        backgroundColor: 'white',
                        padding: '10px',
                        width: '95%',
                        m: '5px',
                        borderRadius: '4px'
                      }}
                    >
                      <InputLabel
                        style={{
                          backgroundColor: '#33BBC4',
                          color: 'white',
                          padding: '5px',
                          borderRadius: '4px',
                          fontSize: '13px',
                          width: 'fit-content'
                        }}
                      >
                        {`سوال ${item.question_num}`}
                      </InputLabel>
                      <Divider sx={{ m: '4px' }} />
                      <RadioGroup
                        row
                        aria-labelledby="demo-row-radio-buttons-group-label"
                        name="row-radio-buttons-group"
                        value={
                          examQuestion.filter(
                            f => f.ref_num === item.ref_num
                          )[0].user_answer
                        }
                        onChange={event => {
                          // let temp = examQuestion;
                          // temp = temp.filter(f => f.ref_num !== item.ref_num);
                          // setExamQuestion([
                          //   ...temp,
                          //   {
                          //     user_answer: event.target.value,
                          //     id: item.id,
                          //     question_num: item.question_num,
                          //     ref_num: item.ref_num
                          //   }
                          // ]);
                          var index = examQuestion.findIndex(
                            x => x.ref_num === item.ref_num
                          );
                          if (index === -1) {
                            console.log('not found');
                          } else {
                            let temp = examQuestion.slice();
                            temp[index]['user_answer'] = event.target.value;
                            setExamQuestion(temp);
                          }
                          httpService
                            .post(`${API_BASE_URL}/api/lms/exam/add_answer/`, {
                              ref_num: props.location.state.exam.ref_num,
                              question_num: item.question_num,
                              answer: event.target.value
                            })
                            .then(res => {
                              if (res.status === 200) {
                              }
                            })
                            .catch(ex => {
                              if (ex.response.status === 417) {
                                enqueueSnackbar(ex.response.data.error, {
                                  variant: 'error'
                                });
                              } else {
                                enqueueSnackbar(
                                  'مشکلی پیش آمده! لطفا دوباره سعی کنید',
                                  {
                                    variant: 'error'
                                  }
                                );
                              }
                            });
                        }}
                      >
                        <FormControlLabel
                          value="1"
                          control={<Radio sx={{ padding: 0, margin: 0 }} />}
                          label="گزینه ۱"
                          sx={{ marginLeft: '1px' }}
                        />
                        <FormControlLabel
                          value="2"
                          control={<Radio sx={{ padding: 0, margin: 0 }} />}
                          label="گزینه ۲"
                          // sx={{ marginLeft: '1px' }}
                        />
                        <FormControlLabel
                          value="3"
                          control={<Radio sx={{ padding: 0, margin: 0 }} />}
                          label="گزینه ۳"
                          // sx={{ marginLeft: '0px' }}
                        />
                        <FormControlLabel
                          value="4"
                          control={<Radio sx={{ padding: 0, margin: 0 }} />}
                          label="گزینه ۴"
                          // sx={{ marginLeft: '2px' }}
                        />
                      </RadioGroup>
                    </Box>
                  </>
                );
              })}
        </Box>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            gap: 2,
            padding: '10px',
            position: 'absolute',
            bottom: '0%',
            left: '0%',
            width: '100%'
          }}
        >
          <ConfirmButton
            disabled={page === 0}
            variant="outlined"
            onClick={() => setPage(page - 1)}
            style={{ width: '200px' }}
          >
            صفحه قبلی
          </ConfirmButton>
          <ConfirmButton
            disabled={page === pageCount - 1}
            onClick={() => setPage(page + 1)}
            style={{ width: '200px' }}
          >
            صفحه بعدی
          </ConfirmButton>
        </Box>
      </div>
    </>
  );
}

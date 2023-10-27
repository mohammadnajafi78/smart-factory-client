import { Box } from '@mui/material';
import { useHistory } from 'react-router-dom';
import ExamItem from './ExamItem';

export default function ExamsList({ exams, type, typeName }) {
  const history = useHistory();

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        height: '74vh'
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          padding: '12px 0px 12px',
          gap: '14px',
          // height: '1000px',
          overflowY: 'auto'
        }}
      >
        {exams &&
          exams.length > 0 &&
          exams.map((item, index) => {
            return (
              <ExamItem
                data={item}
                key={index}
                type={type}
                typeName={typeName}
              />
            );
          })}
      </Box>
      {/* <IconButton
        onClick={() => {
          history.push({
            pathname: '/project/Exams/new'
            // state: data
          });
        }}
      >
        <img
          src={newProject}
          width="26px"
          height="20px"
          style={{ color: 'white' }}
        />
        ثبت درخواست جدید
      </IconButton> */}
    </Box>
  );
}

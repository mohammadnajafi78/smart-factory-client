import { Box } from '@mui/material';
import { useHistory } from 'react-router-dom';
import CourseItem from './CourseItem';

export default function CourseList({ courses, type, typeName }) {
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
        {courses &&
          courses.length > 0 &&
          courses.map((item, index) => {
            return (
              <CourseItem
                data={item}
                key={index}
                type={type}
                typeName={typeName}
              />
            );
          })}
      </Box>
    </Box>
  );
}

import { Box, Grid } from '@mui/material';
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
          overflowY: 'auto',
          mt: 2
        }}
      >
        <Grid container spacing={2}>
          {courses &&
            courses.length > 0 &&
            courses.map((item, index) => {
              return (
                <Grid item md={4}>
                  <CourseItem
                    data={item}
                    key={index}
                    type={type}
                    typeName={typeName}
                  />
                </Grid>
              );
            })}
        </Grid>
      </Box>
    </Box>
  );
}

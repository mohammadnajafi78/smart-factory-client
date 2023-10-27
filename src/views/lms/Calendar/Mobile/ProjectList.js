import React, { useEffect, useState } from 'react';
import { Box } from '@mui/material';
import ProjectItem from './ProjectItem';
import IconButton from 'src/components/Desktop/Button/Icon';
import newProject from 'src/assets/img/newProject.png';
import { NavLink, useHistory } from 'react-router-dom';

export default function ProjectList({ projects }) {
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
        {projects &&
          projects.length > 0 &&
          projects.map((item, index) => {
            return <ProjectItem data={item} key={index} />;
          })}
      </Box>
      <IconButton
        onClick={() => {
          history.push({
            pathname: '/project/project/new/1'
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
        ثبت پروژه جدید
      </IconButton>
    </Box>
  );
}

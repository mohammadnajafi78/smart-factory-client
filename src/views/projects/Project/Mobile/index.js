import { Box } from '@mui/material';
import React, { useEffect, useState } from 'react';
import ProjectList from './ProjectList';
import useProjectSearch from 'src/hooks/useProjectSearch';
import { useHistory } from 'react-router';
import useSaleOrder from 'src/hooks/useSaleOrder';

export default function ProjectMobile() {
  const [openCategory, setOpenCategory] = useState();
  const [category, setCategory] = useState();
  // const [products, setProducts] = useState(null);
  const { projects, searched, getProjects } = useProjectSearch();
  const history = useHistory();
  const { order, getOrder } = useSaleOrder();

  useEffect(() => {
    console.log('get proj');
    getProjects();
  }, []);

  return (
    <Box sx={{ padding: '12px', display: 'flex', flexDirection: 'column' }}>
      {projects && <ProjectList projects={searched ? result : projects} />}

      {/* {category && (
        <CategoryDrawer
          openCategory={openCategory}
          setOpenCategory={setOpenCategory}
          data={category}
        />
      )} */}
    </Box>
  );
}

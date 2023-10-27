import React from 'react';
import ProjectDashboardLayout from '../../LmsDashboardLayout';

export default function ProjectDashboardLayoutBackDesktop(props) {
  console.log('desktopppp');
  return (
    <div>
      <ProjectDashboardLayout>{props.children}</ProjectDashboardLayout>
    </div>
  );
}

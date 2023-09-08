import React from 'react';
import ProjectDashboardLayout from '../../ProjectsDashboardLayout';

export default function ProjectDashboardLayoutFormDesktop(props) {
  return (
    <div>
      <ProjectDashboardLayout>{props.children}</ProjectDashboardLayout>
    </div>
  );
}

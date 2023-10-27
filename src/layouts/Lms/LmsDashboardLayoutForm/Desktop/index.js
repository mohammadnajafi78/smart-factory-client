import React from 'react';
import LmsDashboardLayout from '../../LmsDashboardLayout';

export default function LmsDashboardLayoutFormDesktop(props) {
  return (
    <div>
      <LmsDashboardLayout>{props.children}</LmsDashboardLayout>
    </div>
  );
}

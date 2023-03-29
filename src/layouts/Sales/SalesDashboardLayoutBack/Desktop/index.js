import React from 'react';
import SaleDashboardLayout from '../../SalesDashboardLayout';

export default function SalesDashboardLayoutBackDesktop(props) {
  console.log('desktopppp');
  return (
    <div>
      <SaleDashboardLayout>{props.children}</SaleDashboardLayout>
    </div>
  );
}

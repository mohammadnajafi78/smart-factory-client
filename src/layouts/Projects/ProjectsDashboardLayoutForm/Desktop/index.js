import React from 'react';
import SaleDashboardLayout from '../../ProjectsDashboardLayout';

export default function SalesDashboardLayoutFormDesktop(props) {
  return (
    <div>
      <SaleDashboardLayout>{props.children}</SaleDashboardLayout>
    </div>
  );
}

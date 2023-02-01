import React from 'react';
import SaleDashboardLayout from '../../SalesDashboardLayout';

export default function SalesDashboardLayoutFormDesktop(props) {
  return (
    <div>
      <SaleDashboardLayout>{props.children}</SaleDashboardLayout>
    </div>
  );
}

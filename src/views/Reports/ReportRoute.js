// ReportRoutes.js
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import MonthlyReport from './MonthlyReport';
import DailyReport from './DailyReport';

const ReportRoutes = () => {
  return (
    <Routes>
      <Route path="/reports/monthly" element={<MonthlyReport />} />
      <Route path="/reports/daily" element={<DailyReport />} />
    </Routes>
  );
};

export default ReportRoutes;

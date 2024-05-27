
//ReportComponent.js
import React from 'react';
import Layout from "../Layout/index";
import MonthlyReportComponent from '../Reports/MonthlyReport';
import DailyReportComponent from '../Reports/DailyReport';

const ReportComponent = () => {
    return (
        <Layout>
            <div>
                
                <MonthlyReportComponent />       
                <br/>
                <DailyReportComponent />
            </div>
        </Layout>
    );
};

export default ReportComponent;

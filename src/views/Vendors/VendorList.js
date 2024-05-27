import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Layout from '../Layout/index';
import { CSVLink } from 'react-csv';
import './VendorList.css';

const VendorList = () => {
  const [vendors, setVendors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchVendors = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/vendors/registered');
        setVendors(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching vendors:', error);
        setError('Error fetching vendors. Please try again later.');
        setLoading(false);
      }
    };

    fetchVendors();
  }, []);

  // CSV headers for the export
  const headers = [
    { label: 'Vendor Name', key: 'vendorName' },
    { label: 'Vendor Address', key: 'vendorAddress' },
    { label: 'Contact Person First Name', key: 'contactPersonFirstName' },
    { label: 'Contact Person Last Name', key: 'contactPersonLastName' },
    { label: 'Contact Person Email', key: 'contactPersonEmail' },
    { label: 'Contact Person Number', key: 'contactPersonNumber' },
    { label: 'Username', key: 'username' },
  ];

  return (
    <Layout>
      <div className="vendor-table-container">
        <h2>Registered Vendors</h2>
        {loading && <div>Loading...</div>}
        {error && <div>Error: {error}</div>}
        {!loading && !error && (
          <table className="vendor-table">
            <thead>
              <tr>
                <th>Vendor Name</th>
                <th>Vendor Address</th>
                <th>Contact Person First Name</th>
                <th>Contact Person Last Name</th>
                <th>Contact Person Email</th>
                <th>Contact Person Number</th>
                <th>Username</th>
              </tr>
            </thead>
            <tbody>
              {vendors.map(vendor => (
                <tr key={vendor.vendorName}>
                  <td>{vendor.vendorName}</td>
                  <td>{vendor.vendorAddress}</td>
                  <td>{vendor.contactPersonFirstName}</td>
                  <td>{vendor.contactPersonLastName}</td>
                  <td>{vendor.contactPersonEmail}</td>
                  <td>{vendor.contactPersonNumber}</td>
                  <td>{vendor.username}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
        {!loading && !error && (
          <div className="export-button-container">
            <CSVLink data={vendors} headers={headers} filename={'registered_vendors.csv'}>
              <button className="export-button">Export</button>
            </CSVLink>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default VendorList;

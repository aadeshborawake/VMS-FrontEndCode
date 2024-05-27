import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Multiselect from 'multiselect-react-dropdown';
import './MonthlyReport.css';

const MonthlyOrdersComponent = () => {
  // State variables
  const [years, setYears] = useState([]); 
  const [months, setMonths] = useState([]); 
  const [selectedYear, setSelectedYear] = useState(''); 
  const [selectedMonth, setSelectedMonth] = useState(''); 
  const [initialOrders, setInitialOrders] = useState([]); 
  const [filteredOrders, setFilteredOrders] = useState([]); 
  const [error, setError] = useState(''); 
  const [productFilter, setProductFilter] = useState([]); 
  const [userFilter, setUserFilter] = useState([]); 
  const [vendorFilter, setVendorFilter] = useState([]); 
  const [quantityMin, setQuantityMin] = useState(''); 
  const [quantityMax, setQuantityMax] = useState(''); 
  const [amountMin, setAmountMin] = useState(''); 
  const [amountMax, setAmountMax] = useState(''); 
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState(''); 
  const [loading, setLoading] = useState(false); 
  const [advancedFilterOpen, setAdvancedFilterOpen] = useState(false); 
  const [filtersApplied, setFiltersApplied] = useState(false); // State variable to track whether filters are applied

  useEffect(() => {
    const fetchYearsAndMonths = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/orders/availableYearsAndMonths');
        const { years, months } = response.data;
        setYears(years);
        setMonths(months);
      } catch (error) {
        setError('Failed to fetch years and months');
      }
    };

    fetchYearsAndMonths();
  }, []);

  const handleFetchOrders = async () => {
    if (!selectedYear || !selectedMonth) {
      setError('Please select both year and month');
      return;
    }

    try {
      setLoading(true);
      const response = await axios.get(`http://localhost:8080/api/orders/monthly?year=${selectedYear}&month=${selectedMonth}`);
      setInitialOrders(response.data);
      setFilteredOrders(response.data);
      setLoading(false);
    } catch (error) {
      setError('Failed to fetch monthly orders');
      setLoading(false);
    }
  };

  const applyFilters = () => {
    let filteredOrdersData = [...initialOrders];

    // Apply filters
    if (quantityMin !== '' && quantityMax !== '') {
      filteredOrdersData = filteredOrdersData.filter(order => order.quantity >= quantityMin && order.quantity <= quantityMax);
    }

    if (amountMin !== '' && amountMax !== '') {
      filteredOrdersData = filteredOrdersData.filter(order => order.amount >= amountMin && order.amount <= amountMax);
    }

    if (startDate !== '' && endDate !== '') {
      const startDateObj = new Date(startDate);
      const endDateObj = new Date(endDate);
      filteredOrdersData = filteredOrdersData.filter(order => {
        const orderDate = new Date(order.orderDate);
        return orderDate >= startDateObj && orderDate <= endDateObj;
      });
    }

    setFilteredOrders(filteredOrdersData);
    setFiltersApplied(true); // Set filtersApplied to true after filters have been applied
    setAdvancedFilterOpen(false);
  };

  const resetFilters = () => {
    setProductFilter([]);
    setUserFilter([]);
    setVendorFilter([]);
    setQuantityMin('');
    setQuantityMax('');
    setAmountMin('');
    setAmountMax('');
    setStartDate('');
    setEndDate('');
    setAdvancedFilterOpen(false);
    setFilteredOrders(initialOrders);
    setFiltersApplied(false); // Reset filtersApplied when filters are reset
  };

  // Apply filters to the initial orders

  const productOptions = [...new Set(initialOrders.map(order => order.product.productName))].map((productName, index) => ({
    key: index,
    value: productName
  }));

  const userOptions = [...new Set(initialOrders.map(order => order.user.username))].map((username, index) => ({
    key: index,
    value: username
  }));

  const vendorOptions = [...new Set(initialOrders.map(order => order.vendor.vendorName))].map((vendorName, index) => ({
    key: index,
    value: vendorName
  }));

  return (
    <div className="order-component">
      <h2>Monthly Orders Report</h2>
      <>
        <select value={selectedYear} onChange={event => setSelectedYear(event.target.value)}>
          <option value="">Select Year</option>
          {years.map((year) => (
            <option key={year} value={year}>{year}</option>
          ))}
        </select>

        <select value={selectedMonth} onChange={event => setSelectedMonth(event.target.value)}>
          <option value="">Select Month</option>
          {months.map((month) => (
            <option key={month} value={month}>{month}</option>
          ))}
        </select>
        {"  "}
        <button onClick={handleFetchOrders}>Fetch Orders</button>
        
        <button onClick={() => setAdvancedFilterOpen(!advancedFilterOpen)}>
          {filtersApplied ? "Show Filter" : "Advanced Filter"}
        </button>

        {loading && <p>Loading...</p>}
        {error && <div className="error">Error: {error}</div>}
    
        {advancedFilterOpen && (
          <div className="advanced-filter">

            <div className="filter-row">
              <label htmlFor="productFilter"> </label>
              <div className="select-wrapper">
                <Multiselect
                  options={productOptions}
                  selectedValues={productFilter}
                  onSelect={(selectedList) => setProductFilter(selectedList)}
                  onRemove={(selectedList) => setProductFilter(selectedList)}
                  displayValue="value"
                  placeholder="Select Product"
                />
              </div>

              <label htmlFor="userFilter"></label>
              <div className="select-wrapper">
                <Multiselect
                  options={userOptions}
                  selectedValues={userFilter}
                  onSelect={(selectedList) => setUserFilter(selectedList)}
                  onRemove={(selectedList) => setUserFilter(selectedList)}
                  displayValue="value"
                  placeholder="Select User"
                />
              </div>

              <label htmlFor="vendorFilter"></label>
              <div className="select-wrapper">
                <Multiselect
                  options={vendorOptions}
                  selectedValues={vendorFilter}
                  onSelect={(selectedList) => setVendorFilter(selectedList)}
                  onRemove={(selectedList) => setVendorFilter(selectedList)}
                  displayValue="value"
                  placeholder="Select Vendor"
                />
              </div>
            </div>

            <div className="filter-row">
              <label>Start Date:</label>
              <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
              <label>End Date:</label>
              <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
            </div>

            <div className="filter-row">
              <button onClick={applyFilters}>Apply</button>
              <button onClick={() => { setAdvancedFilterOpen(false); resetFilters(); }}>Clear Filter</button>
            </div>
          </div>
        )}

<table>
  <thead>
    <tr>
      <th>Order Number</th>
      <th>Vendor Name</th>
      <th>User</th>
      <th>Order Date</th>
      <th>Product Name</th>
      <th>Quantity</th>
      <th>Amount</th>
    </tr>
  </thead>
  <tbody>
    {filteredOrders.length > 0 ? (
      filteredOrders.map(order => (
        <tr key={order.id}>
          <td>{order.orderNumber}</td>
          <td>{order.vendor.vendorName}</td>
          <td>{order.user.username}</td>
          <td>{new Date(order.orderDate).toISOString().split('T')[0]}</td>
          <td>{order.product.productName}</td>
          <td>{order.orderQuantity}</td>
          <td>{order.orderAmount}</td>
        </tr>
      ))
    ) : (
      <tr>
        <td colSpan="7">No orders found</td>
      </tr>
    )}
  </tbody>
</table>
         
      </>
    </div>
  );
};

export default MonthlyOrdersComponent;

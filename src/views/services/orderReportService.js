// api.js
import axios from 'axios';
import { getCurrentUserId } from '../../helpers/user';

// Function to fetch orders for the current user
export const fetchOrdersForCurrentUser = async () => {
    const userId = getCurrentUserId(); // Get the current user's ID
    try {
        const response = await axios.get('/api/orders/orderlist', {
            headers: {
                'user-id': userId, // Include the user ID in the request headers
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching orders:', error);
        throw error;
    }
};

// Function to fetch reports for the current user
export const fetchReportsForCurrentUser = async () => {
    const userId = getCurrentUserId();
    try {
        const response = await axios.get('/api/reports/my-report', {
            headers: {
                'user-id': userId,
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching reports:', error);
        throw error;
    }
};

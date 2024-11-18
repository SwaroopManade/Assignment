import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: process.env.REACT_APP_API_BASE_URL || 'http://localhost:8080/api',
    timeout: 5000, 
});

const Service = {
    getTransactions: async ({ month, page, search }) => {
        try {
            const response = await axiosInstance.get('/transactions', {
                params: { month, page, search },
            });
            return response.data;
        } catch (error) {
            console.error("Error fetching transactions:", error);
            throw error;
        }
    },
    getStatistics: async (month) => {
        try {
            const response = await axiosInstance.get('/statistics', { params: { month } });
            return response.data;
        } catch (error) {
            console.error("Error fetching statistics:", error);
            throw error;
        }
    },
    getBarChart: async (month) => {
        try {
            const response = await axiosInstance.get('/bar-chart', { params: { month } });
            return response.data;
        } catch (error) {
            console.error("Error fetching bar chart data:", error);
            throw error;
        }
    },
    getPieChart: async (month) => {
        try {
            const response = await axiosInstance.get('/pie-chart', { params: { month } });
            return response.data;
        } catch (error) {
            console.error("Error fetching pie chart data:", error);
            throw error;
        }
    },
};

export default Service;

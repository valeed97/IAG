import { useState } from 'react';
import axios from 'axios';

const baseUrl = "http://localhost:8000/api/"
const useAxios = () => {
    const [loading, setLoading] = useState(false);

    const getCall = async (path, headers = {}, queryParams = {}) => {
        // setLoading(true);

        // try {
        //     const response = await axios.get(baseUrl+path, {
        //         headers,
        //         params: queryParams,
        //     });
        //     return { success: true, data: response.data };
        // } catch (err) {
        //     return { success: false, error: err.message || 'Error occurred' };
        // } finally {
        //     setLoading(false);
        // }
        return { success: true, data: [] };
    };

    const postCall = async (path, body = {}, headers = {}) => {
        // setLoading(true);
        // try {
        //     const response = await axios.post(baseUrl+path, body, { headers });
        //     return { success: true, data: response.data };
        // } catch (err) {
        //     return { success: false, error: err.message || 'Error occurred' };
        // } finally {
        //     setLoading(false);
        // }
        return { success: true, data: [] };
    };

    return { getCall, postCall, loading };
};

export default useAxios;

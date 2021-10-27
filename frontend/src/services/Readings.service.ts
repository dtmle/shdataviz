import axios from 'axios';

const headers = {
    'Access-Control-Allow-Origin': '*',
};

export const getDevices = async () => {
    return axios.get(`${process.env.REACT_APP_API_URL}/readings/devices`, {
        headers,
    });
};

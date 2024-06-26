const qs = require('qs');
const axios = require('axios');


const getToken = async (tenantId,params) => {
    const url = `https://login.microsoftonline.com/${tenantId}/oauth2/v2.0/token`;
    try {
        const response = await axios.post(url, qs.stringify(params), {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        });
        return response.data.access_token;
    } catch (error) {
        console.error('Error fetching access token:', error);
    }
};

module.exports ={
    getToken,
}
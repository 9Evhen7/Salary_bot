const axios = require('axios');
const qs = require('qs');
const { Client } = require('@microsoft/microsoft-graph-client');
require('isomorphic-fetch');
const dotenv = require ('dotenv');
dotenv.config();


const {TENANT_ID, CLIENT_ID,CLIENT_SECRET, ITEM_ID, DOCUMENT_ID,SITE_ID} = process.env
const clientId = CLIENT_ID;
const clientSecret = CLIENT_SECRET;
const tenantId = TENANT_ID;
const itemId = ITEM_ID;
const documentId = DOCUMENT_ID;
const siteId = SITE_ID;

const getToken = async () => {
  const url = `https://login.microsoftonline.com/${tenantId}/oauth2/v2.0/token`;
  const params = {
    grant_type: 'client_credentials',
    client_id: clientId,
    client_secret: clientSecret,
    scope: 'https://graph.microsoft.com/.default'
  };
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

const modifyExcelSheet = async (siteId, itemId) => {
    const accessToken = await getToken();
    const client = axios.create({
      baseURL: `https://graph.microsoft.com/v1.0/sites/${siteId}/drive/items/${itemId}/workbook`,
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json'
      }
    });
    try {
      const response = await client.patch(`/worksheets('main_data')/range(address='A4')`, {
        values: [['блаблабла']]
      });
      console.log('Cell updated successfully:', response.data);
    } catch (error) {
      console.error('Error updating cell:', error.response.data);
      throw error;
    }
  };

  
  modifyExcelSheet(siteId, itemId).catch(console.error);
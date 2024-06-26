const axios = require('axios');

const {getToken} = require('./getToken');
const {getUsedRange} = require('./getUsedRange');

const modifyExcelSheet = async (IdList,params,rowValues) => {
    const {
        siteId,
        itemId,
        tenantId,
    }= IdList;

    const accessToken = await getToken(tenantId,params);
    const client = axios.create({
      baseURL: `https://graph.microsoft.com/v1.0/sites/${siteId}/drive/items/${itemId}/workbook`,
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json'
      }
    });
    try {
      const usedRange = await getUsedRange(client);
      const lastRow = usedRange.address.split(':')[1].replace(/[^0-9]/g, '');
      const nextRow = parseInt(lastRow) + 1;

      const response = await client.patch(`/worksheets('main_data')/range(address='A${nextRow}:C${nextRow}')`, {
        values: rowValues
      });
      console.log('Cell updated successfully!');
      // console.log('Cell updated successfully:', response.data);
    } catch (error) {
      console.error('Error updating cell:', error.response.data);
      throw error;
    }
  };

  module.exports = {
    modifyExcelSheet,
  }
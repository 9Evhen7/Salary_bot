const dotenv = require ('dotenv');
dotenv.config();

const {TENANT_ID, CLIENT_ID,CLIENT_SECRET, ITEM_ID, DOCUMENT_ID,SITE_ID} = process.env
const clientId = CLIENT_ID;
const clientSecret = CLIENT_SECRET;
const tenantId = TENANT_ID;
const itemId = ITEM_ID;
const siteId = SITE_ID;
  
const IdList = {
  siteId,
  itemId,
  tenantId,
}
const params = {
    grant_type: 'client_credentials',
    client_id: clientId,
    client_secret: clientSecret,
    scope: 'https://graph.microsoft.com/.default'
  };

  module.exports={
    IdList,
    params
  }
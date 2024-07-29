const axios = require("axios");
const qs = require("qs");
const { bot } = require("./botConnect");
const { Client } = require("@microsoft/microsoft-graph-client");
require("isomorphic-fetch");
const dotenv = require("dotenv");
dotenv.config();

const { uploadPhoto } = require("./functions/uploadPhoto");
const { modifyExcelSheet } = require("./functions/modifyExcelSheet");

const { TENANT_ID, CLIENT_ID, CLIENT_SECRET, ITEM_ID, DOCUMENT_ID, SITE_ID } =
  process.env;
const clientId = CLIENT_ID;
const clientSecret = CLIENT_SECRET;
const tenantId = TENANT_ID;
const itemId = ITEM_ID;
const siteId = SITE_ID;

const IdList = {
  siteId,
  itemId,
  tenantId,
};
const params = {
  grant_type: "client_credentials",
  client_id: clientId,
  client_secret: clientSecret,
  scope: "https://graph.microsoft.com/.default",
};
const rowValues = [["Date", "Name", "Salary"]];

bot.launch();

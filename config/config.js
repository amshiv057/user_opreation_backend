const _ = require("lodash");
// const config = require("./config.json");
require('dotenv').config()
const objectval = JSON.parse(process.env.OBJECT_VAL);
const defaultConfig = objectval.config;

// const defaultConfig = config.development;
// const environment='development';
const environment = "production"

const environmentConfig = objectval[environment];
// const environmentConfig = config[environment];
// console.log(environmentConfig);

const finalConfig = _.merge(defaultConfig, environmentConfig);
global.gConfig = finalConfig;
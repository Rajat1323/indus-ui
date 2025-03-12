import { Environments } from "./environment.interface";

var commonConfig = {
  production: true,
  myToken: ''
}

// Get the current protocol and host
const { protocol, host } = window.location;

// Construct the base URL
const baseUrl = `${protocol}//${host}`;

const environments: Environments = {
  local: {
    envKey: 'local',
    production: false,
    apiBaseUrl: 'https://gis.industowers.com/api',
    geoServerWorkSpace: 'industowers',
    geoServerBaseUrl: 'https://gis.industowers.com/geoserver'
  },
  dev: {
    envKey: 'dev',
    apiBaseUrl: 'https://gis.industowers.com/api',
    geoServerWorkSpace: 'industowers',
    geoServerBaseUrl: 'https://gis.industowers.com/geoserver'
  },
  prod: {
    envKey: 'prod',
    apiBaseUrl: `${baseUrl}/backbone/api`,
    geoServerWorkSpace: 'industowers',
    geoServerBaseUrl: `${baseUrl}/backbone/geoserver`
  }
}

/**
* @description Get environment key based on host : **local | train1 | train2 | prod**
*/
const getEnvKeyByURL = () => {
  var envRegex = new RegExp('');
  var origin = location.origin;
  var href = location.href;

  envRegex = /localhost|^127/;
  if (envRegex.test(origin) || href.includes('local')) {
    return 'local';
  }

  envRegex = /gis.industowers.com|^127/;
  if (envRegex.test(origin) || href.includes('gis.industowers.com')) {
    return 'dev';
  }

  return 'prod';
}

/**
* @description Get actual environment property based on envKey : **local | dev | qa | prod**
*/
const getEnvironmentConfig = () => {
  const envKey = getEnvKeyByURL();
  let environmentObj = environments[envKey];
  environmentObj = { ...commonConfig, ...environmentObj };
  return environmentObj;
}

export const environment = getEnvironmentConfig();

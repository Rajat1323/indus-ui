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
    apiBaseUrl: 'http://localhost:8600',
    geoServerWorkSpace: 'industowers',
    geoServerBaseUrl: 'http://10.240.12.247:8000/geoserver'
  },
  dev: {
    envKey: 'dev',
    apiBaseUrl: 'http://http://10.240.12.247:8600',
    geoServerWorkSpace: 'industowers',
    geoServerBaseUrl: 'http://10.240.12.247:8000/geoserver'
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

  envRegex = /10.240.12.247|^127/;
  if (envRegex.test(origin) || href.includes('10.240.12.247')) {
    return 'dev';
  }

  return 'dev';
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

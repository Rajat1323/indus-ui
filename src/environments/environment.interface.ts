export type EnvKey = 'local' | 'dev';

export interface IEnvironment {
    production?: boolean,
    myToken?: string,
    envKey: string,
    apiBaseUrl: string,
    geoServerBaseUrl: string,
    geoServerWorkSpace: string
}

export type Environments = {
    [key in EnvKey]: IEnvironment
}

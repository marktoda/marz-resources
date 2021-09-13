export interface EnvConfig {
    port: number;
    env: string;
}

export interface Config {
    development: EnvConfig;
    production: EnvConfig;
}

const config = {
    development: {
        port: 8080,
        env: 'development',
    },
    production: {
        port: 80,
        env: 'production',
    }
}

export function getConfig(): EnvConfig {
    switch (process.env.NODE_ENV) {
        case 'development':
            return config.development;
        case 'production':
        case 'prod':
            return config.production;
        default:
            return config.development;
    }

}

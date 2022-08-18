export default class Settings {

    private applicationName = 'BKO @ Web Forest'
    private apiUrlDev = 'https://api.dev.webforest.eco/samauma/'
    private apiUrlPrd = 'https://api.webforest.eco/samauma/'
   
    public isProduction(): boolean {
        return process.env.NEXT_PUBLIC_APP_ENV == 'production';
    }
    
    public isDevelopment(): boolean {
        return process.env.NEXT_PUBLIC_APP_ENV == `development`;
    }

    public apiUri(): string {
        return this.isDevelopment() ? this.apiUrlDev : this.apiUrlPrd
    }

    public appName(): string {
        return this.applicationName
    }

    public static get(): Settings {
        return new Settings()
    }
    
}

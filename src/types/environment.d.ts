// declare global env variable to define types
declare global {
    namespace NodeJS {
      interface ProcessEnv {
        PORT: string;
        DATABASE_URL: string;
        SECRET: string;
        SITE_URL: string;
        STRIPE_PUBLISHABLE_KEY: string;
        STRIPE_SECRET_KEY: string;
        STRIPE_WEBHOOK_SECRET: string;
        STRIPE_authorizeUri: string;
        STRIPE_tokenUri: string;
        FACEBOOK_CALLBACK: string;
        FACEBOOK_APP_ID: string;
        FACEBOOK_APP_SECRET: string;
      }
    }
  }
  
  export { };
// declare global env variable to define types
declare global {
    namespace NodeJS {
      interface ProcessEnv {
        PORT: string;
        DATABASE_URL: string;
        SECRET: string;
        FACEBOOK_CALLBACK: string;
        FACEBOOK_APP_ID: string;
        FACEBOOK_APP_SECRET: string;
      }
    }
  }
  
  export { };
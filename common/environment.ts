
export const  environment={
    name_api:{ name: process.env.NAME_API||'api-car'},
    version_api: { version: process.env.VERSION_API||'1.0.0'},
    server:{ port: process.env.SERVER_PORT || 5000},
    db: {url: process.env.DB_URL || 'mongodb://localhost:27017/api-car'},
    security: {
        saltRounds: process.env.SALT_ROUNDS || 10,
        apiSecret: process.env.API_SECERT || 'wolfx-api-web-token',
    },
 
}
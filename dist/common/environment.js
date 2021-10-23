"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.environment = {
    name_api: { name: process.env.NAME_API || 'api-car' },
    version_api: { version: process.env.VERSION_API || '1.0.0' },
    server: { port: process.env.SERVER_PORT || 3000 },
    db: { url: process.env.DB_URL || 'mongodb://localhost:27017/api-car' }
};

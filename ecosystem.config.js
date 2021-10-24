module.exports = {
  apps : [{
    name   : "api-car",
    script : "./dist/main.js",
  }],
  instances:0,
  exec_mode:"cluster",
  watch: true,
  merge_logs: true,
  env: {
    SERVER_PORT:5000,
    DB_URL:'mongodb://@wolfx2020localhost:27017/api-car',
    NODE_ENV:"production"
   
  },
  env_production: {
    SERVER_PORT: 5001,
    NODE_ENV:"development"
  }
}

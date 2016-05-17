
var host = process.env['HOST'] || 'localhost';

module.exports =  {
  port: process.env.port || 8080,
  StatusBadRequest: 400,
  StatusInternalServerError: 500,
  port: process.env.port || 8090,
  mongo: {
    endpoint: "mongodb://" + host + "/hello"
  }
};


var host = process.env['HOST'] || 'localhost';

module.exports =  {
  port: process.env.port || 8080,
  mongo: {
    endpoint: "mongodb://" + host + "/airport"
  }
};

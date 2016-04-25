
var host = process.env['HOST'];

module.exports =  {
  port: process.env.port || 8080,
  mongo: {
    endpoint: "mongodb://" + host + "/airport"
  }
};

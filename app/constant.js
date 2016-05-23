
var host = process.env['HOST'] || 'localhost';

module.exports =  {
  port: process.env.port || 8080,
  port: process.env.port || 8090,
  mongo: {
    endpoint: "mongodb://" + host + "/hello"
  },
  http: {
    NotFound: 404,
    BadRequest: 400,
    InternalServerError: 500,
  }
};

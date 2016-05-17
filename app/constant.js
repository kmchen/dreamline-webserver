
var host = process.env['HOST'] || 'localhost';

module.exports =  {
<<<<<<< HEAD
  port: process.env.port || 8080,
  StatusBadRequest: 400,
  StatusInternalServerError: 500,
=======
  port: process.env.port || 8090,
>>>>>>> eed68ab... Implement store/meta and meta schema
  mongo: {
    endpoint: "mongodb://" + host + "/hello"
  }
};

const jsonServer = require('json-server');
const middleware = jsonServer.defaults;
const server = jsonServer.create();

server.use(middleware);
server.use(jsonServer.bodyParser);


server.listen(3000, () => {
  console.log(`Mock-Server listening on port 3000`);
});

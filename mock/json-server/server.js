const jsonServer = require('json-server');
const middleware = jsonServer.defaults();
const server = jsonServer.create();

server.use(middleware);
server.use(jsonServer.bodyParser);

const userData = require('./data/user');
const registerData = require('./data/register');
const {userProfile} = require("./data/user");


/**
 * User related endpoint mocks
 */
server.post('/api/user/login', (req, res) => {
  console.log("Server received login-request: ", req.body);

  setTimeout(() => {
    if (req.body.password === 's3cret!') {
      res.status(200).send(userData.token);
    } else {
      res.status(401).send(userData.token);
    }
  }, 200);
});

server.get('/api/user/profile', (req, res) => {
  console.log("Server received profile-request: ", req.body);
  setTimeout(() => {
    const token = req.headers.authorization;
    if (token) {
      res.status(200).send(userProfile);
    } else {
      res.status(401).send();
    }
  }, 200);
});

server.get('/api/register/sensorBase', (req, res) => {
  console.log("Server received register-request: ", req.body);
  setTimeout(() => {
    const token = req.headers.authorization;
    if (token) {
      res.status(200).send(registerData.sensorBase);
    } else {
      res.status(401).send();
    }
  }, 200);
});

server.post('/api/user/refreshToken', (req, res) => {
  console.log("Server received refresh-token-request: ", req.body);
  setTimeout(() => {
    const token = req.body.token
    if (token) {
      res.status(200).send(userData.token);
    } else {
      res.status(401).send();
    }
  }, 200);
});


server.listen(3001, () => {
  console.log(`Mock-Server listening on port 3001`);
});

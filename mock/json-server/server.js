const jsonServer = require('json-server');
const middleware = jsonServer.defaults();
const server = jsonServer.create();

server.use(middleware);
server.use(jsonServer.bodyParser);

const userData = require('./data/user');
const registerData = require('./data/register');
const {userProfileBalu, userProfileBaluChanged } = require("./data/user");
const {userProfileMogli} = require("./data/user");


/**
 * User related endpoint mocks
 */
server.post('/api/user/login', (req, res) => {
  console.log("Server received login-request: ", req.body);

  setTimeout(() => {
    if (req.body.username === 'balu' && req.body.password === 's3cret!') {
      res.status(200).send(userData.tokenBalu);
    } else if (req.body.username === 'mogli' && req.body.password === 's3cret!') {
      res.status(200).send(userData.tokenMogli);
    } else {
      res.status(401).send(userData.token);
    }
  }, 200);
});

/**
 * User related endpoint mocks
 */
server.post('/api/user/save', (req, res) => {
  console.log("Server received save-request: ", req.body);
  setTimeout(() => {
    const token = req.headers.authorization;
    if (token && token.includes('balu')) {
      res.status(200).send(userProfileBaluChanged);
    } else if (token && token.includes('mogli')) {
      res.status(200).send(userProfileMogli);
    } else {
      res.status(401).send();
    }
  }, 200);
});

server.post('/api/user/save-password', (req, res) => {
  console.log("Server received save-request: ", req.body);
  setTimeout(() => {
    const token = req.headers.authorization;
    if (token && token.includes('balu')) {
      res.status(200).send(userProfileBalu);
    } else if (token && token.includes('mogli')) {
      res.status(200).send(userProfileMogli);
    } else {
      res.status(401).send();
    }
  }, 200);
});

server.get('/api/user/profile', (req, res) => {
  console.log("Server received profile-request: ", req.body);
  setTimeout(() => {
    const token = req.headers.authorization;
    if (token && token.includes('balu')) {
      res.status(200).send(userProfileBalu);
    } else if (token && token.includes('mogli')) {
      res.status(200).send(userProfileMogli);
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

server.get('/api/register/requests/:id', (req, res) => {
  console.log("Server received get active register-request: ", req.body);
  setTimeout(() => {
    const token = req.headers.authorization;
    if (token && token.includes('balu')) {
      res.status(200).send(registerData.registerRequestBalu);
    } else if (token && token.includes('mogli')) {
      res.status(204).send();
    } else {
      res.status(401).send();
    }
  }, 200);
});

server.post('/api/user/refreshToken', (req, res) => {
  console.log("Server received refresh-token-request: ", req.body);
  setTimeout(() => {
    const token = req.body.token
    if (token && token.includes('balu')) {
      res.status(200).send(userData.tokenBalu);
    } else if (token && token.includes('mogli')) {
      res.status(200).send(userData.tokenMogli);
    }
    else {
      res.status(401).send();
    }
  }, 200);
});

server.post('/api/register/sensor', (req, res) => {
  console.log("Server received register sensor base request: ", req.body);
  setTimeout(() => {
    const token = req.headers.authorization;
    if (token && token.includes('balu')) {
      res.status(200).send(registerData.registerRequestBalu);
    } else if (token && token.includes('mogli')) {
      res.status(200).send(registerData.registerRequestMogliNew);
    }
    else {
      res.status(401).send();
    }
  }, 200);
});

server.post('/api/register/sensor/cancel', (req, res) => {
  console.log("Server received cancel register sensor base request: ", req.body);
  setTimeout(() => {
    const token = req.headers.authorization;
    if (token && token.includes('balu')) {
      res.status(200).send(registerData.registerRequestBaluCanceled);
    } else if (token && token.includes('mogli')) {

      res.status(200).send(registerData.registerRequestMogliCanceled);
    }
    else {
      res.status(401).send();
    }
  }, 200);
});


server.listen(3001, () => {
  console.log(`Mock-Server listening on port 3001`);
});

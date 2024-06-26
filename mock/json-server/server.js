const jsonServer = require('json-server');
const middleware = jsonServer.defaults();
const server = jsonServer.create();

server.use(middleware);
server.use(jsonServer.bodyParser);

const userData = require('./data/user');
const registerData = require('./data/register');
const {userProfileBalu, userProfileBaluChanged, userProfileBaluNewName } = require("./data/user");
const {userProfileMogli} = require("./data/user");
const notificationData = require("./data/notification");
let notifications = JSON.parse(JSON.stringify(notificationData.notification));
const {latestMeasurements} = require("./data/measurements");
const {temperatureMeasurementsHistory} = require("./data/measurements");
const {sensorMock} = require("./data/sensor");

/**
 * User related endpoint mocks
 */
server.post('/api/app/user/login', (req, res) => {
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
server.post('/api/app/user/save', (req, res) => {
  console.log("Server received save-request: ", req.body);
  setTimeout(() => {
    const token = req.headers.authorization;
    if (token && token.includes('balu') && req.body.username === 'newUsername') {
      res.status(200).send(userProfileBaluNewName);
    } else if (token && token.includes('balu')) {
      res.status(200).send(userProfileBaluChanged);
    } else if (token && token.includes('mogli')) {
      res.status(200).send(userProfileMogli);
    } else {
      res.status(401).send();
    }
  }, 200);
});

server.post('/api/app/user/save-password', (req, res) => {
  console.log("Server received save-request: ", req.body);
  setTimeout(() => {
    const token = req.headers.authorization;
    if (token && token.includes('balu') && req.body.oldPassword === '9876') {
      res.status(200).send(userProfileBalu);
    } else if(token && token.includes('balu') && req.body.oldPassword === 'wrong-old-password') {
      res.status(400).send();
    } else if (token && token.includes('mogli')) {
      res.status(200).send(userProfileMogli);
    } else {
      res.status(401).send();
    }
  }, 200);
});

server.get('/api/app/user/profile', (req, res) => {
  console.log("Server received profile-request: ", req.body);
  setTimeout(() => {
    const token = req.headers.authorization;
    if (token && token.includes('balu') && req.body.username === 'newUsername') {
      res.status(200).send(userProfileBaluNewName);
    } else if (token && token.includes('balu')) {
      res.status(200).send(userProfileBalu);
    } else if (token && token.includes('mogli')) {
      res.status(200).send(userProfileMogli);
    } else {
      res.status(401).send();
    }
  }, 200);
});

server.get('/api/app/register/sensorBase', (req, res) => {
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

server.get('/api/app/settings/:id', (req, res) => {
  console.log("Server received sensor-setting-request: ", req.body);
  setTimeout(() => {
    const token = req.headers.authorization;
    if (token) {
      res.status(200).send(sensorMock);
    } else {
      res.status(401).send();
    }
  }, 200);
});

server.post('/api/app/settings/', (req, res) => {
  console.log("Server received sensor-setting-request: ", req.body);
  setTimeout(() => {
    const token = req.headers.authorization;
    if (token) {
      res.status(200).send(req.body);
    } else {
      res.status(401).send();
    }
  }, 200);
});

server.get('/api/app/register/requests/:id', (req, res) => {
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

server.post('/api/app/user/refreshToken', (req, res) => {
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

server.post('/api/app/register/sensor', (req, res) => {
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

server.post('/api/app/register/sensor/cancel', (req, res) => {
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


server.get('/api/app/notifications/user/:id', (req, res) => {
  console.log("Server received notification: ", req.body);
  setTimeout(() => {
    const token = req.headers.authorization;
    if (token) {
      res.status(200).send(notifications)
    } else {
      res.status(401).send();
    }
  }, 200);
});

server.delete('/api/app/notifications/user/:id', (req, res) => {
  console.log("Server received notification: ", req.body);
  setTimeout(() => {
    const token = req.headers.authorization;
    if (token) {
      notifications = [];
      res.status(200).send();
    }
  })
});


server.get('/api/app/measurements/user/:id', (req, res) => {
  console.log("Server received get latest measurements: ", req.body);
  setTimeout(() => {
    const token = req.headers.authorization;
    if (token && token.includes('balu')) {
      res.status(200).send(latestMeasurements);
    } else if (token && token.includes('mogli')) {
      res.status(200).send(latestMeasurements);
    } else {
      res.status(401).send();
    }
  }, 200);
});

server.get('/api/app/measurements/sensor/:id', (req, res) => {
  console.log("Server received get latest measurements: ", req.body);
  setTimeout(() => {
    const token = req.headers.authorization;
    if (token && token.includes('balu')) {
      res.status(200).send(temperatureMeasurementsHistory);
    } else if (token && token.includes('mogli')) {
      res.status(200).send(temperatureMeasurementsHistory);
    } else {
      res.status(401).send();
    }
  }, 200);
});


server.listen(3001, () => {
  console.log(`Mock-Server listening on port 3001`);
});

const sensorBase = require('./sensor-base.json');
const registerRequestBalu = require('./register-request-balu.json');
const registerRequestBaluCanceled = require('./register-request-balu-canceled.json');
const registerRequestMogliNew = require('./register-request-mogli-new.json');
const registerRequestMogliCanceled = require('./register-request-mogli-canceled.json');


module.exports =  {
  sensorBase: sensorBase,
  registerRequestBalu: registerRequestBalu,
  registerRequestMogliNew: registerRequestMogliNew,
  registerRequestMogliCanceled: registerRequestMogliCanceled,
  registerRequestBaluCanceled: registerRequestBaluCanceled
}

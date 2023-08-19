const mongoose = require('mongoose');

const CacheSchema = new mongoose.Schema({
//xm360 values
  cacheId: String,
  session: String,
  completeUrl: String,
  xm_version: String,
  time_started: {type: Date},
  time_finished: {type: Date, default: Date.now},
  //account meta object
  account: {
    type: Map,
    of: String
  },
//agent meta object
  agent: {
    type: Map,
    of: String
  },
//captured ui events array
  steps: {
    type: Array
  },
//captured  requests array
  requests: {
    type: Array
  },
});
module.exports = mongoose.model('Cache', CacheSchema);

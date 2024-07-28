const mongoose = require('mongoose');

const sessionSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  loginTime: { type: Date, default: Date.now },
  logoutTimes: { type: Date,default:null },
  ipAddress: { type: String },
});

module.exports = mongoose.model('Session', sessionSchema);
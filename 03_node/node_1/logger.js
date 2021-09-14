const EventEmmiter = require('events');
const uuid = require('uuid');

class Logger extends EventEmmiter {
  log(msg) {
    // Call event
    this.emit('message', { id: uuid.v4(), msg });
    // каждый раз при вызове log будет показывать новый id с отправленным msg
  }
}

module.exports = Logger;
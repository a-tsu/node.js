const EventEmitter = require('events').EventEmitter;
const eventEmitter = new EventEmitter();
const http = require('http');


const ringBell = () =>
{
  console.log('ring ring ring');
}
eventEmitter.on('doorOpen', ringBell);
eventEmitter.emit('doorOpen');

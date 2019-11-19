import io from 'socket.io-client';

console.log('оно тоже перезагружается')
export const socket = io('http://localhost:5000');

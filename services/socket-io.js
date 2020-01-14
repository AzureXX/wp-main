module.exports = (socket, io) => {
  console.log('a user connected');
  socket.emit("hello", "hi")
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });

}
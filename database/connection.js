mongoose.connect('mongodb://localhost:27017/havana', {
    useMongoClient: true,
    promiseLibrary: require('bluebird')
});
// When successfully connected
mongoose.connection.on('connected', function () {
  console.log('Mongodb is connected successfully');
});

// If the connection throws an error
mongoose.connection.on('error', function (err) {
  console.log('Mongodb connection error: ' + err);
});

// When the connection is disconnected
mongoose.connection.on('disconnected', function () {
  console.log('Mongodb connection is disconnected');
});
const express = require("express");
const mongoose = require("mongoose");
const cors = require('cors');

const app = express();

// Bodyparser Middleware
app.use(express.json());

// DB Config
const db = require("./config/keys").mongoURI;

// Connect to Mongo
mongoose
  .connect(db, {
    useNewUrlParser: true,
    useCreateIndex: true
  }) // Adding new mongo url parser
  .then(() => console.log("MongoDB Connected..."))
  .catch(err => console.log(err));


app.use(cors());

// Use Routes
// app.use("/api/users", require("./routes/api/users"));
// app.use("/api/books", require("./routes/api/books"));
// app.use("/api/auth", require("./routes/api/auth"));
// // posts route
// app.use('/posts', require('./routes/posts'));

// The index.js file sends the app to every route file
require('./routes/index')(app);

// // Serve static assets if in production
// if (process.env.NODE_ENV === 'production') {
//   // Set static folder
//   app.use(express.static('client/build'));

//   app.get('*', (req, res) => {
//     res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
//   });
// }

const port = process.env.PORT || 8080;

// This is the listen before Socket.io
// app.listen(port, () => console.log(`Server started on port ${port}`));

// Socket.io
//require the http module
const http = require('http').Server(app)

// require the socket.io module
const io = require('socket.io');

//wire up the server to listen to our port
http.listen(port, () => {
  console.log(`Connected to port ${port}`);
});

const socket = io(http);
//create an event listener

//To listen to messages
socket.on('connection', (socket) => {

  console.log('User connected');

  socket.on("disconnect", function () {
    console.log("User disconnected");
  });

  socket.on("newPost", function (post) {
    console.log("ON newPost");
    console.log(post);
    // Broadcast message to everyone
    socket.broadcast.emit("postReceived", post);
  });

});



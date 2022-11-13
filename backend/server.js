require('colors');
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
const { connectDB } = require('./config/db');
const userRoutes = require('./routes/userRoutes');
const friendRoutes = require('./routes/friendRoutes');
const messageRoutes = require('./routes/messageRoutes');
const utilRoutes = require('./routes/utilRoutes');
const roomRoutes = require('./routes/roomRoutes');
const errorMiddleware = require('./middlewares/errors');
const http = require('http');
const NotificationService = require('./utils/NotificationService');
const bcrypt = require('bcryptjs');
const PORT = process.env.PORT || 5000;

process.on('uncaughtException', err => {
  console.log('ERROR: ' + err.stack);
  console.log('Shutting down the server due to Uncaught Exception');
  process.exit(1);
});

dotenv.config();

const corsOptions = {
  origin: 'http://localhost:3000',
  origin: 'http://localhost:3000',
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};

const app = express();
app.use(cors(corsOptions));
app.use(express.json()); //allow accept json data
app.use(cookieParser(process.env.COOKIE_SECRET));

app.get('/', (req, res) => {
  res.send('app is ready!');
});

//route
app.use('/api/user', userRoutes);
app.use('/api/message', messageRoutes);
app.use('/api/friend', friendRoutes);
app.use('/api/util', utilRoutes)
app.use('/api/room', roomRoutes);

//middleware
app.use(errorMiddleware); //handle error

// add httpserver
const server = http.createServer(app);
NotificationService.startNotificationServive(server);

//connect DB
connectDB().then(() =>
  server.listen(
    PORT,
    console.log(
      `Server started on http://localhost:${PORT} in ${process.env.NODE_ENV} mode`
        .yellow.bold
    )
  )
);

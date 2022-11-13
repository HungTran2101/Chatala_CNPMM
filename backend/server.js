require('colors');
const express = require('express');
const dotenv = require('dotenv');
const { connectDB } = require('./config/db');
const userRoutes = require('./routes/userRoutes');
const errorMiddleware = require('./middlewares/errors');
const NotificationService = require('./utils/NotificationService');
const http = require('http');

const PORT = process.env.PORT || 5000;

process.on('uncaughtException', err => {
  console.log('ERROR: ' + err.stack);
  console.log('Shutting down the server due to Uncaught Exception');
  process.exit(1);
});

dotenv.config();

const app = express();
app.use(cors(corsOptions));
app.use(express.json()); //allow accept json data
app.use(cookieParser(process.env.COOKIE_SECRET));

app.get('/', (req, res) => {
  res.send('app is ready!');
});

//route
app.use('/api/user', userRoutes);

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

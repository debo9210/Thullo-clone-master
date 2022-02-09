const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const colors = require('colors');
const passport = require('passport');

const users = require('./routes/api/users');

const app = express();

//db congig
const DB = require('./config/keys_dev').mongoURI;
mongoose
  .connect(DB, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    // useFindAndModify: false,
  })
  .then(() => console.log('Connected to database'.magenta))
  .catch((err) => console.log(err));

//body parser
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//Use Routes
app.use('/api/users', users);

//server static assets if in production
if (process.env.NODE_ENV === 'production') {
  //set static folder
  app.use(express.static('client/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server running @port ${port}`.rainbow);
});

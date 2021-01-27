
const express = require('express');
const app = express();
const session = require('express-session');

app.set('view engine', 'pug');

app.use(session({
  secret: 'a5d63fc5-17a5-459c-b3ba-6d81792158fc',
  resave: false,
  saveUninitialized: false
}));
app.use((req, res, next)=>{
  let {history} = req.session;
  if (!history) {
    history =[];
    req.session.history = history
  }
  //console.log(`Protocol: ${req.protocol}, Host: ${req.get('host')}, url: ${req.originalUrl} `)
  const url = `${req.protocol}://${req.get('host')}${req.originalUrl}`;

  // Add the URL to the beginning of the array.
  history.unshift(url);
  next()
})

app.get('/', (req, res) => {
  res.render('index', { title: 'Home' ,history: req.session.history,});
});

app.get('/about', (req, res) => {
  res.render('about', { title: 'About', history: req.session.history,});
});

app.get('/contact', (req, res) => {
  res.render('contact', { title: 'Contact', history: req.session.history,});
});

const port = 8080;

app.listen(port, () => console.log(`Listening for connections on port ${port}...`));

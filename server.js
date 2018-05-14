const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const app = express();

app.set('view engine', 'hbs');

hbs.registerPartials(`${__dirname}/views/partials`);
hbs.registerHelper('getCurrentYear', () => new Date().getFullYear());
hbs.registerHelper('screamIt', text => text.toUpperCase());

app.use((req, ref, next) => {
  const now = new Date().toString();
  const log = `${now}\n${req.method}\n${req.url}\n`;
  console.log(log);
  fs.appendFile('server.log', `${log}\n`, (error) => {
    if (error) {
      console.log(`Unable to append to server.log\n${error}`);
    }
    next();
  });
});

app.use((req, res) => res.render('maintenance.hbs'));

app.use(express.static(`${__dirname}/public`));

app.get('/', (req, res) => {
  res.render('home.hbs', {
    pageTitle: 'Home Page',
    bodyText: 'Welcome To our Awesome Site!',
  })
});

app.get('/about', (req, res) => {
  res.render('about.hbs', {
    pageTitle: 'About Page',
    bodyText: 'We are passionate about great software!',
  });
});

app.get('/bad', (req, res) => {
  res.send({
    error: 'Bad Request'
  });
});

app.listen(3000, () => {
  console.log('Server is up on port 3000');
});

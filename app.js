const express = require('express');
const data = require('./data.json');
const projects = data.projects;

const app = express();

/**
 * Add static middleware files from public folder 
 */ 
app.use('/static', express.static('public'));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

/**
 * SET VIEW ENGINE
 */
 app.set('view engine', 'pug');

//-----ROUTES ----//

/**
 * HOME PAGE
 */
app.get('/', function (req, res) {
  res.locals.data = data.projects;
  res.render('index', { projects });
});
/**
 * ABOUT PAGE
 */
app.get('/about', function (req, res) {
  res.render('about', data);
});
/**
 * PROJECTS PAGE
 */
app.get('/projects/:id', (req, res) => {
  const ProjId = req.params.id;
  const project = data.projects[ProjId];
  if(project) {
    res.locals.data = data.projects;
    res.render('project', project);
  } else {
    res.redirect('/404');
  }
});



/* PORT */
app.listen(3000, () => {
    console.log('Application is running on localhost:3000');
});
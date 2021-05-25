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
  const project = projects.find(({id}) => id ===+ ProjId) ;
  if(project) {
    res.locals.data = data.projects;
    res.render('project', project);
  } else {
    res.redirect('/404');
  }
});

/**
 * ERROR HANDLERS - reference https://teamtreehouse.com/library/practice-error-handling-in-express
 */

/* 404 handler to catch undefined or non-existent route requests */ 
app.use((req, res, next) => {

  console.log('404 error');
  res.status(404).render('not-found');
});

/* Global error handler */
app.use((err, req, res, next) => {

  if (err) {
    console.log('Global error handler called', err);
  }
 /**
  * Set the response status to 404
  * Render the 'not-found' view and pass the error object to the view
  */
  if (err.status === 404) {
    res.status(404).render('not-found', { err });
  } else {
    err.message = err.message || `Oops!  It looks like something went wrong on the server.`;
    res.status(err.status || 500).render('error', { err }); //Render the 'error' view, passing it the error object
  }
});

/* PORT */
app.listen(3000, () => {
    console.log('Application is running on localhost:3000');
});
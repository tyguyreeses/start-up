const express = require('express');
const app = express();

// The service port. In production the front-end code is statically hosted by the service on the same port.
const port = process.argv.length > 2 ? process.argv[2] : 4000;

// JSON body parsing using built-in middleware
app.use(express.json());

// Serve up the front-end static content hosting
app.use(express.static('public'));

// Router for service endpoints
var apiRouter = express.Router();
app.use(`/api`, apiRouter);

// GetEntries
apiRouter.get('/entries', (_req, res) => {
  res.send(entries);
});

// SubmitEntry
apiRouter.post('/entry', (req, res) => {
  scores = updateEntries(req.body, entries);
  res.send(entries);
});

// Return the application's default page if the path is unknown
app.use((_req, res) => {
  res.sendFile('index.html', { root: 'public' });
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

// updateScores considers a new score for inclusion in the high scores.
// The high scores are saved in memory and disappear whenever the service is restarted.
let entries = [];
function updateEntries(newEntry, entries) {
    if (!entries.includes(newEntry)) {
        entries.push(newEntry); // Add the new entry only if it doesn't exist
    } else {
        console.log("Entry already exists. Not adding duplicate.");
    }
      return entries;
}
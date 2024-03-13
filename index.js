const express = require('express');
const app = express();
const StockSocket = require('stocksocket');

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
  entries = updateEntries(req.body, entries);
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


// Stock Socket Functionality
// Get the stock price for calculation
apiRouter.post('/getStockPrice', (req, res) => {
    const { ticker } = req.body;

    console.log(ticker);

    let isFirstUpdate = true;

    function stockPriceChanged(data) {
        console.log(data);

        // Send the stock price to the client
        res.send({ price: data.price });

        // Remove the ticker after the first update
        if (isFirstUpdate) {
            StockSocket.removeTicker(ticker);
            isFirstUpdate = false;
        }
    }

    // Add the ticker with the callback for the first stock price update
    StockSocket.addTicker(ticker, stockPriceChanged);
});


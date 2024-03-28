const cookieParser = require('cookie-parser');
const bcrypt = require('bcrypt');
const express = require('express');
const app = express();
const DB = require('./database.js');

const authCookieName = 'token';

// The service port. In production the front-end code is statically hosted by the service on the same port.
const port = process.argv.length > 2 ? process.argv[2] : 4000;

// JSON body parsing using built-in middleware
app.use(express.json());

// Use the cookie parser middleware for tracking authentication tokens
app.use(cookieParser());

// Serve up the front-end static content hosting
app.use(express.static('public'));

// Trust headers that are forwarded from the proxy so we can determine IP addresses
app.set('trust proxy', true);

// Router for service endpoints
var apiRouter = express.Router();
app.use(`/api`, apiRouter);

// CreateAuth token for a new user
apiRouter.post('/auth/create', async (req, res) => {
  if (await DB.getUser(req.body.email)) {
    res.status(409).send({ msg: 'Existing user' });
  } else {
    const user = await DB.createUser(req.body.email, req.body.password);

    // Set the cookie
    setAuthCookie(res, user.token);

    res.send({
      id: user._id,
    });
  }
});

// GetAuth token for the provided credentials
apiRouter.post('/auth/login', async (req, res) => {
  const user = await DB.getUser(req.body.email);
  if (user) {
    if (await bcrypt.compare(req.body.password, user.password)) {
      setAuthCookie(res, user.token);
      res.send({ id: user._id });
      return;
    }
  }
  res.status(401).send({ msg: 'Unauthorized' });
});

// DeleteAuth token if stored in cookie
apiRouter.delete('/auth/logout', (_req, res) => {
  res.clearCookie(authCookieName);
  res.status(204).end();
});

// GetUser returns information about a user
apiRouter.get('/user/:email', async (req, res) => {
  const user = await DB.getUser(req.params.email);
  if (user) {
    const token = req?.cookies.token;
    res.send({ email: user.email, authenticated: token === user.token });
    return;
  }
  res.status(404).send({ msg: 'Unknown' });
});

// secureApiRouter verifies credentials for endpoints
var secureApiRouter = express.Router();
apiRouter.use(secureApiRouter);

secureApiRouter.use(async (req, res, next) => {
  authToken = req.cookies[authCookieName];
  const user = await DB.getUserByToken(authToken);
  if (user) {
    next();
  } else {
    res.status(401).send({ msg: 'Unauthorized' });
  }
});

// GetEntries
secureApiRouter.get('/entries', async (req, res) => {
  const userEmail = req.query.email; // Extract the email from the query parameters
  const user = await DB.getUser(userEmail); // Look up the user using the extracted email
  console.log("User found: ", user);
  if (user) {
    const entries = await DB.getEntries(user);
    console.log("Entries found: ", entries)
    res.send(entries);
  } else {
    console.log("Couldn't find user: ", userEmail);
    res.status(404).send({ msg: 'User not found' });
  }
});

// SubmitEntry
secureApiRouter.post('/entry', async (req, res) => {
  const userEmail = req.query.email; // Extract the email from the query parameters
  const entry = { ...req.body, ip: req.ip };
  console.log("Entry to add: ", entry);
  const user = await DB.getUser(userEmail); // Look up the user using the extracted email
  console.log("User found: ", user);
  if (user) {
    await DB.addEntry(user, entry);
    const entries = await DB.getEntries(user);
    res.send(entries);
  } else {
    console.log("Couldn't find user: ", userEmail);
    res.status(404).send({ msg: 'User not found' });
  }
});

// Return the application's default page if the path is unknown
app.use((_req, res) => {
  res.sendFile('index.html', { root: 'public' });
});

// Default error handler
app.use(function (err, req, res, next) {
  res.status(500).send({ type: err.name, message: err.message });
});

// setAuthCookie in the HTTP response
function setAuthCookie(res, authToken) {
  res.cookie(authCookieName, authToken, {
    secure: true,
    httpOnly: true,
    sameSite: 'strict',
  });
}

const server = app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});


// Get the stock price for calculation
apiRouter.post('/getStockPrice', (req, res) => {
  const { ticker } = req.body;
  fetchStockPrice(ticker)
  .then(price => {
    if (price !== null) {
    console.log(`Current price of ${ticker}: ${price}`);
    res.send({ ticker: price })
    } else {
    console.log('Failed to fetch stock price.');
    }
  })
  .catch(err => console.error(err));
});

// gets stock price from Yahoo Finance's free stock information access system
async function fetchStockPrice(ticker) {
  const apiUrl = `https://query1.finance.yahoo.com/v8/finance/chart/${ticker}`;

  try {
    const response = await fetch(apiUrl);
    const data = await response.json();

    // Check if the API returned an error
    if (data.chart.error) {
      throw new Error(data.chart.error.description);
    }

    // Extracting the current price from the response
    const currentPrice = data.chart.result[0].meta.regularMarketPrice;
    return currentPrice;
  } catch (error) {
    console.error('Error fetching stock price:', error.message);
    return null;
  }
}

// // =================================== chat functionality =================================== //
const { WebSocketServer } = require('ws');

// Create a websocket object
const wss = new WebSocketServer({ noServer: true, path: '/ws' });

// Handle the protocol upgrade from HTTP to WebSocket
server.on('upgrade', (request, socket, head) => {
  wss.handleUpgrade(request, socket, head, function done(ws) {
    wss.emit('connection', ws, request);
  });
});

// Keep track of all the connections so we can forward messages
let connections = [];
let id = 0;

wss.on('connection', (ws) => {
  const connection = { id: ++id, alive: true, ws: ws };
  connections.push(connection);

  // Forward messages to everyone except the sender
  ws.on('message', function message(data) {
    connections.forEach((c) => {
      if (c.id !== connection.id) {
        c.ws.send(data);
      }
    });
  });

  // Remove the closed connection so we don't try to forward anymore
  ws.on('close', () => {
    const pos = connections.findIndex((o, i) => o.id === connection.id);

    if (pos >= 0) {
      connections.splice(pos, 1);
    }
  });

  // Respond to pong messages by marking the connection alive
  ws.on('pong', () => {
    connection.alive = true;
  });
});

// Keep active connections alive
setInterval(() => {
  connections.forEach((c) => {
    // Kill any connection that didn't respond to the ping last time
    if (!c.alive) {
      c.ws.terminate();
    } else {
      c.alive = false;
      c.ws.ping();
    }
  });
}, 10000);



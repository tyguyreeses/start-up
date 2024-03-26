// chat functionality
// Adjust the webSocket protocol to what is being used for HTTP
const protocol = window.location.protocol === 'http:' ? 'ws' : 'wss';
const socket = new WebSocket(`${protocol}://${window.location.host}/ws`);

// Display that we have opened the webSocket
socket.onopen = (event) => {
  appendMsg('system', 'websocket', 'connected');
};

// Display messages we receive from our friends
socket.onmessage = async (event) => {
  const text = await event.data.text();
  const chat = JSON.parse(text);
  appendMsg('friend', chat.name, chat.msg);
};

// If the webSocket is closed then disable the interface
socket.onclose = (event) => {
  appendMsg('system', 'websocket', 'disconnected');
  document.querySelector('#chat-controls').disabled = true;
};

// Send a message over the webSocket
function sendMessage() {
  const msgEl = document.querySelector('#new-msg');
  const msg = msgEl.value;
  if (!!msg) {
    appendMsg('me', 'me', msg);
    const name = document.querySelector('#username_display').value;
    socket.send(`{"name":"${name}", "msg":"${msg}"}`);
    msgEl.value = '';
  }
}

// Create one long list of messages
function appendMsg(cls, from, msg) {
  const chatText = document.querySelector('#chat-text');
  const chatEl = document.createElement('div');
  chatEl.innerHTML = `<span class="${cls}">${from}</span>: ${msg}</div>`;
  chatText.prepend(chatEl);
}

// Send message on enter keystroke
const input = document.querySelector('#new-msg');
input.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    sendMessage();
  }
});

// Disable chat if no name provided
const chatControls = document.querySelector('#chat-controls');
const myName = document.querySelector('#username_display');
myName.addEventListener('keyup', (e) => {
  chatControls.disabled = myName.value === '';
});



// ============================================================ //




// entries functionality
async function loadEntries() {

    let entries = [];
    try {
      // Get the latest entries from the service
      const response = await fetch('/api/entries');
      entries = await response.json();
  
      // Save the scores in case we go offline in the future
      localStorage.setItem('entries', JSON.stringify(entries));
    } catch {
      // If there was an error then just use the last saved scores
      const entriesText = localStorage.getItem('entries');
      if (entriesText) {
        entries = JSON.parse(entriesText);
      }
    }
    displayEntries(entries);

  }

  function displayEntries(entries) {
    // finds the table element excluding the headers
    const tableBodyEl = document.querySelector('#job_entries');

    if (entries.length) {
      // for each key value pair [i, entry] in entries
      for (const [i, entry] of entries.entries()) {
        // create the td elements
        const nameTdEl = document.createElement('td');
        const yearlyTdEl = document.createElement('td');
        const periodTdEl = document.createElement('td');
        const stockTdEl = document.createElement('td');
        // set the value of the td element to the entry in storage
        nameTdEl.textContent = entry.name;
        yearlyTdEl.textContent = entry.yearly;
        periodTdEl.textContent = entry.period;
        stockTdEl.textContent = entry.stockPrice;
        // create the row element and append the td elements to it
        const rowEl = document.createElement('tr');
        rowEl.appendChild(nameTdEl);
        rowEl.appendChild(yearlyTdEl);
        rowEl.appendChild(periodTdEl);
        rowEl.appendChild(stockTdEl);
        // append the created row element to the existing table body
        tableBodyEl.appendChild(rowEl);
      }
    } else {
      tableBodyEl.innerHTML = '<tr><td colSpan=4>No entries saved</td></tr>';
    }
  }
  
  loadEntries();
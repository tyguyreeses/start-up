// let sortDirection = 1;
// let entriesData = [];

async function loadEntries() {
    // const previousEntriesJSON = localStorage.getItem('previousEntries');
    // if (previousEntriesJSON) {
    //   entriesData = JSON.parse(previousEntriesJSON);
    // }
    // displayEntries(entriesData);

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
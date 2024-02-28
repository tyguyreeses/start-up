function loadEntries() {
    let entries = [];
    const previousEntriesJSON = localStorage.getItem('previousEntries');
    if (previousEntriesJSON) {
      entries = JSON.parse(previousEntriesJSON);
    }

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
        stockTdEl.textContent = entry.stock;
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
      tableBodyEl.innerHTML = '<tr><td colSpan=3>No entries saved</td></tr>';
    }
  }
  
  loadEntries();
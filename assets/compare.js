let sortDirection = 1;
let entriesData = [];

function loadEntries() {
    const previousEntriesJSON = localStorage.getItem('previousEntries');
    if (previousEntriesJSON) {
      entriesData = JSON.parse(previousEntriesJSON);
    }
    displayEntries(entriesData);
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

  // in progress, copied over from the codePen at https://codepen.io/Ty-Reese/pen/oNVOEJr?editors=0010
  function sortColumn(column) {
    // sortDirection *= -1;
    // let sortBy = column.innerText;
    // const sortedData = entriesData.sort((a, b) => (a[sortBy] > b[sortBy] ? 1 : -1) * sortDirection);
    // displayEntries(sortedData);
  }
  
  loadEntries();
// Stock Price Websocket
// const StockSocket = require("stocksocket");

// Calulate Functionality

class Entry {
    dataInputs;
    name;
    salary;
    bonus = 0;
    period;
    calculatedYearly;
    calculatedPeriod;
    stockTicker;
    stockAmt;
    stockPrice;

    testForm() {
        // set initial values
        this.dataInputs = document.getElementsByClassName('info_input'); // gets all the text entry fields
        this.name = this.dataInputs[0].value.trim();
        this.salary = parseFloat(this.dataInputs[1].value.trim());
        this.bonus = this.dataInputs[2].value.trim() ? parseFloat(this.dataInputs[2].value.trim()) : 0.00;
        this.period = document.getElementById('pay_period').value;
        this.stockTicker = document.getElementById('stock_tag').value;
        this.stockAmt = parseInt(document.getElementById("stock_amt").value.trim());
        this.stockPrice = 0.00;

        for (let i = 0; i < this.dataInputs.length; i++) {
            let input = this.dataInputs[i];
            let inputValue = input.value.trim();
            if (inputValue === '') {
                alert('Please fill in all fields.');
                return false;
            }
            if (i > 0 && isNaN(inputValue)) {
                alert("Please enter a valid input.\nDon't include '$' or commas.")
                return false;
            }
        }
        return true;
    }

    calculateSalary() {
        if (this.testForm()) {
            // calculate stock grants
            if(this.stockTicker) {
                this.getStockPrice();
            }
            // calculate yearly takehome
            let yearlySalary = this.salary + this.bonus;
            this.calculatedYearly = yearlySalary;
            let periodSalary = '';
            let selector = '';
            if (this.period === ' Monthly') {
                periodSalary = yearlySalary / 12;
                selector = "Monthly";
            } else if (this.period === ' Bi-Weekly') {
                periodSalary = yearlySalary / 26;
                selector = 'Bi-Weekly';
            } else if (this.period === ' Weekly') {
                periodSalary = yearlySalary / 52;
                selector = 'Weekly';
            }
            this.calculatedPeriod = parseFloat(periodSalary).toFixed(2);
            // display calculated salaries
            this.displayCalculatedSalaries(yearlySalary, selector);
            
            // show the submit button
            document.getElementById('submit').style.display= "block";
            return true;
        } else {
            return false;
        }
    }

    displayCalculatedSalaries(yearly, selector) {
        // update HTML elements to display calculated salaries
        const yearlySalaryElement = document.getElementById('yearlySalary');
        const timeSalaryElement = document.getElementById('timeSalary');
        const timeSalaryLabelEl = document.getElementById('timeSalaryLabel');
        
        // display the elements
        const salaryInfo = document.getElementsByClassName('salaryInfo');
        for (let item of salaryInfo) {
            item.style.display = 'block';
        }
    
        // update the content of the elements
        timeSalaryLabelEl.firstChild.nodeValue = selector +' Takehome: $'; // firstChild.nodeValue doesn't affect nested div
        yearlySalaryElement.textContent = yearly.toFixed(2);
        timeSalaryElement.textContent = this.calculatedPeriod;
    
    }

    async getStockPrice() {
        try {
            const response = await fetch('/api/getStockPrice', {
                method: 'POST',
                headers: {'content-type': 'application/json'},
                body: JSON.stringify({ ticker: this.stockTicker }),
            });
            
            if(!response.ok) {
                alert("Please enter a valid ticker symbol or leave entry field blank");
                throw new Error('failed to get stock price');
            }

            console.log("stockTicker in frontend code: ",this.stockTicker);

            const data = await response.json();
            // saves the current stock price
            this.stockPrice = data.ticker;
            console.log(this.stockPrice);

            const stockDisplayEl = document.getElementById('stockDisplay');
            const stockPriceEl = document.getElementById('stock_price');
            stockPriceEl.textContent = "$" + this.stockPrice;
            stockDisplayEl.textContent = (this.stockPrice * this.stockAmt).toFixed(2);

        } catch (error) {
            console.log("error in calculate stock: ", error);
            alert("Please enter a valid ticker symbol or leave entry field blank");
        }

    }

    async saveEntry() {
        const newEntry = {
            name: this.name,
            yearly: "$" + this.calculatedYearly,
            period: "$" + this.calculatedPeriod + this.period,
            stockTicker: this.stockTicker,
            stockPrice: "$" + this.stockPrice
        }

        try {
            const response = await fetch('/api/entry', {
              method: 'POST',
              headers: {'content-type': 'application/json'},
              body: JSON.stringify(newEntry),
            });
      
            // Store what the service gave us as the new entry
            const entries = await response.json();
            localStorage.setItem('entries', JSON.stringify(entries));
            window.location.href = "compare.html";
          } catch {
            // If there was an error then just track scores locally
            this.updateEntriesLocal(newEntry);
          }
    }

    updateEntriesLocal(newEntry) {
        const previousEntriesJSON = localStorage.getItem('previousEntries');
        const previousEntries = previousEntriesJSON ? JSON.parse(previousEntriesJSON) : [];

        previousEntries.push(newEntry);
        localStorage.setItem('previousEntries', JSON.stringify(previousEntries));
        window.location.href = "compare.html";
    }
}

function resetStyle() {
    // hide submit button
    const submit = document.getElementById('submit');
    submit.style.display= "none";
    // hide calculated summaries
    const salaryInfo = document.getElementsByClassName('salaryInfo');
        for (item of salaryInfo) {
            item.style.display = 'none';
        }
}

const entry = new Entry();

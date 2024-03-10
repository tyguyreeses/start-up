// Stock Price Websocket
const StockSocket = require("stocksocket");

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
    stock;

    testForm() {
        // set initial values
        this.dataInputs = document.getElementsByClassName('info_input'); // gets all the text entry fields
        this.name = this.dataInputs[0].value.trim();
        this.salary = parseFloat(this.dataInputs[1].value.trim());
        this.bonus = this.dataInputs[2].value.trim() ? parseFloat(this.dataInputs[2].value.trim()) : 0.00;
        this.period = document.getElementById('pay_period').value;
        this.stockTicker = document.getElementById('stock_tag').value;
        this.stock = 0.00;

        for (let i = 0; i < this.dataInputs.length; i++) {
            let input = this.dataInputs[i];
            let inputValue = input.value.trim();
            if (inputValue === '') {
                alert('Please fill in all fields.');
                return false;
            }
            if (i > 0) {
                if (isNaN(inputValue)) {
                    alert("Please enter a valid input.\nDon't include '$' or commas.")
                    return false;
                }
            }
        }
        return true;
    }

    calculateSalary() {
        if (this.testForm()) {
            // calculate stock grants
            if(this.stockTicker) {
                console.log("Haven't added this funcitonality yet");
                // this.calculateStock();
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

    calculateStock() {
        try {
            StockSocket.addTicker(this.stockTicker, this.stockPriceChanged); // sets up live updates
            StockSocket.removeAllTickers(); // remove live funcitonality after one update
        } catch (error) {
            console.error("Error in calculateStock: ", error);
            alert("Please enter a valid ticker symbol or leave entry field blank")
        }

    }

    saveEntry() {
        const previousEntriesJSON = localStorage.getItem('previousEntries');
        const previousEntries = previousEntriesJSON ? JSON.parse(previousEntriesJSON) : [];
        const newEntry = {
            name: this.name,
            yearly: "$" + this.calculatedYearly,
            period: "$" + this.calculatedPeriod + this.period,
            stock: "$" + this.stock
        }
        previousEntries.push(newEntry);
        localStorage.setItem('previousEntries', JSON.stringify(previousEntries));
        window.location.href = "compare.html";
    }

    stockPriceChanged(data) {
        //Choose what to do with your data as it comes in.
        // update price per share
        const priceEl = document.getElementById('stock_price');
        this.stock = data.price.toFixed(2);
        console.log(this.stock);
        priceEl.textContent = "$" + this.stock;
        // update total stock display
        const stockDisplayEl = document.getElementById('stockDisplay');
        const stockAmtEl = document.getElementById("stock_amt").value;
        stockDisplayEl.textContent = this.stock * stockAmtEl;
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

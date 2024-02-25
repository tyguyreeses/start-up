// Calulate Functionality


class Entry {
    dataInputs;
    name;
    salary;
    bonus;
    period;
    calculatedYearly;
    calculatedPeriod;

    calculateSalary() {
        if (this.testForm()) {
            // calculate yearly takehome
            let yearlySalary = this.salary + this.bonus;
            this.calculatedYearly = yearlySalary;
            let periodSalary = '';
            let selector = '';
            if (this.period === 'monthly') {
                periodSalary = yearlySalary / 12;
                selector = "Monthly";
            } else if (this.period === 'biweekly') {
                periodSalary = yearlySalary / 26;
                selector = 'Bi-Weekly';
            } else if (this.period === 'weekly') {
                periodSalary = yearlySalary / 52;
                selector = 'Weekly';
            }
            this.calculatedPeriod = periodSalary;
            // display calculated salaries
            this.displayCalculatedSalaries(yearlySalary, periodSalary, selector);
            
            // show the submit button
            document.getElementById('submit').style.display= "block";
            return true;
        } else {
            return false;
        }
    }

    testForm() {
        console.log("testForm: " + document.getElementById('timeSalary'));
        // set initial values
        this.dataInputs = document.getElementsByClassName('info_input'); // gets all the text entry fields
        this.name = this.dataInputs[0].value.trim();
        this.salary = parseFloat(this.dataInputs[1].value.trim());
        this.bonus = parseFloat(this.dataInputs[2].value.trim());
        this.period = document.getElementById('pay_period').value;
        if (!this.dataInputs.length) {
            alert('FILL IN THE FORM');
            return false;
        }
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

    displayCalculatedSalaries(yearly, variableSalary, selector) {
        // update HTML elements to display calculated salaries
        const yearlySalaryElement = document.getElementById('yearlySalary');
        const timeSalaryElement = document.getElementById('timeSalary');
        const yearlySalaryLabelEl = document.getElementById('yearlySalaryLabel');
        const timeSalaryLabelEl = document.getElementById('timeSalaryLabel');
        
        // display the elements
        timeSalaryLabelEl.style.display= "block";
        yearlySalaryLabelEl.style.display= "block";
    
        // update the content of the elements
        timeSalaryLabelEl.firstChild.nodeValue = selector +' Takehome: $'; // firstChild.nodeValue doesn't affect nested div
        yearlySalaryElement.textContent = yearly.toFixed(2);
        timeSalaryElement.textContent = variableSalary.toFixed(2);
    
    }

    saveEntry() {
        const previousEntriesJSON = localStorage.getItem('previousEntries');
        const previousEntries = previousEntriesJSON ? JSON.parse(previousEntriesJSON) : [];
        const newEntry = {
            name: this.name,
            yearly: this.calculatedYearly,
            period: this.calculatedPeriod
        }
        previousEntries.push(newEntry);
        localStorage.setItem('previousEntries', JSON.stringify(previousEntries));
    }
}

function resetStyle() {
    // hide submit button
    const submit = document.getElementById('submit');
    submit.style.display= "none";
    // hide calculated summaries
    const yearlySalaryEl = document.getElementById('yearlySalaryLabel');
    const timeSalaryEl = document.getElementById('timeSalaryLabel');
    timeSalaryEl.style.display= "none";
    yearlySalaryEl.style.display= "none";
}

const entry = new Entry();

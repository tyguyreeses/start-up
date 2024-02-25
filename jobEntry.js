// Calulate Functionality

// function calculateSalary() {
//     //test the form
//     if (testForm()) {
//         // access inputted information
//         let dataInputs = document.getElementsByClassName('info_input');
//         let salary = parseFloat(dataInputs[1].value.trim());
//         let bonus = parseFloat(dataInputs[2].value.trim());
//         // calculate yearly takehome
//         let yearlySalary = salary + bonus;
//         // calculate variable income based on selector
//         let payPeriod = document.getElementById('pay_period');
//         let timeSalary = '';
//         let selector = '';
//         if (self.period === 'monthly') {
//             timeSalary = yearlySalary / 12;
//             selector = "Monthly";
//         } else if (self.period === 'biweekly') {
//             timeSalary = yearlySalary / 26;
//             selector = 'Bi-Weekly';
//         } else if (self.period === 'weekly') {
//             timeSalary = yearlySalary / 52;
//             selector = 'Weekly';
//         }
        
//         // display calculated salaries
//         displayCalculatedSalaries(yearlySalary, timeSalary, selector);
        
//         // show the submit button
//         let submit = document.getElementById('submit');
//         submit.style.display= "block";
//     } else {
//         return false;
//     }
// }

// function testForm() {
//     let dataInputs = document.getElementsByClassName('info_input');
//     for (let i = 0; i < dataInputs.length; i++) {
//         let input = dataInputs[i];
//         let inputValue = input.value.trim();
//         if (inputValue === '') {
//             alert('Please fill in all fields.');
//             return false; // Prevent form submission
//         }
//         if (i > 0) {
//             if (isNaN(inputValue)) {
//                 alert("Please enter valid numbers.\nDon't include '$' or commas.")
//                 return false;
//             }
//         }
//     }
//     return true;
// }

// function displayCalculatedSalaries(yearly, variableSalary, selector) {
//     // update HTML elements to display calculated salaries
//     let yearlySalaryElement = document.getElementById('yearlySalary');
//     let timeSalaryElement = document.getElementById('timeSalary');
//     let yearlySalaryLabelEl = document.getElementById('yearlySalaryLabel');
//     let timeSalaryLabelEl = document.getElementById('timeSalaryLabel');
    
//     // display the elements
//     timeSalaryLabelEl.style.display= "inline-block";
//     yearlySalaryLabelEl.style.display= "inline-block";

//     // update the content of the elements
//     timeSalaryLabelEl.textContent = selector +' Takehome: $';
//     yearlySalaryElement.textContent = yearly.toFixed(2);
//     timeSalaryElement.textContent = variableSalary.toFixed(2);

// }


class Entry {
    dataInputs;
    name;
    salary;
    bonus;
    period;
    constructor() {
        this.dataInputs = document.getElementsByClassName('info_input'); // gets all the text entry fields
        this.name = this.dataInputs[0].value.trim();
        this.salary = parseFloat(this.dataInputs[1].value.trim());
        this.bonus = parseFloat(this.dataInputs[2].value.trim());
        this.period = document.getElementById('pay_period').value;
    }

    calculateSalary() {
        if (this.testForm()) {
            // calculate yearly takehome
            let yearlySalary = this.salary + this.bonus;
            let periodSalary = '';
            let selector = '';
            if (self.period === 'monthly') {
                periodSalary = yearlySalary / 12;
                selector = "Monthly";
            } else if (self.period === 'biweekly') {
                periodSalary = yearlySalary / 26;
                selector = 'Bi-Weekly';
            } else if (self.period === 'weekly') {
                periodSalary = yearlySalary / 52;
                selector = 'Weekly';
            }
            
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
        for (let i = 0; i < self.dataInputs.length; i++) {
            let input = self.dataInputs[i];
            let inputValue = input.value.trim();
            if (inputValue === '') {
                alert('Please fill in all fields.');
                return false; // Prevent form submission
            }
            if (i > 0) {
                if (isNaN(inputValue)) {
                    alert("Please enter valid numbers.\nDon't include '$' or commas.")
                    return false;
                }
            }
        }
        return true;
    }

    displayCalculatedSalaries(yearly, variableSalary, selector) {
        // update HTML elements to display calculated salaries
        let yearlySalaryElement = document.getElementById('yearlySalary');
        let timeSalaryElement = document.getElementById('timeSalary');
        let yearlySalaryLabelEl = document.getElementById('yearlySalaryLabel');
        let timeSalaryLabelEl = document.getElementById('timeSalaryLabel');
        
        // display the elements
        timeSalaryLabelEl.style.display= "block";
        yearlySalaryLabelEl.style.display= "block";
    
        // update the content of the elements
        timeSalaryLabelEl.textContent = selector +' Takehome: $';
        yearlySalaryElement.textContent = yearly.toFixed(2);
        timeSalaryElement.textContent = variableSalary.toFixed(2);
    
    }

    saveEntry() {

    }
}

function resetStyle() {
    // hide submit button
    let submit = document.getElementById('submit');
    submit.style.display= "none";
    // hide calculated summaries
    let yearlySalaryEl = document.getElementById('yearlySalaryLabel');
    let timeSalaryEl = document.getElementById('timeSalaryLabel');
    timeSalaryEl.style.display= "none";
    yearlySalaryEl.style.display= "none";
}

const entry = new Entry();

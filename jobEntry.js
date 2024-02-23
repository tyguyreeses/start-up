// Calulate Functionality

function calculateSalary() {
    //test the form
    if (testForm()) {
        // access inputted information
        let dataInputs = document.getElementsByClassName('info_input');
        let salary = parseFloat(dataInputs[1].value.trim());
        let bonus = parseFloat(dataInputs[2].value.trim());
        // calculate yearly takehome
        let yearlySalary = salary + bonus;
        // calculate variable income based on selector
        let payPeriod = document.getElementById('pay_period');
        let timeSalary = '';
        let selector = '';
        if (payPeriod.value === 'monthly') {
            timeSalary = yearlySalary / 12;
            selector = "Monthly";
        } else if (payPeriod.value === 'biweekly') {
            timeSalary = yearlySalary / 26;
            selector = 'Bi-Weekly';
        } else if (payPeriod.value === 'weekly') {
            timeSalary = yearlySalary / 52;
            selector = 'Weekly';
        }
        
        // display calculated salaries
        displayCalculatedSalaries(yearlySalary, timeSalary, selector);
        
        // show the submit button
        let submit = document.getElementById('submit');
        submit.style.display= "block";
    } else {
        return false;
    }
}

function testForm() {
    let dataInputs = document.getElementsByClassName('info_input');
    for (let i = 0; i < dataInputs.length; i++) {
        let input = dataInputs[i];
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

function displayCalculatedSalaries(yearly, variableSalary, selector) {
    // update HTML elements to display calculated salaries
    let yearlySalaryElement = document.getElementById('yearlySalary');
    let timeSalaryElement = document.getElementById('timeSalary');

    timeSalaryElement.style.display= "block";
    yearlySalaryElement.style.display= "block";

    // update the content of the elements
    yearlySalaryElement.textContent = 'Yearly Takehome: $' + yearly.toFixed(2);
    timeSalaryElement.textContent = selector +' Takehome: $' + variableSalary.toFixed(2);

}

function resetStyle() {
    // hide submit button
    let submit = document.getElementById('submit');
    submit.style.display= "none";
    // hide calculated summaries
    let yearlySalaryElement = document.getElementById('yearlySalary');
    let timeSalaryElement = document.getElementById('timeSalary');
    timeSalaryElement.style.display= "none";
    yearlySalaryElement.style.display= "none";
}

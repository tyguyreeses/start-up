import React, { Component } from 'react';

class Entry extends Component {
  constructor(props) {
    super(props);

    // Initialize state
    this.state = {
        username: '',
        name: '',
        salary: 0.0,
        bonus: 0.0,
        period: 'Monthly',
        calculatedYearly: 0.0,
        calculatedPeriod: 0.0,
        stockTicker: '',
        stockAmt: 0,
        stockPrice: 0.0,
        errorMessage: '',
        showSubmitButton: false
    };
  }

  handleInputChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value })
  }

  testForm = () => {
    // Implement testForm function
    const { name, salary, bonus, stockAmt } = this.state;

    if (!name || !salary) {
      alert('Please fill in all required fields.');
      return false;
    }

    if (isNaN(parseFloat(salary)) || isNaN(parseFloat(bonus)) || isNaN(parseFloat(stockAmt))) {
       alert("Please enter a valid input.\n(Don't include '$' or commas in numeric fields)");
      return false;
    }

  }

  calculateSalary = () => {
    // Implement calculateSalary function
    if (this.testForm) {
      // calculate stock grants
      if(this.stockTicker) {
        this.getStockPrice();
      }
      // calculate yearly takehome
      const calculatedYearly = parseFloat(this.state.salary) + parseFloat(this.state.bonus);
      let calculatedPeriod;
      if (this.state.period === ' Monthly') {
          calculatedPeriod = parseFloat(calculatedYearly / 12).toFixed(2);
      } else if (this.state.period === ' Bi-Weekly') {
          calculatedPeriod = parseFloat(calculatedYearly / 26).toFixed(2);
      } else if (this.state.period === ' Weekly') {
          calculatedPeriod = parseFloat(calculatedYearly / 52).toFixed(2);
      }
      this.setState({
        calculatedYearly: calculatedYearly,
        calculatedPeriod: calculatedPeriod,
        showSubmitButton: true
      })
      // display calculated salaries
      this.displayCalculatedSalaries();
      return true;
    } else {
        return false;
    }
  }

  displayCalculatedSalaries = () => {
    // Implement displayCalculatedSalaries function
  }

  getStockPrice = async () => {
    // Implement getStockPrice function
  }

  handleSubmit = (event) => {
    event.preventDefault();
    this.saveEntry();
  }

  saveEntry = async () => {
    // Implement saveEntry function
  }

  updateEntriesLocal = (newEntry) => {
    // Implement updateEntriesLocal function
  }

  resetStyle = () => {
    // Implement resetStyle function
  }

  render() {
    return (
      <main>
        <form className="form" action="" onSubmit={this.handleSubmit}>
          <section id="data_entry">
            <section className="form_section" id="company_info">
              <h1>Company Info</h1>
              <div className="info_label">
                <label hmtlFor="title">Company Name: </label>
                <input className="info_input" type="text" id="title" />
              </div>
              <div className="info_label">
                <label hmtlFor="salary">Yearly Salary: </label>
                <input className="info_input" type="text" id="salary" />
              </div>
              <div className="info_label">
                <label hmtlFor="bonus">Annual Bonus: </label>
                <input className="info_input" type="text" id="bonus" />
              </div>
              <div className="info_label">
                <label hmtlFor="pay_period">Pay Period:  </label>
                <select id="pay_period" name="pay_period">
                  <option value=" Monthly">Monthly</option>
                  <option value=" Bi-Weekly">Bi-Weekly</option>
                  <option value=" Weekly">Weekly</option>
                </select>
              </div>
            </section>
            <section className="form_section" id="stock_options">
              <h1>Stock Options</h1>
              <table>
                <thead>
                  <tr>
                    <th>Stock Tag</th>
                    <th># of Shares</th>
                    <th>Share Price</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      <input className="stock_input" type="text" id="stock_tag" />
                    </td>
                    <td>
                      <input className="stock_input" type="text" id="stock_amt" />
                    </td>
                    <td className="stock_input" id="stock_price">---</td>
                  </tr>
                </tbody>
              </table>
            </section>
          </section>
          <div>
            {this.calculateSalary() ? (
              <section id="salaryCalculation">
                <div className="salaryInfo" id="yearlySalaryLabel">Yearly Takehome: ${this.state.calculatedYearly}</div>
                <div className="salaryInfo" id="timeSalaryLabel">{this.state.period} Takehome: ${this.state.calculatedPeriod}</div>
                <div className="salaryInfo" id="stockLabel">Stock Benefits: ${this.state.stockPrice}</div>
              </section>
            ) : null}
          </div>
          <section id="buttons">
            <div>
              <button className="entryButton" id="calculate" onClick={this.calculateSalary}>Calculate</button>
            </div>
            <div>
              <button className="entryButton" type="reset" id="reset" onClick={this.resetStyle}>Reset</button>
            </div>
            <div>
              {this.state.showSubmitButton ? (
                <button className="entryButton" type="submit" id="submit">Save Entry</button>
                ) : null}
            </div>
          </section>
        </form>
      </main>
    );
  }
}

export default Entry;
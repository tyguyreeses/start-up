import React, { Component } from 'react';

class Entry extends Component {
  constructor(props) {
    super(props);

    // Initialize state
    this.state = {
        username: localStorage.getItem("username"),
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
        showSubmitButton: false,
        correctForm: false,
        calculated: false
    };
  }

  handleInputChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value })
  }

  testForm = () => {
    // Implement testForm function
    console.log("Running testForm...");
    const { name, salary, bonus, stockAmt } = this.state;
    console.log(`name: ${name}, salary: ${salary}, bonus: ${bonus}, stockAmt: ${stockAmt}`);
    if (!name || !salary) {
      alert('Please fill in all required fields.');
      this.setState({ correctForm: false });
      return;
    }

    if (isNaN(parseFloat(salary)) || isNaN(parseFloat(bonus)) || isNaN(parseFloat(stockAmt))) {
       alert("Please enter a valid input.\n(Don't include '$' or commas in numeric fields)");
       this.setState({ correctForm: false });
       return;
    }
    console.log("Setting correctForm to true");
    this.setState({ correctForm: true });

  }

  calculateSalary = () => {
    // Implement calculateSalary function
    console.log("Running calculateSalary...");
    this.testForm();
    console.log("this.state.correctForm: ", this.state.correctForm);
    if (this.state.correctForm) {
      console.log("Passed testForm");
      // calculate stock grants
      if(this.stockTicker) {
        console.log("Passed stockTicker");
        this.getStockPrice();
      }
      // calculate yearly takehome
      const calcYearly = parseFloat(this.state.salary) + parseFloat(this.state.bonus);
      let calcPeriod;
      if (this.state.period === 'Monthly') {
          calcPeriod = parseFloat(calcYearly / 12).toFixed(2);
      } else if (this.state.period === 'Bi-Weekly') {
          calcPeriod = parseFloat(calcYearly / 26).toFixed(2);
      } else if (this.state.period === 'Weekly') {
          calcPeriod = parseFloat(calcYearly / 52).toFixed(2);
      }
      console.log("updating the states variables...");
      this.setState({
        calculatedYearly: calcYearly,
        calculatedPeriod: calcPeriod,
        showSubmitButton: true,
        calculated: true
      })
      console.log(`showSubmitButton: ${this.state.showSubmitButton}, calculated: ${this.state.calculated}`);
      // display calculated salaries
      // this.displayCalculatedSalaries();
    }
  }

  // displayCalculatedSalaries = () => {
  //   // Implement displayCalculatedSalaries function
  // }

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
    this.setState({
      showSubmitButton: false,
      correctForm: false,
      calculated: false
    })
  }

  render() {
    console.log("this.state.calculated is: ", this.state.calculated)
    return (
      <main>
        <form className="form" action="" onSubmit={this.handleSubmit}>
          <section id="data_entry">
            <section className="form_section" id="company_info">
              <h1>Company Info</h1>
              <div className="info_label">
                <label htmlFor="title">Company Name: </label>
                <input className="info_input" type="text" id="title" placeholder="enter name" name="name" onChange={this.handleInputChange}/>
              </div>
              <div className="info_label">
                <label html="salary">Yearly Salary: </label>
                <input className="info_input" type="text" id="salary" placeholder="enter salary" name="salary" onChange={this.handleInputChange}/>
              </div>
              <div className="info_label">
                <label html="bonus">Annual Bonus: </label>
                <input className="info_input" type="text" id="bonus" placeholder="0" name="bonus" onChange={this.handleInputChange}/>
              </div>
              <div className="info_label">
                <label html="pay_period">Pay Period:  </label>
                <select id="pay_period" name="period" onChange={this.handleInputChange} value={this.state.period}>
                  <option value="Monthly">Monthly</option>
                  <option value="Bi-Weekly">Bi-Weekly</option>
                  <option value="Weekly">Weekly</option>
                </select>
              </div>
            </section>
            <section className="form_section" id="stock_options">
              <h1>Stock Options (optional)</h1>
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
                      <input className="stock_input" type="text" id="stock_tag" placeholder="---"/>
                    </td>
                    <td>
                      <input className="stock_input" type="text" id="stock_amt" placeholder="---"/>
                    </td>
                    <td className="stock_input" id="stock_price">---</td>
                  </tr>
                </tbody>
              </table>
            </section>
          </section>
          <section>
            {this.state.calculated ? (
              <section id="salaryCalculation">
                <div className="salaryInfo" id="yearlySalaryLabel">Yearly Takehome: ${this.state.calculatedYearly}</div>
                <div className="salaryInfo" id="timeSalaryLabel">{this.state.period} Takehome: ${this.state.calculatedPeriod}</div>
                <div className="salaryInfo" id="stockLabel">Stock Benefits: ${this.state.stockPrice}</div>
              </section>
            ) : null}
          </section>
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
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
        singleStock: 0.0,
        errorMessage: '',
        showSubmitButton: false,
        correctForm: false,
        calculated: false,
        saved: false,
    };
  }

  handleInputChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value })
  }

  testForm = (callback) => {
    // Implement testForm function
    console.log("Running testForm...");
    const { name, salary, bonus, stockAmt } = this.state;
    console.log(`name: ${name}, salary: ${salary}, bonus: ${bonus}, stockAmt: ${stockAmt}`);
    if (!name || !salary) {
      alert('Please fill in all required fields.');
      this.setState({ correctForm: false }, callback);
      return;
    }

    if (isNaN(parseFloat(salary)) || isNaN(parseFloat(bonus)) || isNaN(parseFloat(stockAmt))) {
       alert("Please enter a valid input.\n(Don't include '$' or commas in numeric fields)");
       this.setState({ correctForm: false }, callback);
       return;
    }
    console.log("Setting correctForm to true");
    this.setState({ correctForm: true }, callback);
  }

  calculateSalary = () => {
    // Implement calculateSalary function
    console.log("Running calculateSalary...");
    this.setState({ saved: false })
    this.testForm(() => {
      console.log("this.state.correctForm: ", this.state.correctForm);
      if (this.state.correctForm) {
        console.log("Passed testForm");
        // calculate stock grants
        if(this.state.stockTicker) {
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
      }
    });
  }

  getStockPrice = async () => {
    // Implement getStockPrice function
    const { stockTicker, stockPrice, stockAmt } = this.state;
    try {
      const response = await fetch('/api/getStockPrice', {
          method: 'POST',
          headers: {'content-type': 'application/json'},
          body: JSON.stringify({ ticker: stockTicker }),
      });
      
      if(!response.ok) {
          alert("Please enter a valid ticker symbol or leave entry field blank");
          throw new Error('failed to get stock price');
      }
      const data = await response.json();
      console.log("data.ticker in getStockPrice is: ", data.ticker);
      // saves the current stock price
      this.setState({
        singleStock: data.ticker,
        stockAmt: stockAmt,
        stockPrice: (data.ticker * stockAmt).toFixed(2)
      });

    } catch (error) {
      console.log("error in calculate stock: ", error);
      alert("Please enter a valid ticker symbol or leave entry field blank");
    }

  }

  handleSubmit = (event) => {
    event.preventDefault();
    this.saveEntry();
  }

  saveEntry = async () => {
    // Implement saveEntry function
    const { username, name, calculatedYearly, calculatedPeriod, period, stockTicker, stockPrice, stockAmt } = this.state;
    const newEntry = {
      user: username,
      name: name,
      yearly: "$" + calculatedYearly,
      period: "$" + calculatedPeriod + ' ' + period,
      stockTicker: stockTicker,
      stockAmt: stockAmt,
      stockPrice: "$" + stockPrice
    }

    try {
      const response = await fetch(`/api/entry?email=${encodeURIComponent(username)}`, {
        method: 'POST',
        headers: {'content-type': 'application/json'},
        body: JSON.stringify(newEntry),
      });
      // Check if response is successful (status code 2xx)
      if (response.ok) {
          // Parse response only if content type is JSON
          const contentType = response.headers.get('content-type');
          if (contentType && contentType.includes('application/json')) {
              const entries = await response.json();
              localStorage.setItem('previousEntries', JSON.stringify(entries));
              this.setState({ saved: true })
          } else {
              // Handle non-JSON response (e.g., HTML error page)
              console.error('Error saving entry: Response is not in JSON format');
              this.updateEntriesLocal(newEntry);
          }
      } else {
          // Handle unsuccessful response
          console.error('Error saving entry: Server returned error status', response.status);
          this.updateEntriesLocal(newEntry);
      }
    } catch (error) {
      // Handle fetch error
      console.error('Error saving entry:', error);
      this.updateEntriesLocal(newEntry);
    }
  }

  updateEntriesLocal = (newEntry) => {
    // Implement updateEntriesLocal function
    const { username } = this.state;
    const previousEntriesJSON = localStorage.getItem('previousEntries');
    const previousEntries = previousEntriesJSON ? JSON.parse(previousEntriesJSON) : [];
    previousEntries.push(newEntry);
    localStorage.setItem('previousEntries', JSON.stringify(previousEntries));
    this.setState({ saved: true })
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
                <label htmlFor="salary">Yearly Salary: </label>
                <input className="info_input" type="text" id="salary" placeholder="enter salary" name="salary" onChange={this.handleInputChange}/>
              </div>
              <div className="info_label">
                <label htmlFor="bonus">Annual Bonus: </label>
                <input className="info_input" type="text" id="bonus" placeholder="0" name="bonus" onChange={this.handleInputChange}/>
              </div>
              <div className="info_label">
                <label htmlFor="pay_period">Pay Period:  </label>
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
                      <input className="stock_input" name="stockTicker" type="text" id="stock_tag" placeholder="---" onChange={this.handleInputChange}/>
                    </td>
                    <td>
                      <input className="stock_input" name="stockAmt" type="text" id="stock_amt" placeholder="---" onChange={this.handleInputChange}/>
                    </td>
                    <td className="stock_input" id="stock_price">{this.state.singleStock ? this.state.singleStock : "---"}</td>
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
                <div className="salaryInfo" id="stockLabel">Stock Benefits: ${(this.state.stockPrice * this.state.stockAmt).toFixed(2)}</div>
              </section>
            ) : null}
          </section>
          <section id="buttons">
            <div>
              <button className="entryButton" type="button" id="calculate" onClick={this.calculateSalary}>Calculate</button>
            </div>
            <div>
              <button className="entryButton" type="reset" id="reset" onClick={this.resetStyle}>Reset</button>
            </div>
            <div>
              {this.state.showSubmitButton ? (
                <button className="entryButton" type="submit" id="submit">Save Entry</button>
                ) : null}
            </div>
            {this.state.saved ? (
                  <div id="savedSuccess">Saved!</div>
                ) : null}
          </section>
        </form>
      </main>
    );
  }
}

export default Entry;
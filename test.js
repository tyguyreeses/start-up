async function fetchStockPrice(ticker) {
    const apiUrl = `https://query1.finance.yahoo.com/v8/finance/chart/${ticker}`;
  
    try {
      const response = await fetch(apiUrl);
      const data = await response.json();
  
      // Check if the API returned an error
      if (data.chart.error) {
        throw new Error(data.chart.error.description);
      }
  
      // Extracting the current price from the response
      const currentPrice = data.chart.result[0].meta.regularMarketPrice;
      return currentPrice;
    } catch (error) {
      console.error('Error fetching stock price:', error.message);
      return null;
    }
  }
  
// Example usage
const ticker = 'AAPL'; // Example ticker symbol
fetchStockPrice(ticker)
.then(price => {
    if (price !== null) {
    console.log(`Current price of ${ticker}: ${price}`);
    } else {
    console.log('Failed to fetch stock price.');
    }
})
.catch(err => console.error(err));







// apiRouter.post('/getStockPrice', (req, res) => {
//     const { ticker } = req.body;

//     console.log("ticker in backend code: ", ticker);

//     // let isFirstUpdate = true;

//     // function stockPriceChanged(data) {
//     //     console.log("data in stockPriceChanged: ", data);

//     //     // Send the stock price to the client
//     //     res.send({ price: data.price });

//     //     // Remove the ticker after the first update
//     //     if (isFirstUpdate) {
//     //         StockSocket.removeTicker(ticker);
//     //         isFirstUpdate = false;
//     //     }
//     // }

//     // Add the ticker with the callback for the first stock price update
//     console.log("right before addTicker");
//     StockSocket.addTicker(ticker, stockPriceChanged);
//     console.log("right after addTicker");
// });

// // function stockPriceChanged(data) {
// //   console.log("inside stockPriceChanged",data);
// // }
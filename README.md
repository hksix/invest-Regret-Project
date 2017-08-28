### Invest Regret

Ever regretted not investing? Invest Regret utilizes stock API's in order to calculate net worth based on your investment.
We provide users with information regarding the NASDAQ, NYSE, Bitcoins and Etherium based on when an investment was placed. The front end utilizes bootstrap based grids with design heavy techniques.

## Demo:
[Demo](investregret.com)

### Features:

* Networth calculations based on a given period of time for a specific stock.
* Chart data displaying investments over a given stock period.
* Networth Bitcoin and Etherium calculations based the inception date to current.
* Real time updates on prices for Bitcoin, Etherium, and a selected stock.
* Updates on stock splits during a given period.
* Responsive design through the use of Bootstrap and media queries.
* Use of scrollmagic.js and Greensock.js for animation on scroll.


### Issues:
* The Quandl API provided stock prices that were pre-adjusted taking splits into account. If a specific stock split at a 2:1 ratio, the historical stock price of $25 share is recorded as $50 in the API . We had to account for the amount of splits during a specific time period then adjust the share price based on the end date. Using the same AJAX call to obtain the stock data, we generate an array of values and dates of when the split ratio has higher than 1. We then used a factorial function to un-adjust the stock prices.
* We utilized multiple libraries which conflicted with bootstrap’s default settings. We had to go back through the HTML to figure out where conflicts were occurring. We then resolved the problem by omitting the use of bootstrap where the conflicts emerged. This also helped us refactor the design code which produced lighter and quicker DOM manipulations to occur. 
* Initial problems coordinating GitHub pulls and merges were resolved once we consulted the documentation for proper project development flow. 


### Stretch Goals: 
* Add more crypto currencies
* Add start date feature for crypto currency. Currently hardcoded dates due to API limitations.
* Implement more advanced scrollmagic and greensock techniques. 
* Add predictive text for Nasdaq ticker name.


## Built With

* Bootstrap
* Quandel API
* Cryptocompare API
* Scrollmagic.js
* Chartist.js
* Jquery
* Greensock.js

### Contributing

* Fork it
* Create your feature branch: git checkout -b my-new-feature
* Commit your changes: git commit -am 'Add some feature'
* Push to the branch: git push origin my-new-feature
* Submit a pull request 


## Authors

* **Hamza Haseeb** *
* **John Hartert** *
* **Andrew Lastrapes** *

### Invest Regret


Ever regretted not investing? Invest Regret utilizes API's in order to calculate net worth based on your investment.
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
* The Quandl API provided stock prices without taking splits into account. If a specific stock split at a 2:1 ratio a $50 share would now be $25. We had to account for the amount of splits during a specific time period adjust the share price based on the end date.
* We repeatedly utilized the same class names while developing the front end, which would overwrite changes.
* Problems coordinating Github pulls and merges.


### Stretch Goals: 
* Add more crypto currencies
* Add start date feature for crypto currency.
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

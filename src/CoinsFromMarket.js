import React, { useState, useEffect } from 'react'; // useeffect tells react that our componenet needs to do something after rendering
import axios from 'axios';                         // Javascript library I used to make the HTTP requests
import {Link} from 'react-router-dom';              // Used to help enable dynamic routing in the app

const CoinsFromMarket = () => {
    const [coins, setCoins] = useState([]);         // a hook to help us add state to our functional component
useEffect(() => {                                   // This tells our component to do something after rendering
    getCoins();                                     // calls the function defined below
}, []);

    const getCoins = () => {
    axios.get('https://api.coingecko.com/api/v3/coins/markets?vs_currency=EUR&order=market_cap_desc&per_page=10&page=1&sparkline=false')  // with the help of axios, we use "get" to get or fetch the data from the API, it has been adjusted to conform to the requests of the assessment test i.e. ordering by market cap desc, currency being in Euros, and a limit of ten results.
         .then((response) => {                          // after fetching, pass a function with the results obtained from the API, and save the results to "setCoins" which we used before, and also to console log for testing purposes.
            setCoins(response.data);
            console.log(response.data);
         })
         .catch((error) => {                            // Our catching code to catch any errors
             console.log(error);
         });
};// We render our results with the help of the below code
    return (
        <div>
            <h1>Cryptocurrency Arena</h1>
            <div className='coin-chest'>
                {coins && coins.length > 0          //conditional rendering using the && logical operator. if the coins and length of coins are greater than 0 then go ahead with the below steps, else render the loading option
                 ? coins.map((coin) => (           // we use map to iterate over the array, which here is "coins" so that we can iterate over the array of data that we've received from the API. We can manipulate this data that we receive to display what we want.
                    <div className='coin' key={coin.id}> 
                    <img className='coin-image' src={coin.image} alt='' /> {/* the image we get from the iteration and additional data below*/}
                    <ul>
                    <li><b><p>Name: <i>{coin.name}</i></p></b></li>
                    <li><b><p>Symbol: <i>{coin.symbol}</i></p></b></li>
                    <li><b><p>Current Price: <i>{coin.current_price}</i></p></b></li>
                    <li><b><p>High 24 Hour Rate: <i>{coin.high_24h}</i></p></b></li>
                    <li><b><p>Low 24 Hour Rate: <i>{coin.low_24h}</i></p></b></li>
                    <li><b><Link to={`/coin/${coin.id}`}>Check Coin Details</Link> </b></li>   {/*  link to individual coin detail specifications */}
                    </ul>
                    </div>
                
                ))
                : "Loading Coins... Please wait..."        // our else statement 
                }
            </div>
        </div>
        );
};

export default CoinsFromMarket;
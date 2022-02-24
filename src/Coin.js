import React, { useState, useEffect } from 'react';   // useeffect tells react that our componenet needs to do something after rendering
import axios from 'axios';          // Javascript library I used to make the HTTP requests
import { useParams } from 'react-router-dom';   // this is used to access the value of the URL parameters. We're going to use it to help us fetch specific data from the coin API since it uses a dynamic value of {id}.

const Coin = ({ match }) => {                 // this object is used to help us with matching the URL
  const { id } = useParams();                 // destructuring so that we can use {id} into our API link
  const [info, setInfo] = useState([]);      // a hook to help us add state to our functional component
  
useEffect(() => {                           // This tells our component to do something after rendering
    getCoin();                                // calls the function defined below
}, []);

  const getCoin = () => {
    axios.get(`https://api.coingecko.com/api/v3/coins/${id}`)      // with the help of axios, we use "get" to get or fetch the data from the API
         .then((response) => {          // after fetching, pass a function with the results obtained from the API, and save the results to "setInfo" which we used before, and also to console log for testing purposes.
            setInfo(response.data);
            console.log(response.data);
         })
         .catch((error) =>                 // Our catching code to catch any errors
             console.log(error));
         };


return (

        <div>
            <h1>Cryptocurrency Profile Specifications</h1>
            <div className='cryptocurrency-spec-container'>

            {console.log(Object.entries(info))}              {/*  for testing */}
                {Object.entries(info).slice(0, 1).map((infobit) => (      // The problem arose in trying to fetch the individual coin ID data because the response from the API kept giving me an object as a response as opposed to an array, what I was looking for. So I had to use Object,entries to convert the object returned to an array. I used slice to limit the results obtained from the API. Then I used map to loop through the array. Map requires an array, which is what we have successfully obtained.
                    
                    <div className='coin-spec' key={infobit}> 
                    <img className='coin-image' src={info.image.large} alt='' />                 {/* with the help of map, we're able to individually fetch the data from the API. I decided to add the image of the cryptocurrency despite not being asked, for the sake of beauty */}
                    <section>
                    <ul>
                    <li><b>Name:</b> {info.name}</li>
                    <li><b>Symbol:</b> {info.symbol}</li>  
                    <li><b>Hashing Algorithm:</b> {info.hashing_algorithm}</li>          
                    <li><b>Description:</b> {info.description.en.replace(/<[^>]+>/g, '')}</li>   {/* Fetching the data in English. The API response for the description returned HTML text, so I had to use "replace" to convert the HTML text into normal text. */}
                    <li><b>Market Cap (in Euros):</b> {info.market_data.market_cap.eur}</li>       {/*  I had to dig into the JSON to understand the source of the market cap in Euros */}
                    <li><b>Homepage:</b> {info.links.homepage}</li>        
                    <li><b>Genesis Date:</b> {info.genesis_date}</li>         
                    </ul>
                    </section>
            </div>
                ))}

  </div>
  </div>
)}
export default Coin;
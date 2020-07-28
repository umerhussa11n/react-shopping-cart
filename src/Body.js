import React, {useState, useEffect} from 'react'
import './Body.css'
import axios from 'axios'
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { Button } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
  }));


const PAGE_PRODUCTS = 'products'
const PAGE_BASKET = 'basket';


const Body = () => {
    const [Basket, setBasket] = useState([]);
    const [TotalPrice, SetPrice] = useState(0);
    const [page, setPage] = useState(PAGE_PRODUCTS);
    const [selectedCurrency, setCurrency ] = useState('$');
    const classes = useStyles();
    let [currencyList, setCurrencyList] = useState({});

    {/* These Normally come from the API's However hard coding here for the test purpose */}
    const [products] = useState([
        { name: 'Soup', price: 0.65, currency: 'USD', currencySymbol: '$', image: ''  },
        { name: 'Bread',price: 0.80, currency: 'USD',  currencySymbol: '$', image: ''  },
        { name: 'Milk', price: 1.15, currency: 'USD', currencySymbol: '$', image: ''  },
        { name: 'Apples', price: 1.00, currency: 'USD', currencySymbol: '$', image: '' },
    ]);

    const AddToBasket = (product) => {
            setBasket([...Basket, product]);
            SetPrice(TotalPrice + product.price);
    };


    const RemoveFromBasket = (productToRemove) => {
                // do somethign here 
                setBasket(
                    Basket.filter((product) => product !== productToRemove)
                );
    }

    {/* these need to be refactored and moved to seperate component */}
    const renderProducts = () => (
        <>          
        <div className="row">
            <h1>Available Products</h1>
            <div id="currencyListDiv"></div>
        </div>
        { 
            products.map((product, idx) => (
                <div className="product row" key={idx} >
                <img src={product.image}></img>
                <h1>{product.name}</h1>
                <h4>{product.currencySymbol}{product.price}</h4>               
                <Button variant="contained" color="secondary" className="leftButton" onClick={() => AddToBasket(product)}>Add To Basket</Button>
                </div>
            ))
        }
        </>
    );
    
    {/* these need to be refactored and moved to seperate component */}
    const renderBasket = () => (
        <>          
        <div className="row">
        <h1>Total Price: {selectedCurrency}{TotalPrice}</h1>
            
        </div>
        { 
            Basket.map((product, idx) => (
                <div className="product row" key={idx} >
                <h1>{product.name}</h1>
                <h4>{product.currencySymbol}{product.price}</h4>               
                <Button variant="contained" color="secondary" className="leftButton" onClick={() => RemoveFromBasket(product, idx)}>Remove from Basket</Button>
                </div>
            ))
        }
        </>
    );

    {/* these need to be refactored and moved to seperate component */}
    const renderCurrencyDropdown = (() => {
        var currencyListDiv = document.getElementById("currencyListDiv");
        console.log(currencyListDiv);
        
        var dropdown = 
        <div>
        <InputLabel id="demo-simple-select-helper-label">Age</InputLabel>
        <Select
          labelId="demo-simple-select-helper-label"
          id="demo-simple-select-helper"
          value={"USD"}
          onChange={console.log('dropdown changed')}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value={10}>Ten</MenuItem>
          <MenuItem value={20}>Twenty</MenuItem>
          <MenuItem value={30}>Thirty</MenuItem>
        </Select>
        </div>
       
       console.log(dropdown);
       if (currencyListDiv != null){
            currencyListDiv.append(dropdown);
       }
        
    });

    const populateCurrencyDropdown = ((datasource) => {
            // do something with the data source passed in
            var currencyListDiv = document.getElementById("currencyListDiv");
            if (datasource !== null && currencyListDiv != null){
            
                var objectArray = Object.entries(currencyList);
                
                currencyListDiv.append(
                    <div className="drop-down" id="currency-dropdown">
                    <select>{
                        objectArray.forEach(( currency ) => {
                            return <option value={currency.key}>{currency.value}</option>
                        })
                    }
                    </select>                 
                    </div>
                );
            }
    });

    const navigateTo = (nextPage) => {
            setPage(nextPage);
    }

    useEffect(() => {
            axios.get('http://apilayer.net/api/list?access_key=11c45ceabbe3e137e27e1ca3831da0dd&format=1')
            .then(res => {
                
                currencyList = res.data.currencies;
                setCurrencyList( currencyList );
                        
            }).catch(err => {
                console.log(err);
            })
        }, []);
        

    return (
        <div className="App-body container">
            <div className="row">
            {/* This could be made better with react router, however this is the simplest approach for page navigation */}
            {page == PAGE_PRODUCTS && <Button variant="contained" color="secondary"  onClick= {() => navigateTo(PAGE_BASKET) }>Go To Checkout:  {Basket.length}</Button> }
            {page === PAGE_BASKET && <Button variant="contained" color="secondary" onClick= {() => navigateTo(PAGE_PRODUCTS)}>Go To Products:  </Button>}
            </div>
            { page === PAGE_PRODUCTS && ( renderProducts() )}
            { page === PAGE_BASKET && (renderBasket()) }
            {  renderCurrencyDropdown() }
            
        </div>
      );
    }
 
export default Body;

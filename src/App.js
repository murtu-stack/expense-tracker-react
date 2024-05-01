import { useEffect, useState } from 'react';
import './App.css';
import useFetch from './hooks/useFetch';


function App() {


 
  
  const url = "https://http.cat"

  const { data, loading, error } = useFetch(url) 

  const [formInput, setFormInput] = useState({});
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    const filteredTransactions = transactions.filter((item) => Object.keys(item).length > 0)
    localStorage.setItem('transactions',JSON.stringify(filteredTransactions));
  }, [transactions])
  


      function handleSubmit(ev) {
        ev.preventDefault();
      
        const numericValue = parseFloat(formInput.title?.match(/[-]{0,1}[\d]*[\.]{0,1}[\d]+/g)?.[0]) || 0;

        console.log(numericValue,"knjdsnj")
      
        const updatedFormInput = { ...formInput, price: numericValue };
      
        // Add the updated formInput to the transactions state
        setTransactions(prev => [...prev, updatedFormInput]);
      }
    

  console.log(formInput, "formInput");


  function handleChange(ev) {
    const { name, value } = ev.target;
    // const price =  

    setFormInput((prev) => {
      return {
        ...prev,
        [name]: value,
        // price
      }
    })
   
  }
  const overall_form_trnsactions = JSON.parse(localStorage.getItem("transactions")) || [];
  const overall_balance = overall_form_trnsactions.reduce((acc, transaction) => (acc + (transaction?.price || 0)), 0);
  


  return (
    <div>
      <main>
        <h1>
          {overall_balance}
          <span>.00</span>
        </h1>

        <form>
          <div className='basic'>
          <input name = "title" onChange={handleChange} type="text" placeholder="+200 New Samsung TV"/>
          <input name = "date" onChange={handleChange} type='datetime' />

          </div>

          <div className='description'>
            <input name = "description" onChange={handleChange} type='text' placeholder='decsription'/>

          </div>
          <button onClick={ handleSubmit} type="submit"> Add New Transaction</button>

        </form>


        <div className='transactions'>
  {transactions.length > 0 ? (
    transactions.map((trans, index) => (
      <div className='transaction' key={index}>
        <div className='left'>
          <div className='name'>{trans?.title}</div>
          <div className='description'>{trans?.description}</div>
        </div>
        <div className='right'>
          <div className='price'>{trans?.price}</div>
          <div className='datetime'>{trans?.date}</div>
        </div>
      </div>
    ))
          ) : null}

</div>
{console.log(error,'mdkfn')}
{loading && <h3>...loading</h3>}
          {error && <h3>...Eroor {error.message}</h3>}
          {/* {data.length} */}

      </main>
  </div>
  );
}

export default App;

import './App.css';
import { useState, useEffect } from 'react'
import Content from './Content';
import Footer from './Footer';
import Header from './Header';
import AddItem from './AddItem';
import SearchItem from './SearchItem';
import apiRequest from './apiRequest';

function App() {
  const APP_URL = 'http://localhost:3500/items';


  useEffect(() => {
    const fetchItem = async () => {
      try {
        const response = await fetch(APP_URL);
        if (!response.ok) throw Error(`Did not receive expected data `)
        const listItems = await response.json();
        setItems(listItems)
        setFetchError(null);
      } catch (err) {
        setFetchError(err.message)
      } finally {
        setIsLoading(false);
      }
    }
    setTimeout(() => {
      (async () => await fetchItem())();
    }, 2000)
  }, [])

  const [fetchError, setFetchError] = useState(null);
  const [newItem, setNewItem] = useState('');
  const [search, setSearch] = useState('');
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true)



  const addItem = async (item) => {
    // Generate a unique ID for the new item
    const id = items.length ? parseInt(items[items.length - 1].id) + 1 : 1;

    // Create a new item object
    const myNewItem = { id, checked: false, item };

    // Create a new array with the new item
    const listItems = [...items, myNewItem];

    // Update the state with the new array of items
    setItems(listItems);

    // Prepare the options for the POST request
    const postOption = {
      method: 'POST',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(myNewItem)
    };

    // Make a POST request to the API endpoint
    const result = await apiRequest(APP_URL, postOption);

    // If there is an error in the API request, setFetchError is called
    if (result) setFetchError(result);
  }


  const handleCheck = async (id) => {
    // Update the list of items by toggling the 'checked' property for the selected item
    const listItems = items.map((item) => item.id === id ? { ...item, checked: !item.checked } : item);

    // Update the state with the new list of items
    setItems(listItems);

    // Get the selected item based on its ID
    const myItem = listItems.filter((item) => item.id === id);

    // Prepare the options for the update request
    const updateOptions = {
      method: 'PATCH',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ checked: myItem[0].checked })
    }

    // Build the request URL based on the item ID
    const reqUrl = `${APP_URL}/${id}`;

    // Make a PATCH request to the API endpoint to update the 'checked' property
    const result = await apiRequest(reqUrl, updateOptions);

    // If there's an error in the request, update the error using setFetchError
    if (result) setFetchError(result);
  }


  const handleDelete = async (id) => {
    const listItems = items.filter((item) => item.id !== id);
    setItems(listItems);
    const deleteOptions = {
      method: 'DELETE',
      headers: {
        "Content-Type": "application/json"
      }
    }
    // Build the request URL based on the item ID
    const reqUrl = `${APP_URL}/${id}`;

    // Make a PATCH request to the API endpoint to update the 'checked' property
    const result = await apiRequest(reqUrl, deleteOptions);

    // If there's an error in the request, update the error using setFetchError
    if (result) setFetchError(result);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newItem) return;
    addItem(newItem);
    setNewItem('');
  }


  return (
    <>
      <Header title="Eyad_Ahmed" />
      <AddItem
        handleSubmit={handleSubmit}
        setNewItem={setNewItem}
        newItem={newItem}
      />
      <SearchItem
        search={search}
        setSearch={setSearch} />
      {isLoading && <p style={{
        color: 'blue',
        textAlign: 'center',
        margin: '10px'
      }}>Loading Items...</p>}
      {fetchError && <p style={{
        color: 'red',
        textAlign: 'center',
        margin: '10px'
      }}>{`Error: ${fetchError}`}</p>}
      {!fetchError && !isLoading &&
        <Content
          items={items.filter(item => (item.item.toLowerCase().includes(search.toLowerCase())))}
          seItems={setItems}
          handleCheck={handleCheck}
          handleDelete={handleDelete} />}
      <Footer length={items.length} />
    </>

  );
}

export default App;

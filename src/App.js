import './App.css';
import Autocomplete from "./components/Autocomplete/Autocomplete";
import names from './assets/names.json'
import {useState} from "react";

function App() {
  const [tagsList, setTagsList] = useState([]);
  const suggestionsList = names;

  const handleChange = (tags) =>{
    setTagsList(tags)
  }

  return (
    <div className="app">
      <h1>List of names</h1>
      <p>e.g. Arron, Emanuel, Greg</p>
      <Autocomplete suggestionsList={suggestionsList} tags={tagsList} setTags={handleChange}/>
    </div>
  );
}

export default App;

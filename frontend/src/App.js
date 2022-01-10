import './App.css';
import logo from './img/logo.png';
import Karta from './components/Karta';
import Adder from './components/Adder';
import AddForm from './components/AddForm';
import EditForm from './components/EditForm';
import React, { useState, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import Generator from './components/Generator'

function App() {
  

  
  const [cards, setCards] = useState([])
  const [popupAdder, setPopupAdder] = useState(false);
  const [popupEditor, setPopupEditor] = useState(false);
  const [popupPerson, setPopupPerson] = useState({name:'', date:'', id:0, text:''});
  const [popupGen, setPopupGen] = useState(false);
  const axios = require("axios");

  useEffect(async () => {
    const result = await axios(
      'api/cards',
    );
    setCards(result.data.allCards);
  },[]);

  const refreshCards = async () => {
    const result = await axios(
      'api/cards',
    );
    setCards(result.data.allCards);
  };

  return (
    <div className="App">
      <div className="bar">
        <img src={logo} className="logo" />
        <div className="genButton">
          <Button variant="contained" color="secondary" style={{fontWeight: 'bold'}} onClick={() => {setPopupGen(true)}}>
            Token generator
          </Button>
        </div>
      </div>
      <div className="content">
        {cards.map(x => <Karta setPopupEditor={setPopupEditor} setPopupPerson={setPopupPerson} p={x} />)}
        <Adder setPopupAdder={setPopupAdder}/>
        <AddForm setPopupAdder={setPopupAdder} refreshCards={refreshCards} popupAdder={popupAdder}/>
        <EditForm setPopupEditor={setPopupEditor} refreshCards={refreshCards} popupEditor={popupEditor} p={popupPerson}/>
        <Generator setPopupGen={setPopupGen} popupGen={popupGen} />
      </div>
    </div>
  );
}

export default App;

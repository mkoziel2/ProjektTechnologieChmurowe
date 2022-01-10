import person from '../img/person.png'


const Karta = ({p, setPopupEditor, setPopupPerson}) => {
    return (
        <div className="karta">
          <div className="hoverek" onClick={() => {setPopupPerson(p); setPopupEditor(true)}}></div>
          <img src={person} className="person"/>
          <p className="author">{p.name}</p>
          <p className="data">{p.date}</p>
          <div className="kartacontent">
            {p.text}
          </div>
        </div>
    );
};

export default Karta;
import person from '../img/person.png'
import add from '../img/add.png'

const Adder = ({setPopupAdder}) => {
    return (
        <div className="karta">
          <div className="hoverek" onClick={() => setPopupAdder(true)}></div>
          <img src={person} className="person"/>
          <img src={add} className="addButton"/>
        </div>
    );
};

export default Adder;
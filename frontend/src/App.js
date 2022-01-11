import React, {useState, useEffect} from 'react';
import axios from 'axios';
import Forma from './components/Forma';
import Transakcija from './components/Transakcija';
import './index.css';

const App = () => {
  const [ transakcije, postaviTransakcije] = useState([]);
  const [ valjanaTransakcija, podesiValjanost] = useState(false);
  const [unosVrste, promjenaVrste] = useState("");
  const [unosOpisa, promjenaOpisa] = useState("");
  const [unosIznosa, promjenaIznosa] = useState("");
  const [prikaziFormu, postaviPrikazForme] = useState(false);
  const onVrstaChange = (e) => {promjenaVrste((e.target.value).toString()); console.log(unosVrste)}
  const onOpisChange = (e) => { promjenaOpisa((e.target.value).toString()); console.log(unosOpisa) }
  const onIznosChange = (e) => { promjenaIznosa((e.target.value).toString()); console.log(unosIznosa) }




  useEffect( () => {
    axios.get("http://localhost:3001/api/transakcije")
    .then(res => postaviTransakcije(res.data))
  }, [])
  

const brisiTransakciju = (id) => {
  axios.delete(`http://localhost:3001/api/transakcije/${id}`)
      .then(response => {
          console.log(response);
          postaviTransakcije(transakcije.filter(t => t.id !== id))
      })
}

const urediTransakciju = (id) => {
  const transakcija = transakcije.find(t => t.id === id)
  let stariIznos = transakcija.iznos;
  let noviIznos = prompt(`Unesite novi iznos za ${transakcija.opis}:`)

  const modTransakcija = {
      ...transakcija,
      iznos: noviIznos == null ? stariIznos : noviIznos
  }

  axios.put(`http://localhost:3001/api/transakcije/${id}`, modTransakcija)
      .then(response => {
          console.log(response)
          postaviTransakcije(transakcije.map(t => t.id !== id ? t : response.data))
      })
}

  const novaTransakcija = () => {
    console.log('Klik');
    if (document.getElementById("prihod").checked){
      promjenaVrste("prihod");
    } else {
      promjenaVrste("rashod");
    };
    let noviObjekt = {
    vrsta: unosVrste.toString(),
    datum: new Date().toLocaleDateString(),
    opis: unosOpisa.toString(),
    iznos: Number(unosIznosa),
    };
    axios
    .post('http://localhost:3001/api/transakcije', noviObjekt)
    .then(response => {
    postaviTransakcije(transakcije.concat(response.data))
    console.log(response.data);
    promjenaVrste("");
    promjenaOpisa("");
    promjenaIznosa("");
    podesiValjanost(false);
    })
   }

  

  return (
    <div>
      <h1>Transakcije</h1>
      <div>
        <button onClick={() => postaviPrikazForme(true)}>
          NOVI TROŠAK
        </button>
      </div><br/><br/>
      <div className={prikaziFormu ? "vidljiva" : "skrivena"}>

          <input type="radio" name="vrsta" value="prihod" id="prihod" onChange={onVrstaChange}/>
          <label htmlFor="prihod">Prihod</label><br/>
          <input type="radio" name="vrsta" value="rashod" id="rashod" onChange={onVrstaChange}/>
          <label htmlFor="prihod">Rashod</label><br/>

          <label htmlFor="opis">Opis: </label>
          <input type="text" id="opis" value={unosOpisa} onChange={onOpisChange}/><br/>
          <label htmlFor="iznos">Iznos: </label>
          <input type="text" id="iznos" value={unosIznosa} onChange={onIznosChange}/><br/><br/>
          
          <button onClick={() => novaTransakcija()}>
            OK
          </button>
          <button onClick={() => postaviPrikazForme(false)}>
            Cancel
          </button>
        
      </div>
      <div><br/><br/><br/>
        <button>
          SAMO PRIHODI
        </button><td></td>
        <button>
          SAMO RASHODI
        </button><td></td>
        <button>
          SVE TRANSAKCIJE
        </button><br/><br/>
        <table>
          <thead>
            <tr>
              <th>VRSTA</th>
              <th>DATUM</th>
              <th>OPIS</th>
              <th>OPCIJE</th>
              <th>IZNOS</th>
            </tr>
          </thead>
          <tbody>
            {transakcije.map(t =>
              <Transakcija key={t.id} vrsta={t.vrsta} datum={t.datum} opis={t.opis} iznos={t.iznos + 'kn'}
                uredi={() => urediTransakciju(t.id)}
                brisi={() => brisiTransakciju(t.id)}
              />)}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default App;

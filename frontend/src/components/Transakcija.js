import React from 'react'
import './transakciija.css'

const Transakcija = (props) => {
    return (
        <tr>
            <td>{props.vrsta}</td>
            <td>{props.datum}</td>
            <td>{props.opis}</td>
            <td>
                <button onClick={props.uredi} id="button-uredi">Uredi</button>
                <button onClick={props.brisi} id="button-brisi">Briši</button>
            </td>
            <td id="ispis" style={props.vrsta == 'prihod' ? {backgroundColor:'blue'} : {backgroundColor:'pink'}}></td>{props.iznos}
        </tr>
    )
}

export default Transakcija

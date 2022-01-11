import React from 'react'

const Forma = () => (
    <div className="okvir">
        <input type="radio" name="vrsta" id="prihod"></input>
        <label htmlFor="prihod">Prihod</label><br/>
        <input type="radio" name="vrsta" id="rashod"></input>
        <label htmlFor="prihod">Rashod</label><br/>

        <label htmlFor="opis">Opis: </label>
        <input type="text" id="opis"></input><br/>
        <label htmlFor="iznos">Iznos: </label>
        <input type="text" id="iznos"></input>

        <br/><br/>
        <button><td></td>
          OK
        </button>
        <td></td><td></td>
        <button>
          Cancel
        </button>

      </div>
  )

export default Forma
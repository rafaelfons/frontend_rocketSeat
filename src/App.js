import React from 'react'
import './global.css'
import './App.css'
import './Sidebar.css'


function App() {
  return (
    <div id="app">
      <aside> 
        <strong>Cadastrar</strong>
        <form>
          <div class="input-block">
            <label htmlFor="github_username" >Usuario do Github</label>
            <input name="github_username" id="github_username" req/>
          </div>
          
          <div class="input-block">
            <label htmlFor="techs">Tecnologia</label>
            <input name="techs" id="techs" req/>
          </div>
          
          <div className="input-grup">
            <div class="input-block">
              <label htmlFor="latitude">Latitude</label>
              <input name="latitude" id="latitude" req/>
            </div>
            <div class="input-block">
              <label htmlFor="longitude">Longitude</label>
              <input name="longitude" id="longitude" req/>
            </div>
          </div>
          <button type="submit">Salvar</button>
        </form>
      </aside>
      <main>

      </main>
    </div>

  )
}

export default App;

import React, { useState, useEffect } from 'react'
import api from './services/api'
import Modal from './Modal'
import './global.css'
import './App.css'
import './Sidebar.css'
import './Main.css'




function App() {

  const [devs, setDevs] = useState([])
  const [latitude, setLatitude] = useState('')
  const [longitude, setLongitude] = useState('')
  const [github_username, setGithub_username] = useState('')
  const [techs, setTechs] = useState('')
  const [show, setShow] = useState(false);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { longitude, latitude } = position.coords

        setLatitude(latitude)
        setLongitude(longitude)
      },
      (err) => {
        console.log(err)
      },
      {
        timeout: 30000,
      }
    )
  }, [])

  async function loadDevs() {
    const response = await api.get('/devs')
    setDevs(response.data)
  }

  useEffect(() => {
   
    loadDevs()
  }, []);

  async function handleAddDev(e) {
    e.preventDefault()
    console.log(devs, "DEVS")
    const response = await api.post('/create', {
      github_username,
      techs,
      latitude,
      longitude,
    })
    setGithub_username('')
    setTechs('')

    setDevs([...devs, response.data.dev])

  }

  function index(e, dev) {
    e.preventDefault();
        
    setGithub_username(dev.github_username)
    setTechs(dev.techs)
    setLongitude (dev.location.coordinates[0])
    setLatitude(dev.location.coordinates[1])
    setShow(!show)
  }

  return (
    <div id="app">
      <aside>
        <strong>Cadastrar</strong>
        <form onSubmit={handleAddDev}>
          <div className='input-block'>
            <label htmlFor="github_username" >Usuário do Github</label>
            <input name="github_username"
              id="github_username"
              required
              value={github_username}
              onChange={e => setGithub_username(e.target.value)}
            />
          </div>

          <div className='input-block'>
            <label htmlFor="techs">Tecnologia</label>
            <input name="techs"
              id="techs"
              required
              value={techs}
              onChange={e => setTechs(e.target.value)}
            />
          </div>

          <div className='input-group'>
            <div className="input-block">
              <label htmlFor="latitude">Latitude</label>
              <input type="number"
                name="latitude"
                id="latitude"
                required
                value={latitude}
                onChange={e => setLatitude(e.target.value)}
              />
            </div>
            <div className="input-block">
              <label htmlFor="longitude">Longitude</label>
              <input type="number"
                name="longitude"
                id="longitude"
                required
                value={longitude}
                onChange={e => setLongitude(e.target.value)}
              />
            </div>
          </div>
          <button type="submit">Salvar</button>
        </form>
      </aside>

      <main>
        <ul>
          {devs.map(dev => (
            <li key={dev._id} className="dev-item">
              <header>
                <img src={dev.avatar_url} alt={dev.name} />
                <div className="user-info">
                  <strong>{dev.name}</strong>
                  <span>{[dev.techs.join(', ')]}</span>
                </div>
              </header>
              <p>{dev.bio}</p>
              <a href={`https://github.com/${dev.github_username}`}>Acessar perfil GitHub</a>
              <button onClick={e => index(e, dev)}>Atualizar</button>
            </li>
          ))}
        </ul>
      </main>
      {
        show ? <Modal github_username={github_username} techs={techs} latitude={latitude} longitude={longitude} loadDevs={loadDevs}></Modal> : <div />
      }
    </div>
  )
}

export default App;

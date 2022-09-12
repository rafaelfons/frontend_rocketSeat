import React, { useState, useEffect } from 'react'
import api from './services/api'
import Modal from './Components/ModalUpdate'
import ModalDelete from './Components/ModalDelete'
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
  const [latitudeModal, setLatitudeModal] = useState('')
  const [longitudeModal, setLongitudeModal] = useState('')
  const [github_usernameModal, setGithub_usernameModal] = useState('')
  const [techsModal, setTechsModal] = useState('')
  const [show, setShow] = useState(false)
  const [del, setDel] = useState(false)
  const [github_usernameDel, setGithub_usernameDel] = useState('')

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
    
    const response = await api.post('/create', {
      github_username,
      techs,
      latitude,
      longitude,
    })
    setGithub_username('')
    setTechs('')
    console.log(response)
    console.log(response.data.message)
   if(response.data.dev) setDevs([...devs, response.data.dev])
  }

  function index(e, dev){
    e.preventDefault();
    
    setShow(!show)
    setGithub_usernameModal(dev.github_username)
    setTechsModal(dev.techs)
    setLongitudeModal (dev.location.coordinates[0])
    setLatitudeModal(dev.location.coordinates[1])        
  }

  async function deleteDev(e, dev) {
    e.preventDefault()
    setDel(!del)
    setGithub_usernameDel(dev.github_username)      
  }  
 
  return (
    <div id="app">
      <aside className="cadastrar">
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
                <div>
                  <li className="delete"> <button onClick={e => deleteDev(e, dev)}>APAGAR</button> </li>
                </div>               
              </header>
              <p>{dev.bio}</p>
              <a href={`https://github.com/${dev.github_username}`}>Acessar perfil GitHub</a>
              <li className="buttonAtt"> <button onClick={e => index(e, dev)}>EDITAR</button> </li>
            </li>
          ))}
        </ul>
      </main>
      {
        show ? <Modal 
        github_username={github_usernameModal} 
        techs={techsModal} 
        latitude={latitudeModal} 
        longitude={longitudeModal} 
        loadDevs={loadDevs}></Modal> : 
        <div />
      }   
      {
        del ? <ModalDelete github_username={github_usernameDel}></ModalDelete> : <div/>
      }   
    </div>
  )
}

export default App;

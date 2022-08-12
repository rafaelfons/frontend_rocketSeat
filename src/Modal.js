import React, {useState} from 'react'
import api from './services/api'

import './global.css'
import './App.css'
import './Sidebar.css'
import './Main.css'

function Modal(props) {
    const [latitude, setLatitude] = useState(props.latitude)
    const [longitude, setLongitude] = useState(props.longitude)
    const [github_username, setGithub_username ] = useState(props.github_username)
    const [techs, setTechs] = useState(props.techs)
    console.log(props)

    async function handleUpdate(e) {
        console.log("OK")
        e.preventDefault()
        const response = await api.patch('/update', {
          github_username,
          techs,
          latitude,
          longitude,
        } )
        console.log(response)    
        props.loadDevs(); 
    }
      
    
    return (
        <aside className="Modal">
            <strong>Atualizar</strong>
            <form onSubmit={handleUpdate}>
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
                <button type="submit">Atualiza</button>
            </form>
        </aside>
    )
}

export default Modal;
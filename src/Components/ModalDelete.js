import React, {useState} from 'react'
import api from '../services/api'

import '../global.css'
import '../App.css'
import '../Sidebar.css'
import '../Main.css'



function ModalDelete(props) {
    const [github_username, setGithub_username] = useState(props.github_username)
   
   
    async function deleteDev(){
    const response = await api.delete(`/delete/${github_username}`)
    console.log('deletado', response) 
    }
   
    return (
        <div id="modalDel">
        <aside className="modal">
            <strong>Remover Dev?</strong>
            <form className='formDel' onSubmit={deleteDev}>                               
            <button className='delete' type="submit">Sim</button>
            </form>
        </aside>
        </div>
    )
}

export default ModalDelete




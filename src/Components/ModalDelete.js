import React, {useState} from 'react'
import api from '../services/api'

function ModalDelete(props) {
    const [github_username, setGithub_username] = useState(props.github_username)
    const [del, setDel] = useState(true)
    
    async function deleteDev(){
    const response = await api.delete(`/delete/${github_username}`)
    console.log('deletado', response) 
    }

    async function closedDeleteDev(e){        
        e.preventDefault()        
        setDel(!del)
        console.log("ok")
        
    }
   
    return (
            <aside id="modalDel">                
                <strong>Remover {github_username} da lista?</strong>
                <div className='deleteOptions'> 
                    <div className='delete'>             
                        <form  onClick={e =>{deleteDev(e)}}><button  type="submitDel">Sim</button></form>
                    </div>                  
                    <div className='delete'>
                        <form  onClick={e => {closedDeleteDev(e)}}><button type="submitNotDel">Não</button></form>                   
                    </div>              
                </div>            
            </aside>
              
    )
}

export default ModalDelete




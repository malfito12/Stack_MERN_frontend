import React, { Component } from 'react'
import Axios from 'axios'

class CreateUser extends Component{

    state={
        users:[],
        username:''
    }

    

    async componentDidMount(){
        this.getUsers();
        console.log(this.state.users)
    }
    getUsers=async()=>{
        const res =await Axios.get('http://localhost:4000/api/users')
        this.setState({users: res.data})
    }

    onChangeUserName = e =>{
        this.setState({
            username : e.target.value
        })
    }
    onSubmit=async e=>{
        e.preventDefault();
        await Axios.post('http://localhost:4000/api/users',{
            username: this.state.username
        })
        this.setState({username :''})
        this.getUsers();
    }
    deleteUser=async id=>{
        await Axios.delete('http://localhost:4000/api/users/'+id)
        this.getUsers();
    }

    render(){
        return(
                <div className='row'>
                    <div className="col-md-4">
                        <div className="card card-body">
                            <h3>Crear Usuario</h3>
                            <form onSubmit={this.onSubmit}>
                                <div className="form-group">
                                    <input 
                                        type="text" 
                                        className='form-control' 
                                        onChange={this.onChangeUserName}
                                        value={this.state.username}    
                                    />
                                </div>
                                <button type='submit' className='btn btn-primary'>
                                    guardar
                                </button>
                            </form>
                        </div>
                    </div>
                    <div className="col-md-8">
                        <ul className="list-group">
                            {
                                this.state.users.map(user => 
                                    <li className='list-group-item list-group-item-action d-flex justify-content-between align-items-center' key={user._id}>
                                        {user.username}
                                        <button className='btn btn-danger' onClick={()=>this.deleteUser(user._id)}>borrar</button>
                                    </li>
                                )
                            }
                        </ul>
                    </div>
                </div>
            )
    }
}
export default CreateUser
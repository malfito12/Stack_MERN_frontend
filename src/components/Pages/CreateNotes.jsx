import React, { Component } from 'react'
import Axios from 'axios'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'

class CreateNotes extends Component{

    state={
        users:[],
        userSelect:'',
        date: new Date(),
        content:'',
        title:'',
        limpiar:'',
        editing: false,
        _id:''
    }

    async componentDidMount(){
        const res = await Axios.get('http://localhost:4000/api/users')
        // let unos = res.data.map(uno=>{return uno.username})
        this.setState({
            users: res.data,
            // unos: res.data.map(uno=>uno.username),
            userSelect: res.data[0].username
        })
        if(this.props.match.params.id){
            const res=await Axios.get('http://localhost:4000/api/notes/'+this.props.match.params.id)
            console.log(res)
            this.setState({
                title: res.data.title,
                content:res.data.content,
                date: new Date(res.data.date),
                userSelect:res.data.author,
                editing:true,
                _id: this.props.match.params.id
            })
        }
    }

    onSubmit=async(e)=>{
        e.preventDefault()
        const newNote ={
            title: this.state.title,
            content: this.state.content,
            date: this.state.date,
            author: this.state.userSelect
        }
        if(this.state.editing){
            await Axios.put('http://localhost:4000/api/notes/'+ this.state._id, newNote)
        }else{
            await Axios.post('http://localhost:4000/api/notes', newNote)
            
        }
        window.location='/'
        this.setState({content:'', title:''})
        
    }

    onInputChange=e=>{
        this.setState({
            // usersSelected: e.target.value
            [e.target.name]: e.target.value //usar solo una funcion para los inputs
        })
    }
    onChangeDate=e=>{
        this.setState({date: e})
    }

    render(){
        return(
            <div className="col-md-6 offset-md-3">
                <div className="card card-body">
                    <h4>Crear una Nota</h4>
                    {/** SELECT USER */}
                    <div className="form-group">
                        <select 
                            className="form-control" 
                            name='userSelect'
                            onChange={this.onInputChange}
                            value={this.state.userSelect}
                        >
                                {
                                    this.state.users.map(user =>
                                        <option key={user._id} value={user.username}>
                                            {user.username}
                                        </option>
                                        )
                                }

                        </select>
                    </div>
                    <div className='form-group'>
                        <input 
                            type="text"
                            className='form-control' 
                            placeholder='Title' 
                            name='title'
                            onChange={this.onInputChange}
                            required
                            value={this.state.title}
                            />
                    </div>
                    <div className='form-group'>
                        <textarea 
                            name="content"
                            className='form-control'
                            placeholder='contenido'
                            required
                            onChange={this.onInputChange}
                            value={this.state.content}
                            ></textarea>
                    </div>
                    <div className='form-gtoup'>
                        <DatePicker 
                            className='form-control'
                            selected={this.state.date} 
                            onChange={this.onChangeDate} />
                        
                    </div>
                    <form onSubmit={this.onSubmit}>
                        <button type='submit' className='btn btn-primary'>
                            save
                        </button>
                    </form>
                </div>
            </div>
        )
    }
}
export default CreateNotes
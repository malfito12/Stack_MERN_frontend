import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import CreateNotes from './components/Pages/CreateNotes';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import CreateUser from './components/Pages/CreateUser'
import NodeList from './components/Pages/NoteList'
import MainMenu from './components/Organimsm/MainMenu';

const App = () => (
  <Router>
    <MainMenu />
    <Switch>
      <>
      <div className='container p-4'>
        <Route exact path='/' component={NodeList} />
        <Route path='/edit/:id' component={CreateNotes} />
        <Route path='/create' component={CreateNotes} />
        <Route path='/user' component={CreateUser} />
      </div>
      </>

    </Switch>
  </Router>
)
export default App;

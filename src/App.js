import './App.css';
import { useState } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import About from './components/About';
import { Alert } from './components/Alert';
import NoteState from './context/notes/NoteState';
import AuthState from  './context/auth/AuthState';
import Login from './components/Login';
import Signup from './components/Signup';

function App() {
  const [alert, setAlert] = useState(null);

  const showAlert = (message, type) => {
    setAlert({
      msg : message,
      type: type
    })

    setTimeout(() => {
      setAlert(null);
    }, 1500)
  }

  return (
    <>
    <AuthState>
      <NoteState>
        <Router>
          <Navbar title="iNoteBook" aboutText="About iNoteBook"/>
          <Alert alert={ alert }/>
          <div className="container">
            <Switch>
              <Route exact path="/">
                  <Home showAlert={showAlert}/>
                </Route>
                <Route exact path="/login">
                  <Login showAlert={showAlert}/>
                </Route>
                <Route exact path="/signup">
                  <Signup showAlert={showAlert}/>
                </Route>
                <Route exact path="/about">
                  <About/>
                </Route>
            </Switch>
          </div>
        </Router>
      </NoteState>
    </AuthState>
    </>
  );
}

export default App;

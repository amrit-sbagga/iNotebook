import './App.css';
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
  return (
    <>
    <AuthState>
      <NoteState>
        <Router>
          <Navbar title="iNoteBook" aboutText="About iNoteBook"/>
          <Alert message="This is amzing"/>
          <div className="container">
            <Switch>
              <Route exact path="/">
                  <Home/>
                </Route>
                <Route exact path="/login">
                  <Login/>
                </Route>
                <Route exact path="/signup">
                  <Signup/>
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

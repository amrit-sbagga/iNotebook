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

function App() {
  return (
    <>
    <NoteState>
      <Router>
        <Navbar title="iNoteBook" aboutText="About iNoteBook"/>
        <Alert message="This is amzing"/>
        <div className="container">
          <Switch>
            <Route exact path="/">
                <Home/>
              </Route>
              <Route exact path="/about">
                <About/>
              </Route>
           </Switch>
        </div>
      </Router>
    </NoteState>
    </>
  );
}

export default App;

import './App.css';
import Navbar from './components/Navbar';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom';
import Home from './components/Home';
import About from './components/About';
import NoteState from './components/NoteState';
import Login from './components/Login';
import Signup from './components/Signup';
import Alert from './components/Alert'
import Alertstate from './components/Alertstate';

function App() {
  return (
    <>
       <Alertstate>
      <NoteState>
        
        <Router>
         
          <Navbar />
          <Alert/>
          
          <Routes>
            <Route exact path="/about" element={<About />}></Route>
            <Route path="/" element={<Home />}></Route>
            <Route path="/login" element={<Login />}></Route>
            <Route path="/signup" element={<Signup />}></Route>

          </Routes>
          
        </Router>
        
      </NoteState>
      </Alertstate>
        
    </>
  );
}

export default App;

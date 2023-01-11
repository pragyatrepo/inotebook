import './App.css';
import Navbar from './components/Navbar';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom';
import Home from './components/Home';
import About from './components/About';
import NoteState from './context/notes/NoteState';
import Alert from './components/alert';
import Login from './components/Login';
import Signup from './components/Signup';
import AlertContext from './context/notes/AlertContext';

function App() {
  return (
    <>
     {/* <AlertContext>  */}
      <NoteState>
        
        <Router>
         
          <Navbar />
          
          <Routes>
            <Route exact path="/about" element={<About />}></Route>
            <Route path="/" element={<Home />}></Route>
            <Route path="/login" element={<Login />}></Route>
            <Route path="/signup" element={<Signup />}></Route>

          </Routes>
          
        </Router>
       
      </NoteState>
      {/* </AlertContext> */}
    </>
  );
}

export default App;

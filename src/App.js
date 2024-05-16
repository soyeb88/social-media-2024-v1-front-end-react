import './App.css';
import { BrowserRouter as Router,Routes, Route } from 'react-router-dom';
import SignUpPageComponent from './components/SignUpPageComponent';
import LogInPageComponent from './components/LogInPageComponent';
import ProfilePageComponent from './components/ProfilePageComponent';

function App() {
  return (
    
    <div className="App">
      <h1>Hello</h1>
      
      <Router>
        <Routes>
            <Route path="signup" element={<SignUpPageComponent/>}></Route>
            <Route path="/" element={<LogInPageComponent/>}></Route>
            <Route path="/profile" element={<ProfilePageComponent/>}></Route>
        </Routes>                         
      </Router>
    </div>
  );
}

export default App;

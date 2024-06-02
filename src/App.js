import { BrowserRouter as Router,Routes, Route } from 'react-router-dom';
import SignUpPageComponent from './components/SignUpPageComponent';
import LogInPageComponent from './components/LogInPageComponent';
import Facebook from './components/Facebook';
import ProfilePageComponent from './components/Child/ProfilePageComponent';
import Setting from './components/Child/Setting';

function App() {
  return (
    
    <div className="App">
      
      <Router>
        <Routes>
            <Route path="signup" element={<SignUpPageComponent/>}></Route>
            <Route path="/" element={<LogInPageComponent/>}></Route>
            <Route path="/profile" element={<ProfilePageComponent/>}></Route>
            <Route path="/facebook" element={<Facebook/>}></Route>
            <Route path="/facebook/setting" element={<Setting/>}></Route>
        </Routes>                         
      </Router>
    </div>
  );
}

export default App;

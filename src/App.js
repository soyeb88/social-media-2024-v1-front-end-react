import { BrowserRouter as Router,Routes, Route } from 'react-router-dom';
import Facebook from './components/Facebook';
import Setting from './components/Child/Setting';
import FacebookProfilePageComponent from './components/Child/FacebookProfilePageComponent';
import FacebookError from './components/UtilComponents/FacebookError';
import TermsAndConditions from './components/TermsAndConditions';

function App() {
  return (
    
    <div className="App">
      
      <Router>
        <Routes>
            <Route path="/facebook/term-conditions" element={<TermsAndConditions/>}></Route>
            <Route path="/facebook/setting" element={<Setting/>}></Route>
            <Route path="/facebook/profile" element={<FacebookProfilePageComponent/>}></Route>
            <Route path="/" element={<Facebook/>}></Route>
            <Route path="*" element={<FacebookError/>}/>
        </Routes>                         
      </Router>
    </div>
  );
}

export default App;

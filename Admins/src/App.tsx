import React, {useState} from 'react';
import './App.css';
import Signin from './Components/Signin/Signin';
import Mainpage from './Components/Mainpage/Mainpage';
import Navbar from './Components/Navbar/navbar';
function App() {
  const [login, setlogin] = useState(false);
  return (
    <div>
      {login? <Mainpage/> : <Signin setlog={setlogin} /> }
    </div>
  );
}

export default App;
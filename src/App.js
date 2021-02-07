
import './App.css';
import Register from './component/Register'
import Success from './component/Success'
import {useState} from 'react';

function App() {
  const [registered, setRegistered] = useState(false)
  return (
    <div className='App'>
      { (registered)?
      (<Success/>):(
        <Register setRegistered={setRegistered}/>
      )
      
    }
    
    </div>
  );
}

export default App;

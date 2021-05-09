import Navbar from './Navbar'
import Dashboard from './Dashboard'
import Signup from './SignUp'
import { BrowserRouter, Route } from 'react-router-dom'
import '../App.css'

function App() {
  return (
      <div className="App">
          <BrowserRouter>
            <div>
              <Navbar/>
              <Route path="/" exact component={Dashboard} />
              <Route path="/signup" exact component={Signup} />
            </div>
          </BrowserRouter>
      </div>
  );
}

export default App;

import './App.css';
import Navbar from './components/Navbar'
import SignUp from './components/SignUp'

function App() {
  return (
    <div className="App">
      <BrowserRourer>
        <div>
          <Navbar/>
          <Route path="/" exact component={HomePage} />
        </div>
      </BrowserRourer>
    </div>
  );
}

export default App;

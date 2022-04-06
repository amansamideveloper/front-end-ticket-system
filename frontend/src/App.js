
import './App.css';
import { BrowserRouter as Router, Route, } from 'react-router-dom'
import Landing from './components/Landing';
import Register from './Auth/Register'
import Login from './Auth/Login';
function App() {
  return (
    <Router>
      <Landing />
      <Route exact path='/login' component={Login} />
    </Router>
  );
}

export default App;

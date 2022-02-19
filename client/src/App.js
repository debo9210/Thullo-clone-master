import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { setCurrentUser, logoutUser } from './redux/actions/authActions';
import setAuthToken from './utils/setAuthToken';
import jwt_decode from 'jwt-decode';
import store from './store';
import LandingPage from './components/LandingPage';
import DashBoard from './components/Dashboard';
import './App.css';

//check for token
if (localStorage.jwtToken) {
  //set auth token header auth
  setAuthToken(localStorage.jwtToken);
  //decode token and get user info and expiratiion
  const decoded = jwt_decode(localStorage.jwtToken);

  //set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded));

  //check for expired token
  const currentTime = Date.now() / 1000;

  if (decoded.exp < currentTime) {
    // logout user
    store.dispatch(logoutUser());
    window.location.href = '/';
  }
}

const date = `${new Date().getFullYear()}`;
//

function App() {
  return (
    <div className='App'>
      <Router>
        <Routes>
          <Route path='/' element={<LandingPage />} exact />
          <Route path='/dashboard' element={<DashBoard />} exact />
        </Routes>
      </Router>
      <footer>
        <p>
          created by 'lolu <span>&copy; {date}</span>
        </p>
      </footer>
    </div>
  );
}

export default App;

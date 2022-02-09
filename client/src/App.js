import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import './App.css';

const date = `${new Date().getFullYear()}`;
//

function App() {
  return (
    <div className='App'>
      <Router>
        <Routes>
          <Route path='/' element={<LandingPage />} exact />
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

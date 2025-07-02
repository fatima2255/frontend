import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SignUp from '../src/modules/auth/pages/signup';
import SignIn from '../src/modules/auth/pages/signin';
import Dashboard from './modules/auth/pages/dashboard/dashboard';
// import Navbar from './components/Navbar';
// import Footer from './components/Footer';

const App = () => {
  return (
    <Router>
      <div className="min-h-screen">
        <Routes>
          <Route path="/signup" element={<SignUp />} />
          <Route path="/signin" element={<SignIn />} />
           <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;

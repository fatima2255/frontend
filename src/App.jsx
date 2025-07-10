import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SignUp from '../src/modules/auth/pages/signup';
import SignIn from '../src/modules/auth/pages/signin';
import Dashboard from './modules/dashboard/dashboard';
import ForgotPassword from './modules/forgetPassword/forgetPassword';
import ResetPassword from './modules/resetPassword/resetPassword';
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
           <Route path="/forget-password" element={<ForgotPassword />} />
           <Route path="/reset-password/:token" element={<ResetPassword />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;

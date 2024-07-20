import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Register from './pages/Register';
import Login from './pages/Login';
import PropertiesPage from './components/PropertiesPage';
import AddNewProperty from './components/AddNewProperty';
import ViewProperties from './components/ViewProperties';
import Profile from './components/Profile';
import './index.css';
function App() {
  return (
    <Router>
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/properties" element={<PropertiesPage />}>
        <Route path="add" element={<AddNewProperty />} />
        <Route path="view" element={<ViewProperties />} />
      </Route>
      <Route path="/profile" element={<Profile />} />
    </Routes>
  </Router>
  
  );
}

export default App;

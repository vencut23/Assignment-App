import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Register from './pages/Register';
import Login from './pages/Login';
import PropertiesPage from './components/PropertiesPage';
import AddNewProperty from './components/AddNewProperty';
import ViewProperties from './components/ViewProperties';
import Profile from './components/Profile';
import ManageProperty from './components/ManageProperty';
import ProtectedRoute from './components/ProtectedRoute';
import './index.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/properties"
          element={
            <ProtectedRoute>
              <PropertiesPage />
            </ProtectedRoute>
          }
        >
          <Route path="add" element={<AddNewProperty />} />
          <Route path="view" element={<ViewProperties />} />
        </Route>
        <Route
          path="/properties/manage/:propertyId"
          element={
            <ProtectedRoute>
              <ManageProperty />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;

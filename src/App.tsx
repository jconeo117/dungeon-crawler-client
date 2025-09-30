import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainLayout from './Components/MainLayout';
import Dashboard from './Pages/Dashboard';
import Login from './Pages/LoginPage';
import Register from './Pages/RegisterPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="character" element={<div>Character Page</div>} />
          <Route path="inventory" element={<div>Inventory Page</div>} />
          <Route path="shop" element={<div>Shop Page</div>} />
          <Route path="auctions" element={<div>Auctions Page</div>} />
          <Route path="dungeons" element={<div>Dungeons Page</div>} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
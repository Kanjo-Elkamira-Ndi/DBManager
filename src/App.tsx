import { BrowserRouter, Routes, Route } from "react-router-dom";
import DigimarkDashboards from './pages/DigimarkDashboards'
import Home from './pages/Home';
import UserDirectory from './pages/UserDirectory';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<DigimarkDashboards />} />
        <Route path="/dashboards" element={<Home />} />
        <Route path="/users/directory" element={<UserDirectory />} />
        {/* Add more routes as needed */}
        <Route path="*" element={<div>404 - Page Not Found</div>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
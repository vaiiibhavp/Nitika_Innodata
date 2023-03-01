import './App.css';
import Login from './Pages/Login';
import Register from './Pages/Register';
import Document from './Pages/Document';
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import PrivateRoutes from './PrivateRoutes';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<PrivateRoutes />} >
          <Route path="/document" element={<Document />} />
        </Route>
        <Route index path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>

    </BrowserRouter>
  );
}

export default App;

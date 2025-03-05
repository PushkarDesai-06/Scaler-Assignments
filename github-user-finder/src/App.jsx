import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import UserInfo from './pages/UserInfo';

function App() {
  return (

    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/user/:username" element={<UserInfo />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App

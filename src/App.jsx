import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import AgendarViagens from './pages/AgendarViagens';
import ListarViagens from './pages/ListarViagens';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<AgendarViagens />} />
          <Route path="/minhas-viagens" element={<ListarViagens />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;

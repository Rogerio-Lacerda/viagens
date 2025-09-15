import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import AgendarViagens from './pages/AgendarViagens';
import ListarViagens from './pages/ListarViagens';
import CadastrarColaborador from './pages/CadastrarColaborador';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<AgendarViagens />} />
          <Route path="/minhas-viagens" element={<ListarViagens />} />
          <Route path="/cadastrar-colaborador" element={<CadastrarColaborador />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;

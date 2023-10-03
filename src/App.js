import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import ProductForm from './components/ProductForm';
import ProductList from './components/ProductList';

function App() {
  return (
    <Router>
      <div className="App">
        <nav>
          <ul>
            <li>
              <Link to="/adicionar">Adicionar Produto</Link>
            </li>
            <li>
              <Link to="/listar">Listar Produtos</Link>
            </li>
          </ul>
        </nav>
        <Routes>
          <Route path="/adicionar" element={<ProductForm />} />
          <Route path="/listar" element={<ProductList />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;


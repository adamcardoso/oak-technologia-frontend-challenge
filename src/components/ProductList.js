import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const ProductList = () => {
  const [products, setProducts] = useState([]);

  // Função para buscar a lista de produtos do servidor
  const fetchProducts = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/listar');
      setProducts(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  // Chame a função de busca de produtos quando o componente for montado
  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div>
      <h2>Listagem de Produtos</h2>
      <Link to="/adicionar">Adicionar Produto</Link>
      {products.length === 0 ? (
        <p>Não há produtos cadastrados ainda.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Nome</th>
              <th>Valor</th>
              <th>Disponibilidade</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product, index) => (
              <tr key={index}>
                <td>{product.nome}</td> {/* Deve ser product.nome em vez de product.name */}
                <td>{product.valor}</td> {/* Deve ser product.valor em vez de product.value */}
                <td>{product.disponivel}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ProductList;

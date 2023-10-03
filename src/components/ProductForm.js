import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const ProductForm = ({ addProduct }) => {
  const [productName, setProductName] = useState('');
  const [productDescription, setProductDescription] = useState('');
  const [productValue, setProductValue] = useState('');
  const [availableForSale, setAvailableForSale] = useState(false);
  const [successMessage, setSuccessMessage] = useState(''); // Estado para a mensagem de sucesso

  const createProduct = async (newProduct) => {
    try {
      const response = await axios.post('http://localhost:8080/api/produtos', newProduct);
      console.log(response.data); 
      addProduct(response.data); 
      // Limpe os campos do formulário após a criação
      setProductName('');
      setProductDescription('');
      setProductValue('');
      setAvailableForSale(false);
      setSuccessMessage('Produto cadastrado com sucesso!'); // Define a mensagem de sucesso
      // Limpa a mensagem de sucesso após alguns segundos (opcional)
      setTimeout(() => {
        setSuccessMessage('');
      }, 3000); // Limpa após 3 segundos (ajuste conforme necessário)
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newProduct = {
      nome: productName, 
      descricao: productDescription,
      valor: parseFloat(productValue.replace(',', '.')), // Converter a vírgula em ponto e analisar como float
      disponivel: availableForSale ? 'DISPONIVEL' : 'NAO_DISPONIVEL',
    };
    createProduct(newProduct); 
  };

  return (
    <div>
      <h2>Cadastrar Produto</h2>
      <Link to="/listar">Listar Produtos</Link>
      {successMessage && <p>{successMessage}</p>} {/* Exibe a mensagem de sucesso se existir */}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Nome do produto:</label>
          <input
            type="text"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Descrição do produto:</label>
          <input
            type="text"
            value={productDescription}
            onChange={(e) => setProductDescription(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Preço do produto (R$):</label>
          <input
            type="text" // Usando tipo "text" para formatar o valor como moeda brasileira
            value={productValue}
            onChange={(e) => setProductValue(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Disponível para venda:</label>
          <select
            value={availableForSale}
            onChange={(e) => setAvailableForSale(e.target.value === 'true')}
            required
          >
            <option value="true">Sim</option>
            <option value="false">Não</option>
          </select>
        </div>
        <button type="submit">Cadastrar</button>
      </form>
    </div>
  );
};

export default ProductForm;

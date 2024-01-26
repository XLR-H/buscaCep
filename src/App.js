import './App.css';
import { useState } from 'react';

function App() {
  const [endereco, setEndereco] = useState({});

  function manipularEndereco(evento) {
    const cep = evento.target.value
    setEndereco({
      cep
    })

    if (cep && cep.length === 8) {
      //obter o cep
      fetch(`https://viacep.com.br/ws/${cep}/json/`)
        .then(resposta => resposta.json())
        .then(dados => {
          setEndereco(enderecoAntigo => {
            return {
              ...enderecoAntigo,
              rua: dados.logradouro,
              complemento: dados.complemento,
              bairro: dados.bairro,
              cidade: dados.localidade,
              estado: dados.uf
            }
          })
        })
    }
  }

  return (
    <div className="App">
      <header>
        <input placeholder='Digite o cep' onChange={manipularEndereco} />
        <ul>
          <li><strong>CEP:</strong> {endereco.cep} </li>
          <li><strong>Rua:</strong> {endereco.rua} </li>
          <li><strong>Compl/to:</strong> {endereco.complemento} </li>
          <li><strong>Bairro:</strong> {endereco.bairro} </li>
          <li><strong>Cidade:</strong> {endereco.cidade} </li>
          <li><strong>Estado:</strong> {endereco.estado} </li>
        </ul>
      </header>
    </div>
  );
}

export default App;
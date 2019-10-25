import React,{Component} from 'react';
import './App.css';

class App extends Component{

  constructor(){
    super();
    this.state = {
        lista: [
            {
              logradouro: "",
              complemento: "",
              bairro: "",
              localidade: "",
              uf: ""
            }
          ],
          cepbuscado: ""
    };
  }

  componentDidMount() {
    fetch('https://viacep.com.br/ws/'+this.state.cepbuscado+'/json/')
        .then(response => response.json())
        .then(data => this.setState({lista: data}))
  }

  AtualizarTabela = (event) => {
    event.preventDefault()
    fetch('https://viacep.com.br/ws/'+this.state.cepbuscado+'/json/')
        .then(response => response.json())
        .then(data => this.setState({lista: data}))
        .catch(erro => {this.setState({erro: "CEP inválido"})})
  }

  AtualizarDados = (event) => {
    this.setState({cepbuscado: event.target.value})
    console.log(this.state)
  }
  
  render(){
    return (
      <div className="App">
        <nav>
          <h1>Consulte seu CEP</h1>
        </nav>
        <div className="input-group flex-nowrap">
          <div className="input-group-prepend">
            <span className="input-group-text" id="addon-wrapping">CEP</span>
          </div>
          <input type="text" className="form-control" placeholder="Digite seu CEP aqui" aria-label="Username" aria-describedby="addon-wrapping" onInput={this.AtualizarDados}/>
          <button type="button" class="btn btn-primary btn-lg" onClick={this.AtualizarTabela}>Buscar</button>
        </div>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Logradouro</th>
              <th scope="col">Complemento</th>
              <th scope="col">Bairro</th>
              <th scope="col">Localidade</th>
              <th scope="col">UF</th>
            </tr>
          </thead>
          <tbody>
              <tr>
                  <td>{this.state.lista.logradouro}</td>
                  <td>{this.state.lista.complemento}</td>
                  <td>{this.state.lista.bairro}</td>
                  <td>{this.state.lista.localidade}</td>
                  <td>{this.state.lista.uf}</td>
              </tr>
          </tbody>
        </table>
      </div>
    );
  }
}

export default App;

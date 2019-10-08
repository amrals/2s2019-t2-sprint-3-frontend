import React,{Component} from 'react';
import logo from './assets/img/github.png';
import './App.css';

class App extends Component {

  constructor(){
    super();
    this.state = {
      user: "",
      listaRepos:[]
    }
  }

  atualizaUser = (e)=>{
    this.setState({user: e.target.value});
    // console.log(this.state.user);
  }

  preencherLista = (e)=>{
    if(e.message == "Not Found" || e.status == 403  ){
      this.setState({listaRepos: []});
      console.log("a n man");
    }
    else{
      this.setState({listaRepos: e});
      console.log(this.state.listaRepos);
    }
  }

  buscarUser = (e)=>{
    e.preventDefault();
    const url = "https://api.github.com/users/"+this.state.user+"/repos"
    console.log(url);

    fetch(url)
    .then(resposta => resposta.json())
    .then(data => this.preencherLista(data)) 
    .catch(error => this.preencherLista(error)); 
  }


 render(){
   return (
     <div className="App">
       <img src={logo} id='logogit'/>
       <div class="input-group flex-nowrap">
         <div class="input-group-prepend">
           <span class="input-group-text" id="addon-wrapping">@</span>
         </div>
         <input type="text" class="form-control" placeholder="Usuário" aria-label="Username" aria-describedby="addon-wrapping" onChange={this.atualizaUser}/>
         <button type="button" class="btn btn-primary" onClick={this.buscarUser} >Buscar</button>

       </div>
       <table class="table">
         <thead>
           <tr>
             <th scope="col">#</th>
             <th scope="col">Repositório</th>
             <th scope="col">Descrição</th>
             <th scope="col">Data de Criação</th>
             <th scope="col">Tamanho do repositório</th>
           </tr>
         </thead>
         <tbody>
          {this.state.listaRepos.map(e =>{
            return (
              <tr className='linhaTabela'>
                <td>{e.id}</td>
                <td>{e.name}</td>
                <td>{e.deion}</td>
                <td>{e.created_at}</td>
                <td>{e.size}</td>
              </tr>
          )})}
        </tbody>
       </table>
     </div>
   );
 }
}

export default App;

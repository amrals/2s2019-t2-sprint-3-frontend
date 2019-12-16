import React,{Component} from 'react'
import logo from    '../../img/logo.png';
import Rodape from '../../components/Rodape/Rodape'
import Axios from 'axios';
import {Link} from 'react-router-dom';
import { parseJwt } from '../../services/auth';
import './Categorias.css';

class Categorias extends Component{

    constructor(){
        super();
        this.state = {
            lista: [],
            nome: ''
        };
    }

    componentDidMount(){
        this.listaAtualizada();
    }

    listaAtualizada = () =>{
        Axios.get('http://192.168.4.26:5000/api/categorias',{
            headers: {
                Authorization: 'Bearer '+localStorage.getItem('usuario-opflix')
            }
        })
            .then(data => {
                this.setState({lista: data.data});
                console.log(this.state)
            })
            .catch(erro => {
                console.log(erro);
            });
    }

    adicionaItem = (event) => {
        event.preventDefault();
        console.log(this.state.nome);
        fetch('http://192.168.4.26:5000/api/categorias',{
            method: "POST",
            body: JSON.stringify({ nome: this.state.nome }),
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("usuario-opflix"),
                "Content-Type": "application/json"
            }
        })
        .then(this.listaAtualizada)
        .catch(error => console.log(error))
        
    }

    atualizarNome = (event) =>{
        this.setState({nome: event.target.value})
        console.log(this.state);
    }

    render(){
        return(
            <div id='divona_lancamentosadm'>
                <div id='table_form'>
                    <div id='divinha_lancamentosadm'>
                        <div id='header_lancamentosadm'>
                            <Link to="/dashboard"><img src={logo} alt="" className="logo"/></Link>
                            <p id='p_adm'>Administrador - {parseJwt().Nome}</p>
                        </div>
                        <h1>Categorias</h1>
                        <table class="table">
                            <thead>
                                <tr>
                                <th scope="col">#</th>
                                <th scope="col">Nome</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.state.lista.map(element => {
                                    return(
                                        <tr>
                                        <th scope="row">{element.idCategoria}</th>
                                        <td>{element.nome}</td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>
                    </div>
                    <div className="container" id="conteudoPrincipal-cadastro">
                        <h2 className="conteudoPrincipal-cadastro-titulo">
                            Cadastrar Categoria
                        </h2>
                        <form id='form_cat'>
                        <div className="container">
                            <input
                            type="text"
                            className="className__categoria"
                            id="input__categoria"
                            placeholder="Nome da categoria"
                            value={this.state.nome}
                            onInput={this.atualizarNome}
                            />
                            <button
                            id="btn__cadastrar"
                            onClick={this.adicionaItem}
                            className="conteudoPrincipal-btn conteudoPrincipal-btn-cadastro"
                            >
                            Cadastrar
                            </button>
                        </div>
                        </form>
                    </div>
                </div>
                <Rodape/>
            </div>
        )
    }
}

export default Categorias
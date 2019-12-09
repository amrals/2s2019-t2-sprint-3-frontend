import React,{Component} from 'react'
import logo from    '../../img/logo.png';
import Rodape from '../../components/Rodape/Rodape'
import Axios from 'axios';
import {Link} from 'react-router-dom';
import { parseJwt } from '../../services/auth';
import './Usuarios.css';

class Usuarios extends Component{

    constructor(){
        super();
        this.state = {
            lista: [],
            nomeUsuario: "",
            emailUsuario: "",
            senhaUsuario: "",
            tipoUsuario: "",
            tipoUsuarioSelecionado: "",
        };
    }

    componentDidMount(){
        Axios.get('http://192.168.4.26:5000/api/usuarios',{
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
    
        atualizarNomeUsuario = (event) => {
            this.setState({ nomeUsuario: event.target.value })
            console.log(this.state);
        }
        atualizarEmailUsuario = (event) => {
            this.setState({ emailUsuario: event.target.value })
            console.log(this.state);
        }
        atualizarSenhaUsuario = (event) => {
            this.setState({ senhaUsuario: event.target.value })
            console.log(this.state);
        }
        atualizarTipoUsuario = (event) => {
            this.setState({ tipoUsuario: event.target.value })
            console.log(this.state);
        }

        adicionarItem = (event) => {
            event.preventDefault();
            console.log('state', this.state);
            Axios.post('http://192.168.4.26:5000/api/usuarios', {
                Nome: this.state.nomeUsuario,
                Email: this.state.emailUsuario,
                Senha: this.state.senhaUsuario,
                IdTipoUsuario: this.state.tipoUsuario,
            }, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json',
                        Authorization: 'Bearer ' + localStorage.getItem('usuario-opflix')
                    }
                })
                .then(response => { console.log(response) })
                .then(this.exibirLista())
                .catch(erro => {
                    this.setState({ erro: "Não foi possível cadastrar" });
                    console.log('error', erro);
                });
        }

        exibirLista = () => {
            Axios.get('http://192.168.4.26:5000/api/usuarios', {
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('usuario-opflix')
                }
            })
                .then(data => {
                    this.setState({ lista: data.data });
                })
                .catch(erro => {
                    console.log(erro);
                });
        }
    

    render(){
        return(
            <div id='divona_usuarios'>
                <div id='divinha_usuariosadm'>
                    <div id='header_lancamentosadm'>
                        <Link to="/dashboard"><img src={logo} alt="" className="logo"/></Link>
                        <p id='p_adm'>Administrador - {parseJwt().Nome}</p>
                    </div>
                    <p id='user_title'>Usuários</p>
                    <table class="table">
                        <thead>
                            <tr>
                            <th scope="col">#</th>
                            <th scope="col">Nome</th>
                            <th scope="col">Email</th>
                            <th scope="col">Senha</th>
                            <th scope="col">Tipo usuário</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.lista.map(element => {
                                return(
                                    <tr>
                                    <th scope="row">{element.idUsuario}</th>
                                    <td>{element.nome}</td>
                                    <td>{element.email}</td>
                                    <td>{element.senha}</td>
                                    <td>{element.idTipoUsuario}</td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>


                    <div className="container" id="conteudoPrincipal-cadastro">
                    <h2 className="conteudoPrincipal-cadastro-titulo">
                        Cadastrar Usuário
                    </h2>
                    <form action="">
                        <input type="text" placeholder="Nome" onInput={this.atualizarNomeUsuario}></input>
                        <input type="text" placeholder="Email" onInput={this.atualizarEmailUsuario}></input>
                        <input type="text" placeholder="Senha" onInput={this.atualizarSenhaUsuario}></input>
                        <select onInput={this.atualizarTipoUsuario} values={this.state.tipoUsuarioSelecionado}>
                            <option selected>Tipo do Usuário...</option>
                            <option value='1'>Administrador</option>
                            <option value='2'>Comum</option>
                        </select>
                        
                    
                        <button onClick={this.adicionarItem} id='btn_lancamentos'>Cadastrar</button>
                    </form>
                </div>
                </div>
                <Rodape/>
            </div>
        )
    }
}

export default Usuarios
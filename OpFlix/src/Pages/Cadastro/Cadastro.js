import React,{Component} from 'react';
import logo from    '../../img/logo.png';
import {Link} from 'react-router-dom';
import './Cadastro.css';
import Axios from 'axios';

class Cadastro extends Component{

    constructor(){
        super();
        this.state = {
            lista: [
                // {idCategoria: 1, nome: "Design"},
                // {idCategoria: 2, nome: "Jogos"},
                // {idCategoria: 3, nome: "Meetup"}
            ],
            nome: '',
            email: '',
            senha: ''
        };
    }


    atualizaEstadoEmail = (event) => {
        this.setState({ email: event.target.value });
    }

    atualizaEstadoSenha = (event) => {
        this.setState({ senha: event.target.value });
    }

    atualizaEstadoNome = (event) => {
        this.setState({ nome: event.target.value });
    }

    efetuarCadastro = (event) => {
        event.preventDefault();

        Axios.post("http://192.168.4.26:5000/api/usuarios/cadastrocomum", {
            email: this.state.email,
            nome: this.state.nome,
            senha: this.state.senha
        })
            .then(response => {
                if (response.status === 200) {
                    console.log("ok");
                    this.props.history.push('/Login');
                } else {
                    console.log('vish deu ruim');
                }
            })
            .catch(erro => {
                this.setState({ erro: "E-mail ou senha inválidos" });
                console.log(erro);
            });
    }

    render(){
        return(
            <div className="divona">
                <Link to="/"><img src={logo} alt="" className="logo"/></Link>
                <div id="box_login">
                    <h2>Cadastro</h2>
                    <form>
                        <input type='text' placeholder='Nome' onInput={this.atualizaEstadoNome} required></input>
                        <input type='text' placeholder='Email' onInput={this.atualizaEstadoEmail} required></input>
                        <input type='password' placeholder='Senha' onInput={this.atualizaEstadoSenha} required></input>
                        <br></br>
                        <input type="submit" name="" value="Cadastrar-se" id="submit_login" onClick={this.efetuarCadastro}/>
                    </form>
                </div>
            </div>
        )
    }
}

export default Cadastro;
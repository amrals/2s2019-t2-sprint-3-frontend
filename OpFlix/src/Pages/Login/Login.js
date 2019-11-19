import React,{Component} from 'react';
import logo from    '../../img/logo.png';
import {Link} from 'react-router-dom';
import Axios from 'axios';
import {    parseJwt    } from '../../services/auth.js'
import './Login.css';

class Login extends Component{

    constructor(){
        super();
        this.state = {
            email: "",
            senha: "",
            erro: ""
        }
    }

    atualizaEstadoEmail = (event) =>{
        this.setState({email: event.target.value});
    }

    atualizaEstadoSenha = (event) =>{
        this.setState({senha: event.target.value});
    }
    
    efetuarLogin = (event) =>{
        event.preventDefault();
        
        Axios.post("http://192.168.4.26:5000/api/login", {
            email: this.state.email, 
            senha: this.state.senha
        })
            .then(response =>{
                if(response.status === 200){
                    console.log(response.data.token);
                    localStorage.setItem("usuario-opflix",response.data.token);
                    this.props.history.push('/dashboard');
                }else{
                    console.log('vish deu ruim');
                }
            })
            .catch(erro => { 
                this.setState({ erro: "Usuário ou senha inválidos"});
                console.log(erro);
            });
    }

    render(){
        return(
            <div className="divona">
                <Link to="/"><img src={logo} alt="" className="logo"/></Link>
                <div id="box_login">
                    <h2>Login</h2>
                    <form onSubmit={this.efetuarLogin}>
                        <input type='text' placeholder='Email' onInput={this.atualizaEstadoEmail}></input>
                        <input type='password' placeholder='Senha' onInput={this.atualizaEstadoSenha}></input>
                        <p 
                        className="text__login"
                        style={{color: "red", textAlign: "center"}}
                        >
                            {this.state.erro}
                        </p>
                        <input type="submit" name="" value="Entrar" id="submit_login"/>
                    </form>
                    <p>Ainda não possui uma conta?</p>
                    <Link to="/cadastro" id="cadastro_login">Cadastre-se</Link>
                </div>
            </div>
        )
    }
}

export default Login;
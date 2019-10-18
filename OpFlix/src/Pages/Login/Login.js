import React,{Component} from 'react';
import logo from    '../../img/logo.png';
import {Link} from 'react-router-dom';
import './Login.css';

class Login extends Component{

    render(){
        return(
            <div className="divona">
                <Link to="/"><img src={logo} alt="" className="logo"/></Link>
                <div id="box_login">
                    <h2>Login</h2>
                    <form>
                        <input type='text' placeholder='Email'></input>
                        <input type='password' placeholder='Senha'></input>
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
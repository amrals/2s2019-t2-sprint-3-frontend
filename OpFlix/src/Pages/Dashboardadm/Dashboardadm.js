import React,{Component} from 'react';
import logo from    '../../img/logo.png';
import Rodape from '../../components/Rodape/Rodape'
import {Link} from 'react-router-dom';
import './Dashboardadm.css'
import { parseJwt } from '../../services/auth';

class Dashboardadm extends Component{

    constructor(){
        super();
        this.state = {
            permissao : ''
        }
    }

    // componentDidMount(){
    //     this.setState({permissao: parseJwt().Permissao})
    // }

    render(){
        return(
            <div id='divona'>
                <div id='divinha'>
                    <div id='header'>
                        <Link to="/"><img src={logo} alt="" className="logo"/></Link>
                        <p id='p_adm'>Administrador</p>
                    </div>
                    <p>Seja bem vindo(a) {parseJwt().Nome}</p>
                    <p>Aqui estão seus guias de acesso</p>
                    <div id='guias'>
                        <button>Categorias</button>
                        <button>Lançamentos</button>
                        <button>Usuários</button>
                    </div>
                </div>
                <div id='rodape'>
                <Rodape/>
                </div>
            </div>
        )
    }
}

export default Dashboardadm
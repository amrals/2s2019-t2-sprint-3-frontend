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

    _delogar = async() => {
        localStorage.clear();
    }

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
                        <Link to='/categorias' className='guias_botoes'>Categorias</Link>
                        <Link to='/lancamentosadm' className='guias_botoes'>Lançamentos</Link>
                        <Link to='/usuarios' className='guias_botoes'>Usuários</Link>
                    </div>
                </div>
                <Link to='/' onClick={this._delogar} className='sairadm'>Sair</Link>
                <div id='rodape' className='rodapeadm'>
                    <Rodape/>
                </div>
            </div>
        )
    }
}

export default Dashboardadm
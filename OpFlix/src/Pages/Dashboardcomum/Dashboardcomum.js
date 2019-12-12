import React,{Component} from 'react';
import logo from    '../../img/logo.png';
import Rodape from '../../components/Rodape/Rodape'
import {Link} from 'react-router-dom';
import './Dashboardcomum.css'
import { parseJwt } from '../../services/auth';

class Dashboardcomum extends Component{

    constructor(){
        super();
        this.state = {
            nome: ''
        }
    }

    _delogar = async() => {
        localStorage.clear();
    }

    getParsedNome(nome){
        nome = String(nome).replace('Ã¡', 'á');
        nome = String(nome).replace('Ã', 'í');
        return nome;
    }

    render(){
        return(
            <div id='divona'>
                <div id='divinha'>
                    <div id='header'>
                        <Link to="/"><img src={logo} alt="" className="logo"/></Link>
                        <p id='p_adm'>Comum</p>
                    </div>
                        <p>Seja bem vindo(a) {this.getParsedNome(parseJwt().Nome)}</p>
                        <p>Aqui estão os lançamentos!</p>
                    <div id='guias'>
                        <Link to='/lancamentoscomum' className='guias_botoes'>Lançamentos</Link>
                    </div>
                    <br></br>
                    <br></br>
                    <br></br>
                    <br></br>
                    <br></br>
                    <br></br>
                    <br></br>
                    <br></br>
                    <div className='sair_tudao'>
                        <Link to='/' onClick={this._delogar} className='sair'>Sair</Link>
                    </div>
                </div>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <Rodape/>
            </div>
        )
    }
}

export default Dashboardcomum
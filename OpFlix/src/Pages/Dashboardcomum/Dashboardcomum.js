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

    render(){
        return(
            <div id='divona'>
                <div id='divinha'>
                    <div id='header'>
                        <Link to="/"><img src={logo} alt="" className="logo"/></Link>
                        <p id='p_adm'>Comum</p>
                    </div>
                        <p>Seja bem vindo(a) {parseJwt().Nome}</p>
                        <p>Aqui estão os lançamentos!</p>
                    <div id='guias'>
                        <Link to='/lancamentoscomum' className='guias_botoes'>Lançamentos</Link>
                    </div>
                </div>
                <Rodape/>
            </div>
        )
    }
}

export default Dashboardcomum
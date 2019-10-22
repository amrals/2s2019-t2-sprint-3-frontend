import React,{Component} from 'react';
import logo from    '../../img/logo.png';
import {Link} from 'react-router-dom';
import Rodape from '../../components/Rodape/Rodape'
import './NaoEncontrado.css'


class NaoEncontrado extends Component{
    render(){
        return(
            <div id='divona_404'>
                <div id='divinha_404'>
                    <Link to="/"><img src={logo} alt="" className="logo"/></Link>
                    <div id='content_404'>
                        <p id='p_404'>404</p>
                        <p>Desculpe-nos, não conseguimos encontrar a página que está procurando</p>
                        <br/>
                        <p>:(</p>
                    </div>
                </div>
                <Rodape/>
            </div>
        )
    }
}

export default NaoEncontrado;
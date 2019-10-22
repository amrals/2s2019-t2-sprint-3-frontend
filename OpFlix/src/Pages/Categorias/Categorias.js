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
            lista: []
        };
    }

    componentDidMount(){
        Axios.get('http://localhost:5000/api/categorias',{
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

    render(){
        return(
            <div id='divona_lancamentosadm'>
                <div id='divinha_lancamentosadm'>
                    <div id='header_lancamentosadm'>
                        <Link to="/dashboard"><img src={logo} alt="" className="logo"/></Link>
                        <p id='p_adm'>Administrador - {parseJwt().Nome}</p>
                    </div>
                    <p>Categorias</p>
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
                <Rodape/>
            </div>
        )
    }
}

export default Categorias
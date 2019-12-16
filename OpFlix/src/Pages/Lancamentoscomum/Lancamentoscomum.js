import React,{Component} from 'react'
import logo from    '../../img/logo.png';
import Rodape from '../../components/Rodape/Rodape'
import Axios from 'axios';
import {Link} from 'react-router-dom';
import { parseJwt } from '../../services/auth';
import './Lancamentoscomum.css';

class Lancamentosadm extends Component{

    constructor(){
        super();
        this.state = {
            lista: []
        };
    }

    componentDidMount(){
        Axios.get('http://192.168.4.26:5000/api/midias',{
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

        getParsedNome(nome){
            nome = String(nome).replace('Ã¡', 'á');
            nome = String(nome).replace('Ã', 'í');
            return nome;
        }
    

    render(){
        return(
            <div id='divona_lancamentosadm'>
                <div id='divinha_lancamentosadm'>
                    <div id='header_lancamentosadm'>
                        <Link to="/dashboard"><img src={logo} alt="" className="logo"/></Link>
                        <p id='p_adm'>Usuário - {this.getParsedNome(parseJwt().Nome)}</p>
                    </div>
                    <h1>Lançamentos</h1>
                    {/* <table class="table">
                        <thead>
                            <tr>
                            <th scope="col">#</th>
                            <th scope="col">Nome</th>
                            <th scope="col">Data de Lançamento</th>
                            <th scope="col">Categoria</th>
                            <th scope="col">Sinopse</th>
                            <th scope="col">Duração</th>
                            <th scope="col">Tipo mídia</th>
                            <th scope="col">Plataforma</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.lista.map(element => {
                                return(
                                    <tr>
                                    <th scope="row">{element.idMidia}</th>
                                    <p>{element.nome}</p>
                                    <p>{element.dataLancamento}</p>
                                    <p>{element.idCategoria}</p>
                                    <p>{element.sinopse}</p>
                                    <p>{element.duracao}</p>
                                    <p>{element.idTipoMidia}</p>
                                    <p>{element.idPlataforma}</p>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table> */}
                    <div id='caixinhas'>
                        {this.state.lista.map(element => {
                            return(
                            <div id='caixinha'>
                                <p id='titulo_caixinha'>{element.nome}</p>
                                <p>{element.dataLancamento}</p>
                                <p>{element.idCategoriaNavigation.nome}</p>
                                <p id='texto_caixinha'>{element.sinopse}</p>
                                <p>{element.duracao}</p>
                                <p>{element.idTipoMidiaNavigation.descricao}</p>
                                <p>{element.idPlataformaNavigation.nome}</p>
                            </div>
                            )
                        })}
                    </div>
                </div>
                <Rodape/>
            </div>
        )
    }
}

export default Lancamentosadm
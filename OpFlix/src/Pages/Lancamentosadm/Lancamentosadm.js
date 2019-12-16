import React, { Component } from 'react'
import logo from '../../img/logo.png';
import Rodape from '../../components/Rodape/Rodape'
import Axios from 'axios';
import { Link } from 'react-router-dom';
import { parseJwt } from '../../services/auth';
import './Lancamentosadm.css';

class Lancamentosadm extends Component {

    constructor() {
        super();
        this.state = {
            lista: [],
            nomeMidia: '',
            sinopse: '',
            tempoDuracao: '',
            dataLancamento: '',
            descricao: '',
            tipoMidia1: [],
            categoria: [],
            tipomidia: [],
            plataforma: [],
            plataformaSelecionada: '',
            categoriaSelecionado: '',
            tipoMidiaSelecionado: '',
            diretorSelecionado: '',
            idMidia: "",
            erro: "",
        };
    }

    getParsedNome(nome){
        nome = String(nome).replace('Ã¡', 'á');
        nome = String(nome).replace('Ã', 'í');
        return nome;
    }

    componentDidMount() {
        Axios.get('http://192.168.4.26:5000/api/categorias', {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('usuario-opflix')
            }
        })
            .then(data => {
                this.setState({ categoria: data.data });
            })
            .catch(erro => {
                console.log(erro);
            });
        Axios.get('http://192.168.4.26:5000/api/plataformas', {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('usuario-opflix')
            }
        })
            .then(data => {
                this.setState({ plataforma: data.data });
            })
            .catch(erro => {
                console.log(erro);
            });
        this.exibirLista();
    }

    exibirLista = () => {
        Axios.get('http://192.168.4.26:5000/api/midias', {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('usuario-opflix')
            }
        })
            .then(data => {
                this.setState({ lista: data.data });
            })
            .catch(erro => {
                console.log(erro);
            });
    }

    adicionarItem = (event) => {
        event.preventDefault();
        console.log('state', this.state);
        Axios.post('http://192.168.4.26:5000/api/midias', {
            Nome: this.state.nomeMidia,
            Sinopse: this.state.sinopse,
            Duracao: this.state.tempoDuracao,
            DataLancamento: this.state.dataLancamento,
            descricao: this.state.descricao,
            IdTipoMidia: this.state.tipoMidiaSelecionado,
            IdCategoria: this.state.categoriaSelecionada,
            IdPlataforma: this.state.plataformaSelecionada
        }, {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    Authorization: 'Bearer ' + localStorage.getItem('usuario-opflix')
                }
            })
            .then(response => { console.log(response) })
            .then(this.exibirLista())
            .catch(erro => {
                this.setState({ erro: "Não foi possível cadastrar" });
                console.log('error', erro);
            });
    }

    deletarMidia = (idMidia) => {
        // this.setState({ idMidia: element.idMidia });
        const USER_TOKEN = localStorage.getItem('usuario-opflix')
        const AuthStr = 'Bearer '.concat(USER_TOKEN)
        Axios.delete('http://192.168.4.26:5000/api/midias/' + idMidia,
        { headers: { Authorization: AuthStr } })
            .then(e => this.exibirLista())
            .catch(error => console.log(error))
    }

    atualizarNome = (event) => {
        this.setState({ nomeMidia: event.target.value })
        console.log(this.state);
    }
    atualizarSinopse = (event) => {
        this.setState({ sinopse: event.target.value })
        console.log(this.state);
    }
    atualizarTempoDuração = (event) => {
        this.setState({ tempoDuracao: event.target.value })
        console.log(this.state);
    }
    atualizarDataLancamento = (event) => {
        this.setState({ dataLancamento: event.target.value })
        console.log(this.state);
    }
    atualizarTipoMidia = (event) => {
        this.setState({ tipoMidiaSelecionado: event.target.value })
        console.log(this.state);
    }
    atalizarCategoria = (event) => {
        this.setState({ categoriaSelecionada: event.target.value })
        console.log(this.state)
    }
    atalizarPlataforma = (event) => {
        this.setState({ plataformaSelecionada: event.target.value })
        console.log(event.target.value)
    }


    render() {
        return (
            <div id='divona_lancamentosadm'>
                <div id='divinha_lancamentosadm'>
                    <div id='header_lancamentosadm'>
                        <Link to="/dashboard"><img src={logo} alt="" className="logo" /></Link>
                        <p id='p_adm'>Administrador - {this.getParsedNome(parseJwt().Nome)}</p>
                    </div>
                    <h1>Lançamentos</h1>
                    <table class="table">
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
                                return (
                                    <tr>
                                        <th scope="row">{element.idMidia}</th>
                                        <td>{element.nome}</td>
                                        <td>{element.dataLancamento}</td>
                                        <td>{element.idCategoria}</td>
                                        <td>{element.sinopse}</td>
                                        <td>{element.duracao}</td>
                                        <td>{element.idTipoMidia}</td>
                                        <td>{element.idPlataforma}</td>
                                        <td><button onClick={() => this.deletarMidia(element.idMidia)} type="submit" id="btn_delete">Deletar</button></td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </div>
                <div className="container" id="conteudoPrincipal-cadastro">
                    <h2 className="conteudoPrincipal-cadastro-titulo">
                        Cadastrar Lançamento
                    </h2>
                    <form action="">
                        <input type="text" placeholder="Titulo" onInput={this.atualizarNome}></input>
                        <input type="text" placeholder="Sinopse" onInput={this.atualizarSinopse}></input>
                        <input type="text" placeholder="Tempo de duração" onInput={this.atualizarTempoDuração}></input>
                        <input type="text" placeholder="Data de lançamento" onChange={this.atualizarDataLancamento} ></input>
                        <select onInput={this.atualizarTipoMidia} values={this.state.tipoMidiaSelecionado}>
                            <option selected>Tipo da mídia...</option>
                            <option value='3'>Série</option>
                            <option value='4'>Filme</option>
                        </select>
                        <select onInput={this.atalizarCategoria} value={this.state.categoriaSelecionada}>
                            <option selected>Categoria...</option>
                            {this.state.categoria.map(element => {
                                return (
                                    <option value={element.idCategoria}>{element.nome}</option>
                                )
                            })}
                        </select>
                        <select onChange={this.atalizarPlataforma} value={this.state.plataformaSelecionada}>
                            <option selected>Plataforma...</option>
                            {this.state.plataforma.map(element => {
                                return (
                                    <option value={element.idPlataforma}>{element.nome}</option>
                                )
                            })}
                        </select>
                        <button onClick={this.adicionarItem} id='btn_lancamentos'>Cadastrar</button>
                        {this.state.erro}
                    </form>
                </div>
                <Rodape />
            </div>
        )
    }
}

export default Lancamentosadm
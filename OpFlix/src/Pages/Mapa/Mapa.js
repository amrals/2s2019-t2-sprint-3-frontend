import React, { Component } from 'react';
import { Map, InfoWindow, Marker, GoogleApiWrapper } from 'google-maps-react';
import {Link} from 'react-router-dom';
import logo from    '../../img/logo.png';
import './Mapa.css';

class Localizacoes extends Component {

    constructor() {
        super();
        this.state = {
            Localizacoes: []
        }
    }
    
    pin = () => {
        let pin = [];
        this.state.Localizacoes.forEach(element => {
            pin.push(
                <Marker title={element.Nome} position={{ lat: element.latitude, lng: element.longitude }}/>
            )
        })
        return pin;
    }

    carregarLocalizacoes = () => {
        fetch("http://192.168.4.26:5000/api/localizacoes", {
          headers: {
            'Content-Type' : 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('usuario-opflix')
          }
        })
            .then(response => response.json())
            .then(data => this.setState({ Localizacoes: data }))
            .catch(error => console.log(error));
    }

    componentWillMount() {
        this.carregarLocalizacoes();
    }

    Sair = (event) => {
      localStorage.removeItem("usuario-opflix");
      this.props.history.push('/');
    }

    render() {
        return (
            <body style={{ width: '100%', height: '100vh'}}>
                <nav id='nav_cinemas'>
                  <ul id='nav_ul_cinemas'>
                      <li><Link to='/'><img src={logo} alt=""/></Link></li>
                      <li className='nav_ul_li_cinemas'><Link style={{fontSize: "2em"}} to='/mapa'>Cinemas</Link></li>
                      <li id='login_cinemas'><Link  to='/login'>Login</Link></li>
                  </ul>
                </nav>
                <Map google={this.props.google}
                    className={'map'}
                    zoom={12}
                    initialCenter={{
                        lat: -23.5299047,
                        lng: -46.753078
                    }}
                >
                    {this.pin()}
                </Map>
            </body>
        )
    }
}

export default GoogleApiWrapper({
    apiKey: ("AIzaSyBSzVh-P1he1vUWXeShZ1Q2M1sD8NGqONs")
})(Localizacoes)


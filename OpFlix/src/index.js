import {Route, Link, BrowserRouter as Router, Switch, Redirect} from 'react-router-dom';
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './Pages/Home/App';
import * as serviceWorker from './serviceWorker';
import { parseJwt } from './services/auth';

import Login from './Pages/Login/Login';
import Cadastro from './Pages/Cadastro/Cadastro';
import Dashboardadm from './Pages/Dashboardadm/Dashboardadm';
import Dashboardcomum from './Pages/Dashboardcomum/Dashboardcomum';
import Lancamentosadm from './Pages/Lancamentosadm/Lancamentosadm';
import Lancamentoscomum from './Pages/Lancamentoscomum/Lancamentoscomum';
import Categorias from './Pages/Categorias/Categorias';
import NaoEncontrado from './Pages/NaoEncontrado/NaoEncontrado';
import Usuarios from './Pages/Usuarios/Usuarios';

const RotaPrivada = ({ component: Component}) => (
    <Route
        render={
            props => 
                parseJwt().Permissao === "2" ? (
                    <Dashboardcomum {...props} />
                ) : (
                    <Dashboardadm {...props} />
                )
        }
    />
);

const RotaPrivada2 = ({ component: Component}) => (
    <Route
        render={
            props => 
                parseJwt().Permissao === "2" ? (
                    <Login {...props} />
                ) : (
                    <Lancamentosadm {...props} />
                )
        }
    />
);

const RotaPrivada3 = ({ component: Component}) => (
    <Route
        render={
            props => 
                parseJwt().Permissao === "2" ? (
                    <Login {...props} />
                ) : (
                    <Usuarios {...props} />
                )
        }
    />
);

const RotaPrivada4 = ({ component: Component}) => (
    <Route
        render={
            props => 
                parseJwt().Permissao === "2" ? (
                    <Login {...props} />
                ) : (
                    <Categorias {...props} />
                )
        }
    />
);

// const RotaPrivada = ({component: Component}) =>(
//     <Route
//         render={props =>
//             localStorage.getItem("usuario-opflix") !== null ? (
//                 <Component {...props} /> 
//             ) : (
//                 <Redirect 
//                     to={{ pathname: "/login", state: {from: props.location}}}
//                 />
//             )
//         }
//     />        
// );

const routing = (
    <Router>
        <div>
            <Switch>
                <Route exact path='/' component={App} />
                <Route path='/login' component={Login}/>
                <Route path='/cadastro' component={Cadastro}/>
                <RotaPrivada2 path='/lancamentosadm' component={Lancamentosadm}/>
                <RotaPrivada3 path='/usuarios' component={Usuarios}/>
                <RotaPrivada4 path='/categorias' component={Categorias}/>
                <Route path='/lancamentoscomum' component={Lancamentoscomum}></Route>
                <RotaPrivada path='/dashboard' component={Dashboardadm}/>
                <Route component={NaoEncontrado} />
                {/* <RotaPrivada path='/dashboardcomum' component={Dashboardcomum}/> */}
            </Switch>
        </div>
    </Router>
)

ReactDOM.render(routing, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

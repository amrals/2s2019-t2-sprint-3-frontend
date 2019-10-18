import React,{Component} from 'react';
import logo from    '../../img/logo.png';
import face from    '../../img/facebook.png';
import twitter from '../../img/twitter.png';
import insta from   '../../img/instagram.png';
import mulher from  '../../img/mulher.png';
import {Link} from 'react-router-dom';
import './App.css';

class App extends Component{
  

  render(){
    return (
      <div className='App'>
          <div className="nav">
              <nav>
                  <img src={logo} alt="" className="logo"/>
                  <ul className="nav justify-content-end">
                      <li className="nav-item">
                          <a className="nav-link active" href="#funcionalidades">Funcionalidades</a>
                      </li>
                      <li className="nav-item">
                          <a className="nav-link" href="#contato">Contato</a>
                      </li>
                      <li className="nav-item">
                          <Link className="nav-link" to='/login'>Login</Link>
                      </li>
                  </ul>
              </nav>
          </div>
          <section className="banner">
          </section>
          <section id="funcionalidades">
              <p>Nossa plataforma</p>
              <h2>Você, atualizado</h2>
              <div className="linha"></div>
              <div id="div_funcionalidades_flex">
                  <ul>
                      <li>
                          <h3>Novidade</h3>
                          <p>Mantenha-se atualizado sobre
                                  seus filmes e séries favoritas!</p>
                      </li>
                      <li>
                          <h3>Facilidade</h3>
                          <p>Acesse quando e onde estiver,
                                  até mesmo em seu celular.</p>
                      </li>
                      <li>
                          <h3>Organização</h3>
                          <p>Adicione suas mídias aos favoritos 
                                  para receber novidades sobre elas!</p>
                      </li>
                  </ul>
                  <img src={mulher} alt="" id="mulher"/>
              </div>
          </section>
          <section id="contato">
              <p>Fale conosco</p>
              <h2>Contato</h2>
              <div className="linha2"></div>
              <div id="redes_sociais">
                  <img src={twitter} alt=""/>
                  <img src={face} alt=""/>
                  <img src={insta} alt=""/>
              </div>
          </section>
          <section id="footer">
              <p>OpFlix® - 2019</p>
          </section>
          
      </div>
      
    );
  }
}

export default App;

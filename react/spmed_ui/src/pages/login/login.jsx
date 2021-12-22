import { Component } from "react";
import axios from "axios";

import "../../assets/css/estilo.css"

import bannerlogin from "../../assets/img/Frame5.png"
import logologin from "../../assets/img/Rectangle15.png"

import { parseJwt, usuarioAutenticado } from "../../sevices/auth"

export default class login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: 'adm@adm.com',
            senha: '11111111',
            erroMensagem: '',
            isLoading: false
        };
    }

    efetuarlogin = (evento) => {
        evento.preventDefault();
        this.setState({erroMensagem : '', isLoading : true })
        console.log(this.state.email + "+" + this.state.senha)


        axios.post("http://localhost:5000/api/Login", {
            email: this.state.email,
            senha: this.state.senha,
        })

        .then(response => {

           if (response.status === 200) {

                localStorage.setItem('usuario-login', response.data.token)
                
                console.log('Meu token é: ' + response.data.token)

                this.setState({ isLoading : true})

                let base64 = localStorage.getItem('usuario-login').split('.')[1];
                console.log(base64);

                if (parseJwt().role === '1') {
                    this.props.history.push('/consultasadm');
                    console.log('estou logado: ' + usuarioAutenticado());
                }
            }
        })

         .catch(() =>  {
               this.setState({erroMensagem : 'E-mail ou senha invalidos ', isLoading :false })
         })
    };



    atualizaState = (campo) => {
        this.setState({[campo.target.name]: campo.target.value});
    }

    render() {
        return (
            <div>
                <section className="BannerLogin">
                    <div className="imgLogin">
                        <img className="imgLogin" src={bannerlogin} alt="banner_login"></img>
                    </div>
                    <div className="containerLogin">
                        <div className="fundoLogin">
                            <div className="partLogin">
                                <img src={logologin} alt="logo_login"></img>
                            </div>
                            <div className="partLogin">
                                <p>Acesse sua conta</p>
                            </div>
                            <form onSubmit={this.efetuarlogin}>
                                <div className="partLogin">
                                    <input 
                                    className="inputsLogin" 
                                    placeholder="E-mail" 
                                    type="text" 
                                    name="Username"
                                    value={this.state.email}
                                    onChange={this.atualizaState}></input>
                                </div>
                                <div className="partLogin">
                                    <input 
                                    className="inputsLogin" 
                                    placeholder="Senha" 
                                    type="password" 
                                    name="password"
                                    value={this.state.senha}
                                    onChange={this.atualizaState}></input>
                                </div>


                                <p style={{color : 'red'}}>{this.state.erroMensagem}</p>


                                {
                                    //caso isloading seja true, renderiza o botão desabilitando com o texto 'loaidng...'
                                     
                                    this.state.isLoading === true &&
                                    <button type="submit" disabled>Loading...</button>
                                } 

                                {

                                 //caso is loaging seja false, renderizar o botão habilitado com o texto 'login'

                                 <div className="partLogin">
                                    <button type="submit" disabled={
                                        this.state.email === '' || this.state.senha === '' ? 'none' : '' } className="botaoLogin" id="btn_Login">Login</button>
                                 </div>
                                }
                            </form>
                        </div>
                    </div>

                </section>
            </div>
        )
    }
}
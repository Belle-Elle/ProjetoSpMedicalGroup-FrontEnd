import axios from "axios";
import { Component } from "react";
import "../../assets/css/estilo.css"
import bannerlogin from "../../assets/img/Frame5.png"
import logologin from "../../assets/img/Rectangle15.png"

export default class login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            senha: '',
            erroMensagem: ''
            // isLoading: false
        };
    }

    efetuarlogin = () => {
        this.setState({erroMensagem : '', isLoading : true })


        axios.post("http://localhost:5000/api/Login", {
            email: this.state.email,
            senha: this.state.senha,
        })

        .then(response => {

           if (response.status === 200) {

                localStorage.setItem('usuario-login', response.data.token)
                
                console.log('Meu token é: ' + response.data.token)
            }
        })

        .catch(() =>  {
              this.setState({erroMensagem : 'E-mail ou senha invalidos ' })
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
                        <img className="imgLogin" src={bannerlogin}></img>
                    </div>
                    <div className="containerLogin">
                        <div className="fundoLogin">
                            <div className="partLogin">
                                <img src={logologin}></img>
                            </div>
                            <div className="partLogin">
                                <p>Acesse sua conta</p>
                            </div>
                            <form >
                                <div className="partLogin">
                                    <input className="inputsLogin" placeholder="E-mail" type="text" name="Username"></input>
                                </div>
                                <div className="partLogin">
                                    <input className="inputsLogin" placeholder="Senha" type="password" name="password"></input>
                                </div>

                                <p style={{color : 'red'}}>{this.state.erroMensagem}</p>

                                <div className="partLogin">
                                    <button className="botaoLogin" id="btn_Login">Login</button>
                                </div>
                            </form>
                        </div>
                    </div>

                </section>
            </div>
        )
    }
}
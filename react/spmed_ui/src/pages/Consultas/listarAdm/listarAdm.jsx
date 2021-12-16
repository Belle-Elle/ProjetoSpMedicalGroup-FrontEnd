import { Component } from "react";
import axios from 'axios';

import '../../../assets/css/estilo.css'

export default class consultasAdm extends Component {
    constructor(props){
        super(props);
        this.state = {
            idMedico: 0,
            idPaciente: 0,
            idConsulta: 0,
            idSituacao: 0,
            descrica: '',
            dataConsulta: new Date(),


            listaConsulta: [],
            listaPaciente: [],
            listaMedicos: [],

            isLoading: false,
            erroMensagem: '',

        };
    }


   buscarConsulta=() => {
       axios('http://localhost:5000/api/Consultas', {
           headers: {
               authorization: 'Bearer ' + localStorage.getItem('usuario-login'),
           }
       }).then((response)=> {
           if (response.status === 200) {

            console.log(response.data)
            this.setState({ listaConsulta: response.data });
            console.log(this.state.listaConsulta);
           }
       }).catch(erro=> console.log(erro))
   }


   componentDidMount(){
       this.buscarConsulta();
   }

    render() {
        return (
            <div>
                <main>
                    <section className="containerTudo" >
                        <div className="containerCadastroLista" >

                            <div>
                                <h2>Cadastrar Consulta</h2>
                            </div>
                            <div>
                                <h2>Lista Consultas</h2>
                            </div>
                        </div>

                        <section className="inputsTabela  containerCadastroLista">
                            <div >
                                <form>
                                    <div className="partLogin">
                                        <input className="inputsLogin" placeholder="Nome do Paciente" type="text" ></input>
                                    </div>
                                    <div className="partLogin">
                                        <input className="inputsLogin" placeholder="Nome do Médico" type="text" ></input>
                                    </div>
                                    <div className="partLogin">
                                        <input className="inputsLogin" placeholder="Data" type="datetime-local" ></input>
                                    </div>
                                    <div>
                                        <button className="btnCadastrar partLogin botaoCadastrar " id="btnCadastrar">Cadastrar</button>
                                    </div>
                                </form>
                            </div>
                            <div className="listagem">
                                <ul id="tabelaListagem">
                                    <li>Paciente</li>s
                                    <li>Médico</li>
                                    <li>Descrição</li>
                                    <li>Situação</li>
                                    <li>Data</li>
                                </ul>
                            </div>
                        </section>


                    </section>
                </main>
            </div>
        )
    }
}
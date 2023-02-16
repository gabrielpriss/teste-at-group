import axios from "axios";
import React from "react";
import checkTrueDate from "../utils/checkTrueDate";
import { Link, useNavigate } from "react-router-dom";
export default class Register extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            nome: '',
            email: "",
            senha: "",
            senha2: "",
            avatar: "",
            data_nascimento: "",
            errorMessage: "",
            submitedMessage: ""
        };
        this.checkTrueDate = this.checkTrueDate.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.routeChange = this.routeChange.bind(this);
    }

    checkTrueDate = (data_nascimento) => {
        const message = checkTrueDate(data_nascimento);
        if (message === true) {
            return true
        } else { return message }
    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;

        this.setState({ [name]: value });
    }

    routeChange = () => {
        const history = useNavigate();
        let path = `/`;
        history(path);
    }

    handleSubmit = async () => {
        const { nome, email, senha, senha2, avatar, data_nascimento } = this.state;
        if (nome === "" || email === "" || senha === "" || data_nascimento === "") {
            this.setState({ errorMessage: 'Preencha todos os campos' });
            return;
        }
        if (senha !== senha2) {
            this.setState({ errorMessage: 'As senhas não coincidem' });
            return;
        }
        let re = /\S+@\S+\.\S+/;
        let valido = re.test(email);
        if (valido !== true) {
            this.setState({ errorMessage: 'Digite um email válido' });
            return;
        }
        const valid = checkTrueDate(this.state.data_nascimento)
        if (valid === true) {
            this.setState({ submitedMessage: 'Registrado' });
            this.setState({ errorMessage: '' });
            await axios.post(`http://localhost:3001/user/`, { "nome": nome, "email": email, "senha": senha, "avatar": avatar, "data_nascimento": data_nascimento });
        } else {
            this.setState({ errorMessage: valid })
            return;
        }
    }

    render() {
        return (
            <div className='form'>
                <h1>Cadastro de Usuário</h1>
                <Link to='/login'>
                    <b>Voltar</b>
                </Link>
                <form
                // onSubmit={this.handleSubmit}
                >
                    <label>
                        <b>Nome</b>
                        <br />
                        <input name="nome" placeholder="Digite seu Nome" onChange={this.handleInputChange} value={this.state.nome} type='text'></input>
                        <br />
                        <b>Email</b>
                        <br />
                        <input name="email" placeholder="Digite seu Email" onChange={this.handleInputChange} value={this.state.email} type='text'></input>
                        <br />
                        <b>Senha</b>
                        <br />
                        <input name="senha" placeholder="Digite sua Senha" onChange={this.handleInputChange} value={this.state.senha} type='password'></input>
                        <br />
                        <b>Confirme sua senha</b>
                        <br />
                        <input name="senha2" placeholder="Confirme sua senha" onChange={this.handleInputChange} value={this.state.senha2} type='password'></input>
                        <br />
                        <b>Data de Nascimento</b>
                        <br />
                        <input className="input" name="data_nascimento" onChange={this.handleInputChange} value={this.state.data_nascimento} type='date'></input>
                        <br />
                    </label>
                </form>
                <br />
                <button className="button" onClick={this.handleSubmit}>
                    Registrar
                </button>
                {this.state.errorMessage !== '' ?
                    <p className="red">{this.state.errorMessage}</p>
                    : null}
                {this.state.submitedMessage !== '' ?
                    <div>
                        <p className="green">
                            Usuário criado, volte à tela de login.
                        </p>
                        <Link className="voltar" to='/login'>
                            <b>Voltar</b>
                        </Link>
                    </ div>
                    : null}
            </div>
        );
    }
}
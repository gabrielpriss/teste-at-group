import React from 'react';
import { Navigate } from 'react-router-dom';
import axios from 'axios';
import { Link } from 'react-router-dom';

export default class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            senha: "",
            errorMessage: "",
            submitedMessage: ""
        };
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;

        this.setState({ [name]: value });
    }

    handleSubmit = async () => {
        const { email, senha } = this.state;
        if (email === "" || senha === "") {
            { this.setState({ errorMessage: 'Preencha todos os campos' }) };
            return;
        }
        let re = /\S+@\S+\.\S+/;
        let valido = re.test(email);
        if (valido != true) {
            { this.setState({ errorMessage: 'Digite um email válido' }) };
            return;
        }
        let errorr = '';
        await axios.post(`http://localhost:3001/user/login`, { "email": email, "senha": senha })
            .then((response) => {
                if (response.status === 200) {
                    this.setState({ isSignedUp: true });
                }
            })
            .catch(error => {
                console.log(error.response)
            });
        this.setState({ errorMessage: 'Email ou senha inválidos' })

    // if (valid === true) {
    //     this.setState({ submitedMessage: 'Registrado' });
    //     this.setState({ errorMessage: '' });
    //     await axios.post(`http://localhost:3001/user/`, { "nome": nome, "email": email, "senha": senha, "avatar": avatar, "data_nascimento": data_nascimento });
    // } else {
    //     { this.setState({ errorMessage: valid }) }
    //     return;
    // }
}
render() {
    if (this.state.isSignedUp) {
        // redirect to home if signed up
        return <Navigate to={{ pathname: "/home" }} />;
    }
    return (
        <div>
            <h1 className='Title'>Teste At.Group Backend</h1>
            <h2 className='Title'>Login</h2>
            <form
            // onSubmit={this.handleSubmit}
            >
                <label>
                    <b>Email</b>
                    <br />
                    <input name="email" placeholder="Digite seu Email" onChange={this.handleInputChange} value={this.state.email} type='text'></input>
                    <br />
                    <b>Senha</b>
                    <br />
                    <input name="senha" placeholder="Digite sua Senha" onChange={this.handleInputChange} value={this.state.senha} type='password'></input>
                    <br />
                    <p>Ainda não tem cadastro?</p>
                    <Link className='Title' to='/register'><h2>Se cadastrar</h2></Link>
                </label>
            </form>
            <button className="button" onClick={this.handleSubmit}>
                Logar
            </button>
            {this.state.errorMessage !== '' ?
                <p className="red">{this.state.errorMessage}</p>
                : null}
            {this.state.submitedMessage !== '' ?
                <div>
                    <p className="green">
                        Usuário logado.
                    </p>
                </ div>
                : null}
        </div >
    );
}
}
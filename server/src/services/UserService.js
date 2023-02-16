const UserModel = require('../models/UserModel');
const connection = require('../models/connection');

const getNewUserId = (userData) => {
    const { nome, email, senha, avatar, data_de_nascimento, ativo } = userData;
    return { nome, email, senha, avatar, data_de_nascimento, ativo };
};

const getAll = async () => {
    const users = await UserModel.getAll();
    return users.map(getNewUserId);
};

const findById = async (user_id) => {
    try {
        const user = await UserModel.findById(user_id);
        if (!user || user.length === 0) return { message: 'Usuário não encontrado' };
        return (user);
    } catch (e) {
        console.log(e);
        return null;
    }
};

const logIn = async (user) => {
    const { email, senha } = user;
    console.log(email, senha, 'service');
    try {
        const getUser = await UserModel.findByEmail(email);
        if (!getUser || getUser.length === 0 ) return { message: 'Usuário não encontrado' };
        else if (senha != getUser.senha) return { message: 'Senha inválida' };
        return (user);
    } catch (e) {
        console.log(e);
        return null;
    }
};

const createUser = async (nome, email, senha, avatar, data_nascimento) => {
    const [results] = await connection.execute(
        'SELECT * FROM teste_at_group.users WHERE email = ?;',
        [email],
    );
    if (results.length !== 0) return ({"message": 'Usuário já existente'});
    const user = await UserModel.createUser(nome, email, senha, avatar, data_nascimento);
    return getNewUserId({
        id: user.id,
        nome: user.nome,
        senha: user.senha,
        avatar: user.avatar,
        data_de_nascimento: user.data_nascimento,
        ativo: user.ativo,
    });
};

const update = async (user) => {
    console.log(user);
    const { id } = user;
    const user1 = await UserModel.findById(id);
    if (!user1 || user1.length === 0) return { message: 'Usuário não encontrado' };
    const updatedUser = await UserModel.update(user);
    if (updatedUser.affectRows === 0) {
        return null;
    }
    return { ...user, id };
};


const exclude = async (id) => {
    const user = await UserModel.exclude(id);
    return user;
}

module.exports = {
    getAll,
    findById,
    update,
    exclude,
    createUser,
    logIn
};
const UserService = require('../services/UserService');

const getAll = async (_req, res, _next) => {
    try {
        const users = await UserService.getAll();
        return res.status(200).json(users);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'Algo deu errado' });
    }
};

const findById = async (req, res, _next) => {
    try {
        const user = await UserService.findById(req.params.id);
        if (user.message) return res.status(404).json(user);
        return res.status(200).json(user);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'Algo deu errado' });
    }
};

const logIn = async (req, res, _next) => {
    const user = req.body;
    console.log(user, 'controller');
    try {
        const getUser = await UserService.logIn(user);
        if (getUser.message) return res.status(401).json(getUser);
        return res.status(200).json(user);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'Algo deu errado' });
    }
};

const createUser = async (req, res, _next) => {
    const { nome, email, senha, avatar, data_nascimento } = req.body;
    try {
        const newUser = await UserService.createUser(nome, email, senha, avatar, data_nascimento);
        if (newUser.message) return res.status(409).json(newUser.message);
        return res.status(201).json({ "message": "Criado com Sucesso" });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: 'Algo deu errado',
        });
    }
};

const updateUser = async (req, res, _next) => {
    const { id } = req.params;
    const { nome, email, senha, avatar, data_nascimento, ativo } = req.body;
    try {
        const user = await UserService.update({
            id,
            nome, email, senha, avatar, data_nascimento, ativo
        });
        if (user.message) return res.status(404).json(user);
        return res.status(200).json(user);
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: 'Algo deu errado',
        });
    }
};

const deleteUser = async (req, res, _next) => {
    const user1 = await UserService.findById(req.params.id);
    if (user1.message) {
        return res.status(404).json({
            message: 'User not found',
        });
    }
    try {
        const user = await UserService.exclude(req.params.id);
        return res.status(204).json(user);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'Algo deu erro' });
    }
};

module.exports = {
    getAll,
    findById,
    createUser,
    updateUser,
    logIn,
    deleteUser
};
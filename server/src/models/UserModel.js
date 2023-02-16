const connection = require('./connection');

const getAll = async () => {
    const [users] = await connection.execute(
        'SELECT * FROM teste_at_group.users WHERE ativo = 1',
    );
    return (users);
};

const findById = async (id) => {
    const query = 'SELECT * FROM teste_at_group.users WHERE id = ? AND ativo = 1';

    const [result] = await connection.execute(query, [id]);

    if (!result.length) return null;
    return (result[0]);
};

const findByEmail = async (email) => {
    console.log(email);
    const query = 'SELECT email, senha FROM teste_at_group.users WHERE email = ? AND ativo = 1';

    const [result] = await connection.execute(query, [email]);
    console.log(result);

    if (!result.length) return null;
    return (result[0]);
};

const update = async (user) => {
    console.log(user);
    const { nome, email, senha, avatar, data_nascimento, ativo, id } = user;
    const [result] = await connection.execute(
        `UPDATE teste_at_group.users SET nome = ?, email = ?,
        senha = ?, avatar = ?, data_nascimento = ?, ativo = ? WHERE id = ?`, [nome, email, senha, avatar, data_nascimento, ativo, id],
    );
    return result;
};


const createUser = async (nome, email, senha, avatar, data_nascimento) => {
    console.log(nome, email, senha, avatar, data_nascimento);
    const ativo = true;
    const [result] = await connection.execute(
        'INSERT INTO teste_at_group.users (nome, email, senha, avatar, data_nascimento, ativo) VALUES (?,?,?,?,?,?);',
        [nome, email, senha, avatar, data_nascimento, ativo],
    );
    const id = result.insertId;
    return {
        id,
        nome,
         email,
          senha,
           avatar,
           data_nascimento
    };
};

const exclude = async (id) => {
    const user = await findById(id);
    if (!user) return null;
    await connection.execute('UPDATE teste_at_group.users SET ativo = 0 WHERE id = ?', [id]);
    return user;
};

module.exports = {
    getAll,
    findById,
    createUser,
    update,
    findByEmail,
    exclude,
};

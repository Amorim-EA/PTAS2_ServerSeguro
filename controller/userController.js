const User = require('../models/user');
const secret = process.env.SECRET;
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const createUser = async (req, res) => {
    try {
        const { name, password, email } = req.body;
        const passwdCrypt = await bcrypt.hash(password, 10);
        await User.create({
            name: name,
            password: passwdCrypt,
            email: email
        });

        console.log({ message: 'Cadastro de usuário realizado com sucesso!' });
        return res.json({ message: 'Cadastro de usuário realizado com sucesso!' });

    } catch (error) {
        console.log({ message: `Erro ao cadastrar: ${error}` });
        return res.status(404).json({ message: 'Ocorreu um erro ao cadastrar usuário!'} );

    };
}

const findAllUser = async (req, res) => {
    try {
        const user = await User.findAll();
        res.json(user);
    } catch (error) {
        console.log({ message: `Erro ao buscar todos: ${error}` });
        return res.status(404).json({ message: 'Ocorreu um erro ao buscar todos usuários!' });
    }
}

const findOneUser = async (req, res) => {
    try {
        const id = req.body.id;
        const user = await User.findOne({
            where: {
                id: id
            }
        });

        return res.json(user);

    } catch (error) {
        console.log({ message: `Erro ao buscar um: ${error}` });
        return res.status(404).json({ message: 'Ocorreu um erro ao buscar um usuário!' });

    };
}

const deleteUser = async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        await User.destroy({
            where: {
                id: id
            }
        });

        res.json({ message: 'Usuário apagado com sucesso!' });
        console.log({ message: 'Usuário apagado com sucesso!' });
        
    } catch (error) {
        console.log({ message: `Erro ao deletar: ${error}` });
        return res.status(404).json({ message: 'Ocorreu um erro ao deletar usuário!' });
    };
}

const updateUser = async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const { name, password, email } = req.body;
        const passwdCrypt = await bcrypt.hash(password, 10);
        await User.update({
            name: name,
            password: passwdCrypt,
            email: email
        },{
            where: {
                id: id
            }
        });

        res.json({ message: 'Usuário atualizado com sucesso!' });
        console.log({ message: 'Usuário atualizado com sucesso!' });
        
    } catch (error) {
        console.log({ message: `Erro ao atualizar: ${error}` });
        return res.status(404).json({ message: 'Ocorreu um erro ao atualizar usuário!' });
        
    };
}


const authenticatedUser = async (req, res) => {
    try{
        const { email, password } = req.body;
        const isAuthenticated =  await User.findOne({
            where: {
                email: email
            }
        });
        
        const isPwdValid = await bcrypt.compare(password, isAuthenticated.password);
        
        if(isPwdValid){
            const token = jwt.sign({ id: email }, secret, { expiresIn: 86400 });
            res.cookie('token', token, { httpOnly: true }).json({
                name: isAuthenticated.name,
                email: isAuthenticated.email,
                token: token
            });
            console.log({ message: 'Usuario autenticado com sucesso' });
        }
    } catch (error) {
        console.log({ message: 'Usuario nao encontrado ou senha incorreta!' });
        res.status(401).json({ message: 'Usuario nao encontrado ou senha incorreta!' });
    };
}

module.exports = { createUser, findAllUser, findOneUser, deleteUser, updateUser, authenticatedUser };
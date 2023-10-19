const User = require('../models/user');
const secret = require('../config/auth.json');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const createUser = async (req, res) => {
    try {
        const { name, password, email } = req.body;
        const passwdCrypt = await bcrypt.hash(password, 15);
        await User.create({
            name: name,
            password: passwdCrypt,
            email: email
        });

        console.log('Cadastro de usuário realizado com sucesso!');
        return res.json('Cadastro de usuário realizado com sucesso!');

    } catch (error) {
        console.log(`Erro ao cadastrar: ${error}`);
        return res.status(404).json("Ocorreu um erro ao cadastrar usuário!");

    };
}

const findAllUser = async (req, res) => {
    try {
        const user = await User.findAll();
        res.json(user);
    } catch (error) {
        console.log(`Erro ao buscar todos: ${error}`);
        return res.status(404).json("Ocorreu um erro ao buscar todos usuários!");
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
        console.log(`Erro ao buscar um: ${error}`);
        return res.status(404).json("Ocorreu um erro ao buscar um usuário!");

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

        res.json('Usuário apagado com sucesso!');
        console.log('Usuário apagado com sucesso!');
        
    } catch (error) {
        console.log(`Erro ao deletar: ${error}`);
        return res.status(404).json("Ocorreu um erro ao deletar usuário!");
    };
}

const updateUser = async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const { name, password, email } = req.body;
        const passwdCrypt = await bcrypt.hash(password, 15);
        await User.update({
            name: name,
            password: passwdCrypt,
            email: email
        },{
            where: {
                id: id
            } 
        });

        res.json('Usuário atualizado com sucesso!');
        console.log('Usuário atualizado com sucesso!');
        
    } catch (error) {
        console.log(`Erro ao atualizar: ${error}`);
        return res.status(404).json("Ocorreu um erro ao atualizar usuário!");

    };
}


const authenticatedUser = async (req, res) => {
    try{
        const { email, password } = req.body;
        const isAuthenticated =  await User.findOne({
            where: {
                email: email,
                password: password
            }
        });

        const response = await bcrypt.compare(password, isAuthenticated.password);

        if(response){
            const token = jwt.sign({
                id: email
    
            }, secret.secret, {
                expiresIn: 86400,
    
            });
            
            return res.json({
                name: isAuthenticated.name,
                email: isAuthenticated.email,
                token: token
            });
        }
    } catch (error) {
        console.log(`Erro ao autenticar: ${error}`);
        return res.status(404).json("Ocorreu um erro autenticar usuário!");

    };
}

module.exports = { createUser, findAllUser, findOneUser, deleteUser, updateUser, authenticatedUser };

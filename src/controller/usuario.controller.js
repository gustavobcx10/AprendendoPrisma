const prisma = require("../data/prisma.js");

// LISTAR
const listar = async (req, res) => {
    try {
        const lista = await prisma.usuario.findMany();
        return res.status(200).json(lista);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ erro: "Erro ao listar usuários" });
    }
};

// CADASTRAR
const cadastrar = async (req, res) => {
    try {
        const data = req.body;
        const {senha, email, nome, idade} = req.body
        const item = await prisma.usuario.create({
            data
        });

        return res.status(201).json(item);

    } catch (error) {
        console.error(error);
        return res.status(500).json({ erro: "Erro ao cadastrar usuário" });
    }
};

// BUSCAR POR ID
const buscarPorId = async (req, res) => {
    try {
        const usuario = await prisma.usuario.findUnique({
            where: {
                id: Number(req.params.id),
            },
        });

        if (!usuario) {
            return res.status(404).json({ error: "Usuário não encontrado" });
        }

        return res.status(200).json(usuario);

    } catch (error) {
        console.error(error);
        return res.status(500).json({ erro: "Erro ao buscar usuário" });
    }
};

// ATUALIZAR
const atualizar = async (req, res) => {
    try {
        const { id } = req.params;
        const { nome, senha, email, idade } = req.body;

        const usuario = await prisma.usuario.update({
            where: {
                id: Number(id),
            },
            data: {
                nome,
                senha,
                email,
                idade,
            },
        });

        return res.status(200).json(usuario);

    } catch (error) {
        console.error(error);

        // erro comum do Prisma quando não encontra registro
        if (error.code === "P2025") {
            return res.status(404).json({ erro: "Usuário não encontrado" });
        }

        return res.status(500).json({ erro: "Erro ao atualizar usuário" });
    }
};

// DELETAR
const deletar = async (req, res) => {
    try {
        const usuario = await prisma.usuario.delete({
            where: {
                id: Number(req.params.id),
            },
        });

        return res.status(200).json(usuario);

    } catch (error) {
        console.error(error);

        if (error.code === "P2025") {
            return res.status(404).json({ erro: "Usuário não encontrado" });
        }

        return res.status(500).json({ erro: "Erro ao deletar usuário" });
    }
};

module.exports = {
    listar,
    cadastrar,
    buscarPorId,
    atualizar,
    deletar
};
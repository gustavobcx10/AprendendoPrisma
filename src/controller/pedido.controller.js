const prisma = require("../data/prisma.js");

// LISTAR TODOS OS PEDIDOS
const listarPedidos = async (req, res) => {
    try {
        const pedidos = await prisma.pedido.findMany({
            include: {
                usuario: true
            }
        });

        return res.status(200).json(pedidos);
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            erro: "Erro ao listar pedidos"
        });
    }
};



// CADASTRAR PEDIDO
const cadastrarPedido = async (req, res) => {
    try {
        const { produto, usuarioId } = req.body;

        if (!produto || !usuarioId) {
            return res.status(400).json({
                erro: "produto e usuarioId são obrigatórios"
            });
        }

        const pedido = await prisma.pedido.create({
            data: {
                produto,
                usuarioId: Number(usuarioId)
            },
            include: {
                usuario: true
            }
        });

        return res.status(201).json(pedido);
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            erro: "Erro ao cadastrar pedido"
        });
    }
};



// BUSCAR PEDIDO POR ID
const buscarPedidoPorId = async (req, res) => {
    try {
        const { id } = req.params;

        const pedido = await prisma.pedido.findUnique({
            where: {
                id: Number(id)
            },
            include: {
                usuario: true
            }
        });

        if (!pedido) {
            return res.status(404).json({
                erro: "Pedido não encontrado"
            });
        }

        return res.status(200).json(pedido);
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            erro: "Erro ao buscar pedido"
        });
    }
};



// ATUALIZAR PEDIDO
const atualizarPedido = async (req, res) => {
    try {
        const { id } = req.params;
        const { produto, usuarioId } = req.body;

        const pedidoExiste = await prisma.pedido.findUnique({
            where: {
                id: Number(id)
            }
        });

        if (!pedidoExiste) {
            return res.status(404).json({
                erro: "Pedido não encontrado"
            });
        }

        const pedido = await prisma.pedido.update({
            where: {
                id: Number(id)
            },
            data: {
                produto,
                usuarioId: usuarioId ? Number(usuarioId) : undefined
            },
            include: {
                usuario: true
            }
        });

        return res.status(200).json(pedido);
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            erro: "Erro ao atualizar pedido"
        });
    }
};



// DELETAR PEDIDO
const deletarPedido = async (req, res) => {
    try {
        const { id } = req.params;

        const pedidoExiste = await prisma.pedido.findUnique({
            where: {
                id: Number(id)
            }
        });

        if (!pedidoExiste) {
            return res.status(404).json({
                erro: "Pedido não encontrado"
            });
        }

        await prisma.pedido.delete({
            where: {
                id: Number(id)
            }
        });

        return res.status(200).json({
            msg: "Pedido deletado com sucesso"
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            erro: "Erro ao deletar pedido"
        });
    }
};

module.exports = {
    listarPedidos,
    cadastrarPedido,
    buscarPedidoPorId,
    atualizarPedido,
    deletarPedido
};
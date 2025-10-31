const { PrismaClient } = require("@prisma/client");
const client = new PrismaClient()

class MesaController {
  static async cadastrar(req, res) {
    try {
      const { codigo, n_lugares } = req.body

      const mesa = await client.mesa.create({
        data: {
          codigo,
          n_lugares
        }
      })
      res.json({
        mensagem: "Exito ao cadastrar!",
        erro: false,
      });
    } catch (err) {
      res.json({
        mensagem: "Erro ao cadastrar, código ja existente",
        erro: true,
        mensademDeErro: err
      })
    }
  }
   static async buscarMesas(req, res) {
    try {
      const procurarMesas = await client.mesa.findMany({})
      res.json({
        mensagem: "Mesas Buscadas com sucesso",
        erro: false,
        mesas: procurarMesas
      })
    } catch (err) {
      res.json({
        mensagem: "Mesas não encontradas",
        erro: true,
        mensademDeErro: err
      })
    }
  }
}


module.exports = MesaController;
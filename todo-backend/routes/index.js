var express = require('express');
var router = express.Router();
const db = require('../dao/todo-db');
const helpers = require('../helpers/functions');
//rota para listar 
router.get('/tarefas/listar',async(req,res)=>{
 try {
  const registros = await db.listar();
  res.status(200).json(registros)
 } catch (erro) {
    console.error(erro);
    res.status(500).json({mensagem: "Erro ao listar os registros"});
 }

});
// rota para inserir uma tarefa na collection
router.post('/tarefas/adicionar', async(req,res)=>{
 const tarefa = req.body;
 //validamos titulo e data pois a descrição é opcional
 if(helpers.validaForm(tarefa)){
   try{
      await db.adcionar(tarefa) ? res.status(200).json({mensagem: "Tarefas adicionada com sucesso"}) : res.status(500).json({mensagem: "Erro ao adicinar tarefas."});
   } catch(erro){
      console.error(erro);
      res.status(500).json({mensagem: "Erro ao adicionar tarefa"});
   }
 }else{
   res.status(400).json({mensagem: "Dados incompletos enviados na requisição"});
 } 
});

//rota delete 
router.delete('/tarefas/remover/:id',async(req,res)=>{
   const id = req.params.id;
   try {
      await db.remover(id) ? res.status(200).json({mensagem: "Registro excluido com Sucesso"}) : res.status(200).json({mensagem: "Resgistro não encontrado para a remoção"});
   } catch (erro) {
    console.error(erro);
    res.status(500).json({mensagem: "Erro ao remover o registro"});  
   }
});
//rota para listar uma tarefa por id
router.get('/tarefas/buscar/:id',async(req,res)=>{
   const id = req.params.id;
   try {
      const tarefa = await db.bunscarPorId(id);
      res.status(200).json(tarefa);
   } catch (erro) {
      console.error(erro);
      res.status(500).json({mensagem: "Erro as buscar tarefa"});
   }
});

//rota editar
router.put('/tarefas/editar/:id',async(req,res)=>{
const id = req.params.id;
const tarefa = req.body;
if(helpers.validaForm(tarefa)){
try {
   await db.editar(id,tarefa) ? res.status(200).json({mensagem: "Tarefa alterada com sucesso"}) : res.status(200).json({mensagem: "Tarefa não alterada ou não encontrada para edição"});
} catch (erro) {
   console.error(erro);
res.status(500).json({mensagem: "Erro ao alterar tarefa"});
}
}else{
   res.status(400).json({mensagem: "Dados incompletos enviados na requisição."});
}
});   



//nunca apaque
module.exports = router;

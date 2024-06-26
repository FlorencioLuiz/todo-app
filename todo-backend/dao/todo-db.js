const {MongoClient, ObjectId} = require('mongodb');
const { compile } = require('morgan');

//paramentros de conexão
const URL = "mongodb://127.0.0.1:27017";
const DB_NAME = "todo";
const COLLECTION_NAME = "tarefas" ;
let conexao = null;

async function conectar(){
    if(conexao) return conexao;

    try {
        const client = new MongoClient(URL);
       await client.connect();//await - espera assincrona
       conexao = client.db(DB_NAME);
       return conexao
    } catch (erro) {
        console.error(erro);
    }
}


async function listar(){
    try {
        const db = await conectar();
        return await db.collection(COLLECTION_NAME).find().toArray();      
        
    } catch (erro) {
        throw new Error(erro);
    }

}

async function adcionar(tarefa){
    try {
        const db = await conectar();
        const resp = await db.collection(COLLECTION_NAME).insertOne(tarefa);
        if(resp.acknowledged) return true;
        return false;
    } catch (erro) {
        throw new Error(erro);
    }
}

async function remover(id){
    try {
        const db = await conectar();
        const resp = await db.collection(COLLECTION_NAME).deleteOne({_id: ObjectId.createFromHexString(id)});
        return resp.deletedCount > 0 ? true : false;
    } catch (erro) {
        throw new Error(erro); 
    }
}

async function bunscarPorId(id){
    try {
        const db = await conectar();
        return await db.collection(COLLECTION_NAME).findOne({_id : ObjectId.createFromHexString(id)});
    } catch (erro) {
        throw new Error(erro);  
    }
}

async function editar(id, dadosTarefas){
    try {
        const db = await conectar();
        const resp = await db.collection(COLLECTION_NAME).updateOne({_id : ObjectId.createFromHexString(id)},{$set : dadosTarefas});
        return resp.modifiedCount > 0 ? true : false;
        
    } catch (erro) {
        throw new Error(erro);
    }
}
//para exportar o módulo para uso
module.exports = { adcionar, bunscarPorId, editar, listar, remover }
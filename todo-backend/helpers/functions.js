const moment = require('moment');

function validaData(dateString){
    return moment(dateString,"YYYY-MM-DD HH:mm", true).isValid();
}

function validaForm(tarefa){
    if(tarefa.titulo !== undefined && tarefa.titulo && tarefa.descricao !== undefined && tarefa.data !== undefined && validaData(tarefa.data)){ return true;
        
}else{
    return false;
}
}

module.exports = { validaForm }
module.exports = (app)=>{
    //abrir o arquivo Login.js
    app.get('/login',(req,res)=>{
        res.render('login.ejs')
    })

    //validar o usuário e senha
    app.post('/login',async(req,res)=>{
        //recuperar as informações digitadas no formulário
        var dados = req.body
        //conectar com o banco de dados
        var database = require('../config/database')()
        //selecioar a modl usuarios
        var usuarios = require('../models/usuarios')
        //verificar se o email esta cadastrado
        var verificar = await usuarios.findOne(
            {email:dados.email})
            if(!verificar){
                return res.send("Email não cadastrado")
            }
            var cript = require("bcryptjs")
            var comparar = await cript.compare(dados.senha,verificar.senha)
            if(!comparar){
                return res.send("Senha Inválida")
            }
            res.render("Atividades.ejs")

    })
}
// Dependencias 

const express = require('express')
const app = express()
const mysql = require('mysql')
const cors = require('cors')

app.use(express.json())
app.use(cors())

// Ligar o server e checar se está rodando localhost:3002 

app.listen(3002, ()=>{
    console.log('Server está rodando na porta 3002')
})

// Database (mysql)

const db = mysql.createConnection({
    user: 'gotinha',
    host: 'db-ama.ckt5jcrbb6lw.us-east-1.rds.amazonaws.com',
    password: 'amagrupo04', // SENHA
    database: 'ama',
})

// Rota criada para o server

app.post('/register' ,(req, res)=>{
    // É preciso de variáveis para serem enviadas para o form
    const sentUserName = req.body.UserName
    const sentEmail = req.body.Email
    const sentPassword = req.body.Password
    const sentTelefone = req.body.Telefone
    const sentCpf = req.body.Cpf
    const sentImg = req.body.Img
    const sentRua = req.body.Rua
    const sentBairro = req.body.Bairro
    const sentCidade = req.body.Cidade
    const sentNumero = req.body.Numero

    // Crie uma instrução SQL para inserir o usuário na tabela do banco de dados Usuários
    const SQL = 'INSERT INTO Usuarios (s_nome_usuario, s_email_usuario, t_telefone_usuario, t_cpf_usuario, s_imagem_usuario, s_rua_usuario, s_bairro_usuario, s_cidade_usuario, i_numero_usuario, s_senha_usuario ) VALUES (?,?,?,?,?,?,?,?,?,?)'
    // Vamos inserir esses valores através de uma variável
    const Values = [sentUserName, sentEmail, sentPassword, sentTelefone, sentCpf, sentImg, sentRua, sentBairro, sentCidade, sentNumero]
    // Query para executar a instrução SQL indicada acima
    db.query(SQL, Values, (err, results)=>{
       if(err){
        res.send(err)
       } 
       else{
        console.log('Usuário inserido com sucesso!')
        res.send({message: 'Usuário adicionado!'})
       }
    })

})

// É necessário logarmos com as credenciais que foram registradas no User
// Isso é feito criando uma outra route

app.post('/Login', (req, res)=>{
      // É preciso de variáveis para serem enviadas para o form
      const sentLoginEmail = req.body.LoginEmail
      const sentLoginPassword = req.body.LoginPassword
  
      // Crie uma instrução SQL para inserir o usuário na tabela do banco de dados Usuários
      const SQL = 'SELECT * FROM usuarios WHERE s_email_usuario = ? && s_senha_usuario = ?'
      // Vamos inserir esses valores através de uma variável
      const Values = [sentLoginEmail, sentLoginPassword]

      db.query(SQL, Values, (err, results)=>{
        if(err){
            res.send({error: err})
        }
        if(results.length >0){
            res.send(results)
        }
        else{
            res.send({message: 'As credenciais não condizem!'})
        }
     })
 
 })
const express = require("express")
const server = express()

// pegar o banco de dados
const db = require("./database/db.js")

// configurar pasta publica
server.use(express.static("public"))

// habilitar o req, body da aplicação
server.use(express.urlencoded({ extended: true}))

// utilizando templates engines
const numkunks = require("nunjucks")
numkunks.configure("src/views", {
    express: server,
    noCache: true
})

server.get("/", (req, res) => {
    return res.render("index.html")
})

server.get("/create-point", (req, res) => {

    console.log(req.query)

    return res.render("create-point.html")
})

server.post("/savepoint", (req, res) => {

    console.log(req.body)

    const query = `
        INSERT INTO places (
            image, name, address, address2, state, city, itens
        ) VALUES (?,?,?,?,?,?,?);
    `
    const values = [
        req.body.image,
        req.body.name,
        req.body.address,
        req.body.address2,
        req.body.state,
        req.body.city,
        req.body.itens
    ]

    function afterInsertData(err) {
        if (err) {
            console.log(err)
            return res.send("Erro no cadastro!")
        }
        console.log("Cadastrado com sucesso")
        console.log(this)
        return res.render("create-point.html", { saved: true })
    }

    db.run(query, values, afterInsertData)

})

// pegar os dados do banco de dados
server.get("/search-results", (req, res) => {

    const search = req.query.search

    if (search == "") {
        // pesquisa vazia
        return res.render("search-results.html", {total: 0})

    }

    db.all(`SELECT * FROM places WHERE city LIKE '%${search}%'`, function(err, rows) {
        if (err) {
            return console.log(err)
        }

        const total = rows.length

        //mostrar os dados na pagina html 
        return res.render("search-results.html", {places: rows, total})
    })
}) 

//ligar o server
server.listen(3000)
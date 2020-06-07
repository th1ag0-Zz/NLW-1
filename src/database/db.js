// inportar a dependencia do Sqlite
const sqlite = require("sqlite3").verbose()

//iniciar o objeto do banco de dados
const db = new sqlite.Database("./src/database/database.db")

module.exports = db


// ---------------- Utilizar o objeto do Banco de Dados-----------------
db.serialize( () => {
//     //1 - Criar tabela
//     db.run(`
//         CREATE TABLE IF NOT EXISTS places (
//             id INTEGER PRIMARY KEY AUTOINCREMENT,
//             image TEXT,
//             name TEXT,
//             address TEXT,
//             address2 TEXT,
//             state TEXT,
//             city TEXT,
//             itens TEXT 
//         );
//     `)

//     // 2 - Inserir dados
//     const query = `
//         INSERT INTO places (
//             image, name, address, address2, state, city, itens
//         ) VALUES (?,?,?,?,?,?,?);
//     `
//     const values = [
//         "https://images.unsplash.com/photo-1567393528677-d6adae7d4a0a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80",
//         "Papersider",
//         "Guilherme Gemballa, Jardim América",
//         "Número 260",
//         "Santa Catarina",
//         "Rio do Sul",
//         "Resíduos Eletrônicos, Lâmpadas"
//     ]

//     function afterInsertData(err) {
//         if (err) {
//             return console.log(err)
//         }
//         console.log("Cadastrado com sucesso")
//         console.log(this)
//     }

//     db.run(query, values, afterInsertData)

//     // 3 - Consultar dados
//     // db.all(`SELECT name FROM places`, function(err, rows) {
//     //     if (err) {
//     //         return console.log(err)
//     //     }
//     //     console.log("Aqui estão os seus registros")
//     //     console.log(rows)
//     // })

    // 4 - Apagar dados
    // db.run(`DELETE FROM places WHERE id = ?`, [2], function(err) {
    //     if (err) {
    //         return console.log(err)
    //     }
    //     console.log("Registro apagado com sucesso!")
    // })

})
import { Router } from "express";
import sqlite3 from "sqlite3";
import DBPATH from "../shared/dbConnection.js";

const amostrasRouter = Router();

//TABELA AMOSTRA - consulta
// Insere um registro (é o C do CRUD - Create)
amostrasRouter.post("/", (req, res) => {
  res.statusCode = 200;
  res.setHeader("Access-Control-Allow-Origin", "*");
  var db = new sqlite3.Database(DBPATH); // Abre o banco
  let sql =
    "INSERT INTO AMOSTRA (coletor_id, protocolo_id) VALUES ('" +
    req.body.coletor_id +
    "', '" +
    req.body.protocolo_id +
    ")";
  db.run(sql, [], (err) => {
    if (err) {
      throw err;
    }
  });
  res.write('<p>AMOSTRA INSERIDA COM SUCESSO!</p><a href="/">VOLTAR</a>');
  db.close(); // Fecha o banco
  res.end();
});

// Retorna todos registros (é o R do CRUD - Read)
amostrasRouter.get("/", (req, res) => {
  res.statusCode = 200;
  res.setHeader("Access-Control-Allow-Origin", "*");
  var db = new sqlite3.Database(DBPATH); // Abre o banco
  var sql = "SELECT * FROM AMOSTRA WHERE amostra_id = " + req.query.amostra_id;
  db.all(sql, [], (err, rows) => {
    if (err) {
      throw err;
    }
    res.json(rows);
  });
  db.close(); // Fecha o banco
});

// Atualiza um registro (é o U do CRUD - Update)
amostrasRouter.put("/", (req, res) => {
  res.statusCode = 200;
  res.setHeader("Access-Control-Allow-Origin", "*");
  let sql =
    "UPDATE AMOSTRA SET coletor_id ='" +
    req.body.coletor_id +
    "', protocolo_id = '" +
    req.body.protocolo_id +
    "' WHERE amostra_id='" +
    req.body.amostra_id +
    "'";
  console.log(sql);
  var db = new sqlite3.Database(DBPATH); // Abre o banco
  db.run(sql, [], (err) => {
    if (err) {
      throw err;
    }
    res.json(sql);
    res.end();
  });
  res.write('<p>AMOSTRA ATUALIZADO COM SUCESSO!</p><a href="/">VOLTAR</a>');
  db.close(); // Fecha o banco
});

// Exclui um registro (é o D do CRUD - Delete)
amostrasRouter.delete("/", (req, res) => {
  res.statusCode = 200;
  res.setHeader("Access-Control-Allow-Origin", "*");
  let sql =
    "DELETE FROM AMOSTRA WHERE amostra_id='" + req.query.amostra_id + "'";
  var db = new sqlite3.Database(DBPATH); // Abre o banco
  db.run(sql, [], (err) => {
    if (err) {
      throw err;
    }
    res.write('<p>AMOSTRA REMOVIDA COM SUCESSO!</p><a href="/">VOLTAR</a>');
    res.end();
  });
  db.close(); // Fecha o banco
});

export default amostrasRouter;

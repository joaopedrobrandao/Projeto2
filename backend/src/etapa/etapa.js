import { Router } from "express";
import sqlite3 from "sqlite3";
import DBPATH from "../shared/dbConnection.js";

const etapaRouter = Router();

//TABELA ETAPA - INSERE
// Insere um registro (é o C do CRUD - Create)
etapaRouter.post("/", (req, res) => {
  res.statusCode = 200;
  res.setHeader("Access-Control-Allow-Origin", "*");

  var db = new sqlite3.Database(DBPATH); // Abre o banco
  let sql =
    "INSERT INTO ETAPA (protocolo_id) VALUES (" + req.body.protocolo_id + ")";
  console.log(sql);
  db.run(sql, [], (err) => {
    if (err) {
      throw err;
    }
  });
  res.write('<p>ETAPA INSERIDA COM SUCESSO!</p><a href="/">VOLTAR</a>');
  db.close(); // Fecha o banco
  res.end();
});

// Retorna todos registros (é o R do CRUD - Read)
etapaRouter.get("/", (req, res) => {
  res.statusCode = 200;
  res.setHeader("Access-Control-Allow-Origin", "*");
  var db = new sqlite3.Database(DBPATH); // Abre o banco
  var sql = "SELECT * FROM ETAPA WHERE etapa_id = " + req.query.etapa_id;
  db.all(sql, [], (err, rows) => {
    if (err) {
      throw err;
    }
    res.json(rows);
  });
  db.close(); // Fecha o banco
});

// Atualiza um registro (é o U do CRUD - Update)
etapaRouter.put("/", (req, res) => {
  res.statusCode = 200;
  res.setHeader("Access-Control-Allow-Origin", "*");
  sql =
    "UPDATE ETAPA SET etapa_id ='" +
    req.body.etapa_id +
    "' WHERE amostra_id='" +
    req.body.etapa_id +
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
  res.write('<p>ETAPA ATUALIZADO COM SUCESSO!</p><a href="/">VOLTAR</a>');
  db.close(); // Fecha o banco
});

// Exclui um registro (é o D do CRUD - Delete)
etapaRouter.delete("/", (req, res) => {
  res.statusCode = 200;
  res.setHeader("Access-Control-Allow-Origin", "*");
  sql = "DELETE FROM ETAPA WHERE etapa_id='" + req.query.etapa_id + "'";
  console.log(sql);
  var db = new sqlite3.Database(DBPATH); // Abre o banco
  db.run(sql, [], (err) => {
    if (err) {
      throw err;
    }
    res.write('<p>ETAPA REMOVIDA COM SUCESSO!</p><a href="/">VOLTAR</a>');
    res.end();
  });
  db.close(); // Fecha o banco
});

export default etapaRouter;

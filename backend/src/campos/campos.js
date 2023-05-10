import { Router } from "express";
import sqlite3 from "sqlite3";
import DBPATH from "../shared/dbConnection.js";
import createCampo from "./useCases/create.usecase.js";

const campoRouter = Router();

// TABELA CAMPO
// Insere um registro (é o C do CRUD - Create)
campoRouter.post("/", (req, res) => {
  res.statusCode = 200;
  res.setHeader("Access-Control-Allow-Origin", "*");

  const result = createCampo(req.body);

  res.json(result);
  res.end();
});

// Retorna todos registros (é o R do CRUD - Read)
campoRouter.get("/", (req, res) => {
  res.statusCode = 200;
  res.setHeader("Access-Control-Allow-Origin", "*");
  let db = new sqlite3.Database(DBPATH); // Abre o banco
  let sql = "SELECT * FROM CAMPO WHERE campo_id = " + req.query.campo_id;
  db.all(sql, [], (err, rows) => {
    if (err) {
      throw err;
    }
    res.json(rows);
  });
  db.close(); // Fecha o banco
});

// Atualiza um registro (é o U do CRUD - Update)
campoRouter.put("/", (req, res) => {
  res.statusCode = 200;
  res.setHeader("Access-Control-Allow-Origin", "*");
  sql =
    "UPDATE CAMPO SET categoria ='" +
    req.body.categoria +
    "', nome = '" +
    req.body.nome +
    "' WHERE campo_id='" +
    req.body.campo_id +
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
  res.write('<p>CAMPO ATUALIZADO COM SUCESSO!</p><a href="/">VOLTAR</a>');
  db.close(); // Fecha o banco
});

// Exclui um registro (é o D do CRUD - Delete)
campoRouter.delete("/", (req, res) => {
  res.statusCode = 200;
  res.setHeader("Access-Control-Allow-Origin", "*");
  sql = "DELETE FROM CAMPO WHERE campo_id='" + req.query.campo_id + "'";
  console.log(sql);
  var db = new sqlite3.Database(DBPATH); // Abre o banco
  db.run(sql, [], (err) => {
    if (err) {
      throw err;
    }
    res.write('<p>CAMPO REMOVIDO COM SUCESSO!</p><a href="/">VOLTAR</a>');
    res.end();
  });
  db.close(); // Fecha o banco
});

export default campoRouter;

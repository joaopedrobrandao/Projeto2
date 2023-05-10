import { Router } from "express";
import sqlite3 from "sqlite3";
import DBPATH from "../shared/dbConnection.js";
import createProtocolo from "./useCases/create.usecase.js";

const protocolosRouter = Router();

// TABELA PROTOCOLO
// Insere um registro (é o C do CRUD - Create)
protocolosRouter.post("/", async (req, res) => {
  res.statusCode = 200;
  res.setHeader("Access-Control-Allow-Origin", "*");

  const result = await createProtocolo(req.body);

  res.json(result);
  res.end();
});

// Retorna todos registros (é o R do CRUD - Read)
protocolosRouter.get("/", (req, res) => {
  res.statusCode = 200;
  res.setHeader("Access-Control-Allow-Origin", "*");

  let db = new sqlite3.Database(DBPATH); // Abre o banco
  let sql = "SELECT * FROM PROTOCOLO";

  db.all(sql, [], (err, rows) => {
    if (err) {
      throw err;
    }
    res.json(rows);
  });

  db.close(); // Fecha o banco
});

// Retorna registro especifico (é o R do CRUD - Read)
protocolosRouter.get("/:protocolo_id", (req, res) => {
  res.statusCode = 200;
  res.setHeader("Access-Control-Allow-Origin", "*");

  let db = new sqlite3.Database(DBPATH); // Abre o banco
  let sql =
    "SELECT * FROM PROTOCOLO WHERE protocolo_id = " + req.query.protocolo_id;

  db.all(sql, [], (err, rows) => {
    if (err) {
      throw err;
    }
    res.json(rows);
  });
  db.close(); // Fecha o banco
});

// Atualiza um registro (é o U do CRUD - Update)
protocolosRouter.put("/", (req, res) => {
  console.log("aaaaaaaaa");
  res.statusCode = 200;
  res.setHeader("Access-Control-Allow-Origin", "*");

  let sql =
    "UPDATE PROTOCOLO SET nome='" +
    req.body.nome +
    "', foto_url='" +
    req.body.foto_url +
    "' , ativo=" +
    req.body.ativo +
    " WHERE protocolo_id=" +
    req.query.protocolo_id +
    " RETURNING *";
  var db = new sqlite3.Database(DBPATH); // Abre o banco

  db.all(sql, [], (err, rows) => {
    if (err) {
      throw err;
    }
    res.json(rows[0]);
    res.end();
  });
  db.close(); // Fecha o banco
});

// Exclui um registro (é o D do CRUD - Delete)
protocolosRouter.delete("/", (req, res) => {
  res.statusCode = 200;
  res.setHeader("Access-Control-Allow-Origin", "*");

  let sql =
    "DELETE FROM PROTOCOLO WHERE protocolo_id=" + req.query.protocolo_id;
  var db = new sqlite3.Database(DBPATH); // Abre o banco

  db.run(sql, [], (err) => {
    if (err) {
      throw err;
    }
    res.write('<p>PROTOCOLO REMOVIDO COM SUCESSO!</p><a href="/">VOLTAR</a>');
    res.end();
  });

  db.close(); // Fecha o banco
});

export default protocolosRouter;

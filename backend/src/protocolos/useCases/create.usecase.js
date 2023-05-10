import sqlite3 from "sqlite3";
import DBPATH from "../../shared/dbConnection.js";

const createProtocolo = async (data) => {
  var db = new sqlite3.Database(DBPATH); // Abre o banco
  let sql =
    "INSERT INTO PROTOCOLO (nome, foto_url, ativo) VALUES ('" +
    data.nome +
    "', '" +
    data.foto_url +
    "', " +
    data.ativo +
    ") RETURNING *";

  const query = new Promise((resolve, reject) => {
    db.all(sql, [], (err, rows) => {
      if (err) {
        reject(err);
      }

      resolve(rows);
    });
  });

  const response = await query;
  db.close(); // Fecha o banco

  if (response) {
    return response[0];
  }

  return null;
};

export default createProtocolo;

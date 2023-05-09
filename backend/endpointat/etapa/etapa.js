const express = require('express'); 
const bodyParser = require('body-parser');
const urlencodedParser = bodyParser.urlencoded({ extended: false })

const sqlite3 = require('sqlite3').verbose();
const DBPATH = 'mfisico.db';

const hostname = '127.0.0.1';
const port = 3000;
const app = express();

/* Colocar toda a parte estática no frontend */
app.use(express.static("../frontend/"));

/* Definição dos endpoints */
/******** CRUD ************/
app.use(express.json());


//TABELA ETAPA - CONSULTA
// Retorna todos registros (é o R do CRUD - Read)
app.get('/etapa', (req, res) => {
	res.statusCode = 200;
	res.setHeader('Access-Control-Allow-Origin', '*');
	var db = new sqlite3.Database(DBPATH); // Abre o banco
	var sql = 'SELECT * FROM ETAPA WHERE etapa_id = ' + req.query.etapa_id;
		db.all(sql, [],  (err, rows ) => {
			if (err) {
				throw err;
			}
			res.json(rows);
		});
		db.close(); // Fecha o banco
});

//TABELA ETAPA - INSERE
// Insere um registro (é o C do CRUD - Create)
app.post('/inseretapa', urlencodedParser, (req, res) => {
	res.statusCode = 200;
	res.setHeader('Access-Control-Allow-Origin', '*'); 
	var db = new sqlite3.Database(DBPATH); // Abre o banco
	sql = "INSERT INTO ETAPA (etapa_id) VALUES ('" + req.body.etapa_id + ")";
	console.log(sql);
	db.run(sql, [],  err => {
		if (err) {
		    throw err;
		}	
	});
	res.write('<p>ETAPA INSERIDA COM SUCESSO!</p><a href="/">VOLTAR</a>');
	db.close(); // Fecha o banco
	res.end();
});

// TABELA ETAPA - ATUALIZAR GET
// Monta o formulário para o update (é o U do CRUD - Update)
app.get('/atualizaetapag', (req, res) => {
	res.statusCode = 200;
	res.setHeader('Access-Control-Allow-Origin', '*'); 
	sql = "SELECT * FROM ETAPA WHERE etapa_id ="+ req.query.etapa_id;
	console.log(sql);
	var db = new sqlite3.Database(DBPATH); // Abre o banco
	db.all(sql, [],  (err, rows ) => {
		if (err) {
			throw err;
		}
		res.json(rows);
	});
	db.close(); // Fecha o banco
});

// TABELA ETAPA - ATUALIZAR POST
// Atualiza um registro (é o U do CRUD - Update)
app.post('/atualizaetapap', urlencodedParser, (req, res) => {
	res.statusCode = 200;
	res.setHeader('Access-Control-Allow-Origin', '*'); 
	sql = "UPDATE ETAPA SET etapa_id ='" + req.body.etapa_id + "' WHERE amostra_id='" + req.body.etapa_id + "'";
	console.log(sql);
	var db = new sqlite3.Database(DBPATH); // Abre o banco
	db.run(sql, [],  err => {
		if (err) {
		    throw err;
		}
        res.json(sql)
		res.end();
	});
	res.write('<p>ETAPA ATUALIZADO COM SUCESSO!</p><a href="/">VOLTAR</a>');
	db.close(); // Fecha o banco
});

// TABELA ETAPA - DELETAR ETAPA
// Exclui um registro (é o D do CRUD - Delete)
app.get('/removeetapa', urlencodedParser, (req, res) => {
	res.statusCode = 200;
	res.setHeader('Access-Control-Allow-Origin', '*'); 
	sql = "DELETE FROM ETAPA WHERE etapa_id='" + req.query.etapa_id + "'";
	console.log(sql);
	var db = new sqlite3.Database(DBPATH); // Abre o banco
	db.run(sql, [],  err => {
		if (err) {
		    throw err;
		}
		res.write('<p>ETAPA REMOVIDA COM SUCESSO!</p><a href="/">VOLTAR</a>');
		res.end();
	});
	db.close(); // Fecha o banco
});

app.listen(port, hostname, () => {
  console.log(`Servidor rodando em http://${hostname}:${port}/`);
});
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


//TABELA AMOSTRA - consulta
// Retorna todos registros (é o R do CRUD - Read)
app.get('/coletorprotocolo', (req, res) => {
	res.statusCode = 200;
	res.setHeader('Access-Control-Allow-Origin', '*');
	var db = new sqlite3.Database(DBPATH); // Abre o banco
	var sql = 'SELECT * FROM COLETOR_PROTOCOLO WHERE coletor_protocolo_id = ' + req.query.coletor_protocolo_id;
		db.all(sql, [],  (err, rows ) => {
			if (err) {
				throw err;
			}
			res.json(rows);
		});
		db.close(); // Fecha o banco
});

//TABELA AMOSTRA - insere
// Insere um registro (é o C do CRUD - Create)
app.post('/inserecoletorprotocolo', urlencodedParser, (req, res) => {
	res.statusCode = 200;
	res.setHeader('Access-Control-Allow-Origin', '*'); 
	var db = new sqlite3.Database(DBPATH); // Abre o banco
	sql = "INSERT INTO COLETOR_PROTOCOLO (coletor_id, protocolo_id) VALUES ('" + req.body.coletor_id + "', '" + req.body.protocolo_id + ")";
	console.log(sql);
	db.run(sql, [],  err => {
		if (err) {
		    throw err;
		}	
	});
	res.write('<p> COLETOR PROTOCOLO INSERIDO COM SUCESSO!</p><a href="/">VOLTAR</a>');
	db.close(); // Fecha o banco
	res.end();
});

// TABELA AMOSTRA - ATUALIZAR GET
// Monta o formulário para o update (é o U do CRUD - Update)
app.get('/atualizacoletorprotocolog', (req, res) => {
	res.statusCode = 200;
	res.setHeader('Access-Control-Allow-Origin', '*'); 
	sql = "SELECT * FROM COLETOR_PROTOCOLO WHERE coletor_protocolo_id ="+ req.query.coletor_protocolo_id;
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

// TABELA AMOSTRA - ATUALIZAR POST
// Atualiza um registro (é o U do CRUD - Update)
app.post('/atualizacoletorprotocolop', urlencodedParser, (req, res) => {
	res.statusCode = 200;
	res.setHeader('Access-Control-Allow-Origin', '*'); 
	sql = "UPDATE COLETOR_PROTOCOLO SET coletor_protocolo_id ='" + req.body.coletor_protocolo_id + "', protocolo_id = '" + req.body.protocolo_id + "' WHERE coletor_id='" + req.body.coletor_id + "'";
	console.log(sql);
	var db = new sqlite3.Database(DBPATH); // Abre o banco
	db.run(sql, [],  err => {
		if (err) {
		    throw err;
		}
        res.json(sql)
		res.end();
	});
	res.write('<p> COLETOR ATUALIZADO COM SUCESSO!</p><a href="/">VOLTAR</a>');
	db.close(); // Fecha o banco
});

// TABELA AMOSTRA - DELETAR AMOSTRA
// Exclui um registro (é o D do CRUD - Delete)
app.get('/removecoletorprotocolo', urlencodedParser, (req, res) => {
	res.statusCode = 200;
	res.setHeader('Access-Control-Allow-Origin', '*'); 
	sql = "DELETE FROM COLETOR_PROTOCOLO WHERE coletor_protocolo_id ='" + req.query.coletor_protocolo_id + "'";
	console.log(sql);
	var db = new sqlite3.Database(DBPATH); // Abre o banco
	db.run(sql, [],  err => {
		if (err) {
		    throw err;
		}
		res.write('<p>COLETOR PROTOCOLO REMOVIDA COM SUCESSO!</p><a href="/">VOLTAR</a>');
		res.end();
	});
	db.close(); // Fecha o banco
});

app.listen(port, hostname, () => {
  console.log(`Servidor rodando em http://${hostname}:${port}/`);
});
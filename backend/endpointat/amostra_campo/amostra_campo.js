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


//TABELA AMOSTRA CAMPO - consulta
// Retorna todos registros (é o R do CRUD - Read)
app.get('/amostracampo', (req, res) => {
	res.statusCode = 200;
	res.setHeader('Access-Control-Allow-Origin', '*');
	var db = new sqlite3.Database(DBPATH); // Abre o banco
	var sql = 'SELECT * FROM AMOSTRA_CAMPO WHERE amostra_campo_id = ' + req.query.amostra_campo_id;
		db.all(sql, [],  (err, rows ) => {
			if (err) {
				throw err;
			}
			res.json(rows);
		});
		db.close(); // Fecha o banco
});

//TABELA AMOSTRA CAMPO - insere
// Insere um registro (é o C do CRUD - Create)
app.post('/insereamostracampo', urlencodedParser, (req, res) => {
	res.statusCode = 200;
	res.setHeader('Access-Control-Allow-Origin', '*'); 
	var db = new sqlite3.Database(DBPATH); // Abre o banco
	sql = "INSERT INTO AMOSTRA_CAMPO (conteudo) VALUES ('" + req.body.amostra_campo_id + ")";
	console.log(sql);
	db.run(sql, [],  err => {
		if (err) {
		    throw err;
		}	
	});
	res.write('<p>CONTEUDO INSERIDO COM SUCESSO!</p><a href="/">VOLTAR</a>');
	db.close(); // Fecha o banco
	res.end();
});

//TABELA AMOSTRA CAMPO - ATUALIZAR GET
// Monta o formulário para o update (é o U do CRUD - Update)
app.get('/atualizaamostracampog', (req, res) => {
	res.statusCode = 200;
	res.setHeader('Access-Control-Allow-Origin', '*'); 
	sql = "SELECT * FROM AMOSTRA_CAMPO WHERE amostra_id ="+ req.query.amostra_campo_id;
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

//TABELA AMOSTRA CAMPO - ATUALIZAR POST
// Atualiza um registro (é o U do CRUD - Update)
app.post('/atualizaamostracampop', urlencodedParser, (req, res) => {
	res.statusCode = 200;
	res.setHeader('Access-Control-Allow-Origin', '*'); 
	sql = "UPDATE AMOSTRA_CAMPO SET conteudo ='" + req.body.conteudo + "' WHERE amostra_campo_id='" + req.body.amostra_campo_id + "'";
	console.log(sql);
	var db = new sqlite3.Database(DBPATH); // Abre o banco
	db.run(sql, [],  err => {
		if (err) {
		    throw err;
		}
        res.json(sql)
		res.end();
	});
	res.write('<p>AMOSTRA CAMPO ATUALIZADA COM SUCESSO!</p><a href="/">VOLTAR</a>');
	db.close(); // Fecha o banco
});

//TABELA AMOSTRA CAMPO - DELETAR AMOSTRA
// Exclui um registro (é o D do CRUD - Delete)
app.get('/removeamostracampo', urlencodedParser, (req, res) => {
	res.statusCode = 200;
	res.setHeader('Access-Control-Allow-Origin', '*'); 
	sql = "DELETE FROM AMOSTRA_CAMPO WHERE amostra_campo_id='" + req.query.amostra_campo_id + "'";
	console.log(sql);
	var db = new sqlite3.Database(DBPATH); // Abre o banco
	db.run(sql, [],  err => {
		if (err) {
		    throw err;
		}
		res.write('<p>AMOSTRA CAMPO REMOVIDA COM SUCESSO!</p><a href="/">VOLTAR</a>');
		res.end();
	});
	db.close(); // Fecha o banco
});

app.listen(port, hostname, () => {
  console.log(`Servidor rodando em http://${hostname}:${port}/`);
});
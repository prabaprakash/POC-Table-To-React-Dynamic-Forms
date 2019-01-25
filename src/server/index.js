'use strict';
const express = require('express');
const app = express();
const path = require('path');
const fs = require('fs');
var rp = require('request-promise');
var bodyParser = require('body-parser')
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
const db = require("./dbPool");

app.use(express.static('src/dist/'));

app.get('/api/files/:offset', async (request, response) => {
    let files = await db.files.findAll({
        raw: true,
        offset: parseInt(request.params.offset), limit: 10
      });
      response.json(files);
});

app.get('/api/schema/:table', (request, response) => {
  db.sequelize.query(`desc ${request.params.table}`).then((tableSchema) => {
    response.json(tableSchema);
  })
  .catch((err) => {
    response.json({error: err });
  })
});

app.post('/api/files/insert/:table', async (request, response) => {
  console.log(request.body)
  const result = await db[request.params.table].create(request.body);
  response.json(result.dataValues);
});

app.get('/*', function(req, res) {
  res.sendFile(path.join(__dirname, '../dist/index.html'));
});

const port = process.env.PORT || 3200;
app.listen(port, function() {
  console.log(`Application listening on port ${port}`);
});

module.exports = app;

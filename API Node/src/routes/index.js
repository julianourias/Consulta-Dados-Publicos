const fs = require("fs");
const path = require("path");
const dir = "./Dados/";
const files = fs.readdirSync(dir);
const express = require("express");
const app = express();

//
// Funções Utilitárias
//
function isEmpty(obj) {
  for(var prop in obj) {
    if(Object.prototype.hasOwnProperty.call(obj, prop)) {
      return false;
    }
  }

  return JSON.stringify(obj) === JSON.stringify({});
}

function formatBytes(bytes) {
  if (bytes < 1024) return bytes + " Bytes";
  else if (bytes < 1048576) return (bytes / 1024).toFixed(3) + " Kb";
  else if (bytes < 1073741824) return (bytes / 1048576).toFixed(3) + " Mb";
  else return (bytes / 1073741824).toFixed(3) + " GB";
}

function csvToJSON(csv) {
  let lines = csv.split("\n");
  let result = [];
  let headers = lines[0].split(";");

  for (let i = 1; i < lines.length; i++) {
    let obj = {};
    let currentline = lines[i].split(";");

    for (let j = 0; j < headers.length; j++) {
      if(currentline[j] && currentline[j].length > headers.length) {
        obj[headers[j]] = currentline[j];
      }
    }
    !isEmpty(obj) ? result.push(obj) : null;
  }
  return JSON.stringify(result); //JSON
}
//
// Funções que retornam os dados
//
function getFiles(files_) {
  files_ = files_ || [];
  for (let i in files) {
    let type = path.extname(dir + files[i]).replace(".", "");
    let name = files[i].replace(".csv", "").replace(".json", "");
    let size = formatBytes(fs.statSync(dir + files[i]).size);

    files_.push({ nome: name, tamanho: size, tipo: type });
  }
  return files_;
}

function getDataFile(file) {
  let data = [];
  let result = [];

  for (let i in files) {
    if(files[i].indexOf(file) > -1) {
      let type = path.extname(dir + files[i]).replace(".", "");
      if (type == 'csv') {
        let obj = csvToJSON(fs.readFileSync(dir+files[i]).toString('latin1'));
        data.push(obj); 
      } else {
        data.push(fs.readFileSync(dir+files[i]).toString('utf8')); 
      }
    }
  }
  
  if (data.length > 1) {
    for (let i = 0; i < data.length; i++) {
      result = Object.assign(result, JSON.parse(data[i]));
    }
  } else {
    result = JSON.parse(data);
  }

  return result;
}
//
// Rotas
//
app.get("/", function (req, res, next) {
  res.status(200).send({
    title: "Dados Públicos IFPR",
    autor: "Juliano Augusto Cavalcante Urias",
    version: "0.0.1",
  });
});

app.get("/dados/:nome_arquivo", function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE'); // If needed
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type'); // If needed
  res.setHeader('Access-Control-Allow-Credentials', false); // If  needed

  return res.status(200).json(getDataFile(req.params.nome_arquivo));
});

app.get("/dados", function (req, res, next) {
  res.status(200).send(getFiles());
});

module.exports = app;

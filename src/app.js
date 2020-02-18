const express = require("express");

const routes = require("./routes");
const headersConfig = require('./utils/headersConfig');


class App {
    constructor() {
        this.server = express();    
        
        this.database();
        this.middlewares();
        this.routes();
    }
    
    middlewares() {
        this.server.use(express.json());
        this.server.use(headersConfig);
    }
    
    routes() {
        this.server.use(routes);
    }
    
    database() {
        require("./database");
    }
}

module.exports = new App().server;
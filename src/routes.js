const { Router } = require("express");

const routes = Router();

const UserController = require("./app/controllers/UserController");
const AddressController = require("./app/controllers/AddressController");
const TechController = require("./app/controllers/TechController");
const ReportController = require("./app/controllers/ReportController");

// Home
routes.get("/", (request, response) => {
    return response.status(200).json({
        name: "node_sql",
        description: "API REST for learning of the library sequelize"
    })
});

// Users
routes.get("/users", UserController.index);
routes.post("/users", UserController.store);

// Address
routes.get("/users/:user_id/addresses", AddressController.index);
routes.post("/users/:user_id/addresses", AddressController.store);

// Techs
routes.get("/users/:user_id/techs", TechController.index);
routes.post("/users/:user_id/techs", TechController.store);
routes.delete("/users/:user_id/techs", TechController.destroy);

// Report
routes.get("/report", ReportController.show);

// Not Found
routes.use((request, response, next) => {
    return response.status(400).json({
        error: "Not Found Route"
    });
});

module.exports = routes;
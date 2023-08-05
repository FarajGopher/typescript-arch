"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const config_load_1 = __importDefault(require("./app/config/config.load"));
const database_1 = __importDefault(require("./app/initialize/database"));
const app = (0, express_1.default)();
//Parse Json
app.use(express_1.default.json());
//connect database
// configuration();
// Authenticate the database connection
database_1.default
    .authenticate()
    .then(() => {
    console.log("Connection has been established successfully.");
})
    .catch((error) => {
    console.error("Unable to connect to the database: ", error);
});
app.get("/", (req, res) => {
    res.json({
        message: "hello this is a typescript api"
    });
});
// Set port, listen for requests
const PORT = Number(process.env.PORT) || config_load_1.default.port;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});

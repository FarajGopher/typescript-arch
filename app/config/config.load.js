"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const js_yaml_1 = __importDefault(require("js-yaml"));
let config;
// Read config file
try {
    config = js_yaml_1.default.load(fs_1.default.readFileSync('/home/faraj/typescript/app/config/default.yaml', 'utf8'));
    console.log("Configuration file loaded successfully", config);
}
catch (error) {
    console.log(error);
}
exports.default = config;

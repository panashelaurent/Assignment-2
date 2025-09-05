import {Sequelize} from "sequelize";
import db from "./db.js";

const mySequelize = new Sequelize(db.development);

export default mySequelize;

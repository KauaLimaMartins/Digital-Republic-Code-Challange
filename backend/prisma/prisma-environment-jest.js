/* eslint-disable */
const NodeEnvironment = require("jest-environment-node").TestEnvironment;
const { v4: uuid } = require("uuid");
const { resolve } = require("path");

require("dotenv").config({
  path: resolve(__dirname, "..", ".env.test"),
});

class CustomEnvironment extends NodeEnvironment {
  constructor(config) {
    super(config);
    this.schema = `code_schema_${uuid()}`;
    console.log("schemas", this.schema);
    this.connectionString = `${process.env.DATABASE_URL}${this.schema}`;
  }
}

module.exports = CustomEnvironment;

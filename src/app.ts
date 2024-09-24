/* import express, { Request, Response } from "express"; */
/* import * as dotenv from "dotenv"; */
const express = require("express");
const dotenv = require("dotenv");
dotenv.config();

const keys = {
    port: process.env.PORT
}

const app = express();

app.get('/', (req: Request, res: Response) => {
  res.send({ message: "OI OI" });
});

app.listen(keys.port, () => {
  console.log(`Server running on port ${keys.port}`);
});
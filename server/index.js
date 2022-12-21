// Pull in required imports
import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import multer from "multer";
import helmet from "helmet";
import morgan from "morgan";
import path from "path";
import { fileURLToPath } from "url";

// HANDLE PRE-SETUP VARIABLES
const fileName = fileURLToPath(import.meta.url); // Set up file path
const dirName = path.dirname(fileName); // Set up directory path
const config = dotenv.config().parsed;

// Setup main server & additional handlers to go w/ it
// Refer to docs of each package for more information if necessary
const app = express();
app.use(express.json());
app.use(bodyParser.json());
app.use(helmet());
app.use(cors());
app.use(helmet.crossOriginResourcePolicy({policy: "cross-origin"})); // Work with CORS to enable X-site requests
app.use(morgan("common")); // Setup morgan logger et. al.

// Public log file
app.use("/static", express.static(path.join(dirName, 'public/static')));
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
import { createAccount } from "./controllers/user.js";
import { createPost } from "./controllers/postController.js";
import secureRoutes from "./routes/secureRoutes.js";
import accountRoutes from "./routes/accountRoutes.js";
import postRoutes from "./routes/postRoutes.js";

// HANDLE PRE-SETUP VARIABLES
const fileName = fileURLToPath(import.meta.url); // Set up file path
const dirName = path.dirname(fileName); // Set up directory path
const config = dotenv.config().parsed;

// Server and DB connection variables
const port = process.env.SERVER_PORT || 2004;
const mongoConnectionUrl = process.env.MONGO_CONNECTION_STRING || null;

if (mongoConnectionUrl !== null) {
  mongoose.connect(mongoConnectionUrl).then(() => {
    mongoose.set('strictQuery', true); // Silence.
    console.log("Connected to MongoDB!");
    app.listen(port, () =>
      console.log(`Chatterbox listening on port ${port}.`)
    );
  });
} else {
  console.log(
    "Error connecting to MongoDb. Connection string is null. Please try again."
  );
}

// Setup main server & additional handlers to go w/ it
// Refer to docs of each package for more information if necessary
const app = express();
app.use(express.json());
app.use(bodyParser.json());
app.use(helmet());
app.use(cors());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" })); // Work with CORS to enable X-site requests
app.use(morgan("common")); // Setup morgan logger et. al.

// Public log file
app.use("/static", express.static(path.join(dirName, "public/static")));

// FILE STORAGE OPTIONS
// Refer to Multer for more information w/r/t storage & file paths
const storageBag = multer.diskStorage({
  destination: function (_req, _file, doCallBack) {
    doCallBack(null, "public/static");
  },
  filename: function (_req, _file, doCallBack) {
    doCallBack(null, _file.originalname); // Save file as original name
  },
});

// Must call the Multer constructor here (read the docs!)
const uploads = multer({ storageBag });

//  ROUTE BLOCKS
// TODO move these into separate sections if I have time, otherwise it isn't worth it
app.use("/secure", secureRoutes);
app.use("/account", accountRoutes);
app.use("/post", postRoutes);

// Routes with files attached
app.post("/register", uploads.single("avatar"), createAccount);
app.post("/post", upload.single("snapshot"), makePost);
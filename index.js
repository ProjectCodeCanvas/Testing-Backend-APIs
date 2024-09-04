import mongoose from "mongoose";
import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import { userRoutes } from "./Routes/UserRoutes.js";
import { config } from "dotenv";
import { snipperRouter } from "./Routes/SnippetRoutes.js";
import { UserModel } from "./Models/UserModel.js";
import SnippetModel from "./Models/SnippetModel.js";
import createSampleSnippets from "./Test/dummyData.js";


config();

const app = express();
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(cookieParser());
app.use(
  cors({
    origin: "*",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);
const isTesting = process.env.isTesting === "true";
const mongoUrl = isTesting ? process.env.TEST_MONGO_URI : process.env.MONGO_URI;

export const connectDB = async () => {
  const { connection } = await mongoose.connect(mongoUrl,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 30000, // Increase timeout if needed
    socketTimeoutMS: 30000, });
  console.log(`MongoDB connected with ${connection.host}`);
};
connectDB();

if(isTesting){
  await UserModel.deleteMany();
  await SnippetModel.deleteMany();
  await createSampleSnippets();
}

app.use("/api/user",userRoutes)
app.use("/api/snippet",snipperRouter)

app.get("/", (req, res) =>
  res.send(
    `<h1>Site is Working. click <a href=${process.env.FRONTEND_URL}>here</a> to visit frontend.</h1>`
  )
);
const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`Server is working on port: ${port}`);
});

export default app;
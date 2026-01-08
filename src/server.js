import dotenv from "dotenv";
dotenv.config();
import app from "./app.js";
import { connectDB } from "./config/db.js";

console.log("ENV CHECK:", process.env.MONGO_URI);

await connectDB();

app.listen(5000, () => {
  console.log("🚀 Local server running on 5000");
});

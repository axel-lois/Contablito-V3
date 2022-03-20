import server from "./server/server";
import {connectDB} from "./db/database"; //db connection
import dotenv from "dotenv";
dotenv.config();

const PORT = process.env.PORT;

server.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
  connectDB();
});

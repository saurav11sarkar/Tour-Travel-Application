import mongoose from "mongoose";
import app from "./app";
import config from "./config";

const port = config.port;
const server = async () => {
  try {
    const connectiondb = await mongoose.connect(config.db as string);
    // console.log(connectiondb.connection.host);
    app.listen(port, () => {
      console.log(`server is running http://localhost:${port}`);
    });
  } catch (err: any) {
    console.log(err.messace);
  }
};

server();

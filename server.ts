import configs from "./src/configs";
import express, { Application } from "express";
import Server from "./src/index";

const app: Application = express();
new Server(app);
const parsedPort: number = parseInt(configs.port as string, 10);
const PORT: number = isNaN(parsedPort) ? 5000 : parsedPort;
app
  .listen(PORT, "localhost", function () {
    console.log(`Server is running on port ${PORT}.`);
  })
  .on("error", (err: any) => {
    console.error(err);
    if (err.code === "EADDRINUSE") {
      console.log("Error: address already in use");
    } else {
      console.log(err);
    }
  });

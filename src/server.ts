import { Server } from "http";
import app from "./app";
import config from "./config";

let server: Server;

async function main() {
  try {
    server = app.listen(config.port, () => {
      console.log(`app is listening on port ${config.port}`);
    });
  } catch (err) {
    console.log(err);
  }
}

main();

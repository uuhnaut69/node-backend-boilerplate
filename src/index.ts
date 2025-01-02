import { Server } from "hyper-express";

import env from "@/configs/env";

async function main() {
  const app = new Server();

  app.get("/", (req, res) => {
    res.send("Server is running");
  });

  app
    .listen(Number(env.PORT))
    .then(() => console.log(`Server is running on port ${env.PORT}`))
    .catch((err) =>
      console.log(`Failed to start webserver on port ${env.PORT}`, err)
    );
}

main();

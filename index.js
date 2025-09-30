import setupServer from "./src/server.js"

const runServer = () => {
  try {
    setupServer();
  } catch (error) {
    console.log("Error during server setup: ", error);
    process.exit(1);
  }
}


runServer();

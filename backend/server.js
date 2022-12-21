require("dotenv").config({ path: "backend/config/.env" });

const app = require("./app");

const connectDB = require("./config/database");

// handling uncaught errors
process.on("uncaughtException", (err) => {
  console.log(`Error: ${err}`);
  console.log("Shutting down the server due to uncaught exceptions.");
  process.exit(1);
});

// connect database
connectDB();

const PORT = process.env.PORT || 8000;
const server = app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// unhandled promise rejection error
process.on("unhandledRejection", (err) => {
  console.log("Error:", err);
  console.log("Shutting down the server due to unhandler promise rejections.");

  server.close(() => {
    process.exit(2);
  });
});

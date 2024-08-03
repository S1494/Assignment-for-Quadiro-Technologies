const app = require("./app");
const mongoConnect = require("./db");

app.listen(process.env.PORT, () => {
  console.log("server is running", process.env.PORT);
});

mongoConnect();

require("dotenv").config();
const app = require("./app");
const config = require("./utils/config");

const server = app.listen(config.PORT, () => {
  console.log(`Server running on port ${config.PORT}`);
});

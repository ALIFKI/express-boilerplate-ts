import app from "./app";
import config from "./config/config";
import db from "./models";

// Sync the database and then start the server
db.sequelize
  .sync()
  .then(() => {
    app.listen(config.port, () => {
      console.log(`Server is running on port ${config.port}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });

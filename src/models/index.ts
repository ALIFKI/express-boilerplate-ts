import { Sequelize } from "sequelize";
import config from "../config/config";
import { UserModel } from "./user";
import { ChatModel } from "./chat";
import { MessageModel } from "./messages";
import { MemberModel } from "./member";

const sequelize = new Sequelize(
  config.dbConfig.database as string,
  config.dbConfig.username as string,
  config.dbConfig.password,
  {
    host: config.dbConfig.host,
    dialect: config.dbConfig.dialect,
    port: config.dbConfig.port,
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
    },
  }
);

// Initialize models
const User = UserModel(sequelize);
const Chat = ChatModel(sequelize);
const Messages = MessageModel(sequelize);
const Member = MemberModel(sequelize);

const db = {
  Member,
  User,
  Chat,
  Messages,
  sequelize,
  Sequelize,
};

export default db;

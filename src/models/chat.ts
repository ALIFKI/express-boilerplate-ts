import { DataTypes, Sequelize, Model, HasMany } from "sequelize";
import { User } from "./user";
import Member, { MemberModel } from "./member";
interface ChatAttribute {
  id?: number;
  chat_name: string;
  chat_type: string;
}

export class Chat extends Model<ChatAttribute> implements ChatAttribute {
  public id!: number;
  public chat_name!: string;
  public chat_type!: string;
  public Members!: Member[];
}

export const ChatModel = (sequelize: Sequelize): typeof Chat => {
  Chat.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      chat_name: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      chat_type: {
        allowNull: false,
        type: DataTypes.STRING,
      },
    },
    {
      sequelize,
      modelName: "Chat",
      schema: "public",
    }
  );

  Chat.hasMany(MemberModel(sequelize), {
    foreignKey: "chat_id",
    as: "Members",
  });

  return Chat;
};

export default Chat;

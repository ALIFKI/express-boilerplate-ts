import { DataTypes, Sequelize, Model } from "sequelize";
import Chat from "./chat";
import { User } from "./user";
interface MessageAttribute {
  id?: number;
  chat_id: string;
  sender_id: number;
  content: string;
  message_type: string;
  send_at: Date;
  is_read: boolean;
}

export class Message
  extends Model<MessageAttribute>
  implements MessageAttribute
{
  public id!: number;
  public chat_id!: string;
  public sender_id!: number;
  public content!: string;
  public message_type!: string;
  public send_at!: Date;
  public is_read!: boolean;
}

export const MessageModel = (sequelize: Sequelize): typeof Message => {
  Message.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      chat_id: {
        type: DataTypes.INTEGER,
        references: {
          model: "Chats", // The model that chat_id references
          key: "id", // The column in the Chat model that chat_id references
        },
      },
      sender_id: {
        allowNull: false,
        type: DataTypes.INTEGER,
        references: {
          model: "Users", // The model that chat_id references
          key: "id", // The column in the Chat model that chat_id references
        },
      },
      content: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      message_type: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      send_at: {
        allowNull: false,
        type: DataTypes.DATE,
      },
      is_read: {
        allowNull: false,
        type: DataTypes.BOOLEAN,
      },
    },
    {
      sequelize,
      modelName: "Messages",
      schema: "public",
    }
  );

  Message.belongsTo(Chat, { foreignKey: "chat_id" });
  Message.belongsTo(User, { foreignKey: "sender_id" });

  return Message;
};

export default Message;

import { DataTypes, Sequelize, Model } from "sequelize";
import Chat from "./chat";
import { User } from "./user";
interface MemberAtttibute {
  id?: number;
  chat_id: number;
  user_id: number;
  Chat?: Chat;
  Users?: User;
}

export class Member extends Model<MemberAtttibute> implements MemberAtttibute {
  public id!: number;
  public chat_id!: number;
  public user_id!: number;
  public Chat?: Chat;
  public Users?: User;
}

export const MemberModel = (sequelize: Sequelize): typeof Member => {
  Member.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      chat_id: {
        type: DataTypes.INTEGER,
        references: {
          model: "Chats",
          key: "id",
        },
      },
      user_id: {
        type: DataTypes.INTEGER,
        references: {
          model: "Users", // The model that chat_id references
          key: "id", // The column in the Chat model that chat_id references
        },
      },
    },
    {
      sequelize,
      modelName: "Member",
      schema: "public",
    }
  );

  Member.belongsTo(Chat, { foreignKey: "chat_id" });
  Member.belongsTo(User, { foreignKey: "user_id" });

  return Member;
};

export default Member;

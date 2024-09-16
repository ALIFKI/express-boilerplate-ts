import { User } from "@/models/user";
import bcrypt from "bcryptjs";

export class UserService {
  public async getAllUsers() {
    return await User.findAll();
  }

  public async getUserByID(_id: number | string) {
    return await User.findByPk(_id);
  }

  public async getUserByEmail(_email: string) {
    return await User.findOne({
      where: { email: _email },
    });
  }

  public async createUser(userData: {
    name: string;
    email: string;
    password: string;
  }) {
    const hashedPassword = await bcrypt.hash(userData.password, 10);
    return await User.create({ ...userData, password: hashedPassword });
  }
}

const userService = new UserService();
export default userService;

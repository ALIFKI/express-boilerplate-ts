import { User } from "@/models/user";
import bcrypt from "bcryptjs";

export class UserService {
  public async getAllUsers() {
    return await User.findAll();
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

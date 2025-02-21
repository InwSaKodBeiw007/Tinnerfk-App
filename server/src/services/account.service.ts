import { User } from "../models/user.model"
import { login, register } from "../types/account.type"
import { user } from "../types/user.type"

export const AccountService = {
  async login(username: string, password: string) {
    const user = await User.findOne({ username })
    if (!user || !user.comparePassword(password)) {
      return { success: false, message: "Invalid username or password" }
    }
    return { success: true, user }
  },

  async register(username: string, password: string, displayName: string) {
    const user = new User({ username, password, displayName })
    await user.save()
    return { success: true, user }
  }
}
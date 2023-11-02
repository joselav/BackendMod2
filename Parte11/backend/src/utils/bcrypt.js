import 'dotenv/config';
import bcrypt from 'bcrypt'

const salt = parseInt(process.env.SALT)
export const createHash = (password) => bcrypt.hashSync(password, salt)

export const validatePassword = (passwordSend, passwordBDD) => bcrypt.compareSync(passwordSend, passwordBDD)
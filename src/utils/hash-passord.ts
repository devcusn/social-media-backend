import * as bcrypt from 'bcrypt';

const saltRounds = 10;

const hashPassword = async (password: string) => {
  try {
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    return hashedPassword;
  } catch (error) {
    console.error('Error hashing password:', error);
    throw error;
  }
};

const checkPassword = async (password: string, hashedPassword: string) => {
  try {
    const result = await bcrypt.compare(password, hashedPassword);
    return result;
  } catch (error) {
    console.error('Error checking password:', error);
    throw error;
  }
};

export { hashPassword, checkPassword };

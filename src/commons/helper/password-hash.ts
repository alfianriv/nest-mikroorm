import { hashSync } from 'bcrypt';

export const hashPassword = (password: string) => {
  const salt = 10;
  return hashSync(password, salt);
};

export const authConfig = {
  secret: process.env.JWT_SECRET || "segredo",
  expiresIn: process.env.JWT_EXPIRATION || "1d",
};

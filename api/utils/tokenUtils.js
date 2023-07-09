import jwt from "jsonwebtoken";

// Generate an access token
const generateAccessToken = (userId) => {
  return jwt.sign({ userId }, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "7d",
  });
};

// Generate a refresh token
const generateRefreshToken = (userId) => {
  return jwt.sign({ userId }, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: "30d",
  });
};

export { generateAccessToken, generateRefreshToken };

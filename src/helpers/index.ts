import crypto from "crypto";

export const authentication = (salt: string, password: string): string => {
  if (!process.env.SECRET) {
    console.error("SECRET 환경 변수가 설정되지 않았습니다.");
    return "NO SECRET";
  }

  return crypto
    .createHmac("sha256", [salt, password].join("-"))
    .update(process.env.SECRET)
    .digest("hex");
};

export const random = () => crypto.randomBytes(128).toString("base64");

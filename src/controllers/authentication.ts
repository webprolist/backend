import type { Context } from "hono";
import { createUser, getUserByEmail, updateUserById } from "../db/users";
import { random, authentication } from "../helpers/index";
export const register = async (c: Context) => {
  try {
    const { username, email, password } = await c.req.json();

    if (!username || !email || !password) {
      return c.json({ error: "필수 필드가 누락되었습니다." }, 400);
    }

    const result = await getUserByEmail(email);

    if (result && result.length > 0) {
      return c.json({ error: "이미 사용 중인 이메일입니다." }, 400);
    }

    const salt = random();

    const newUser = await createUser({
      username,
      email,
      salt,
      password: authentication(salt, password)
    });

    return c.json(
      { message: "사용자가 성공적으로 등록되었습니다", user: newUser },
      200
    );
  } catch (e) {
    console.error(e);
    return c.json({ error: "등록에 실패했습니다" }, 400);
  }
};

    const expectedHash = authentication(user.salt, password);

    if (user.password !== expectedHash || expectedHash === "NO SECRET") {
      return c.json({ error: "password, expectedHash wrong" }, 403);
    }

    user.sessiontoken = authentication(random(), user.password);

    const updatedUser = await updateUserById(user.id, user);


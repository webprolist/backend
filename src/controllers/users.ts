import type { Context } from "hono";
import { getUsers, getUserByUsername } from "../db/users";

export const getAllUsers = async (c: Context) => {
  try {
    const users = await getUsers();

    return c.json(users, 200);
  } catch (e) {
    console.error(e);
    return c.json({ error: "error from get All User" }, 400);
  }
};

export const getUserInfo = async (c: Context) => {
  try {
    const username = c.req.param("username");

    const user = await getUserByUsername(username);

    return c.json({ message: "able to get user info" }, 200);
  } catch (e) {
    console.error(e);
    return c.json({ error: "error from get User Info" }, 400);
  }
};

import { random, authentication } from "../helpers/index";

    const salt = random();

    const newUser = await createUser({
      username,
      email,
      salt,
      password: authentication(salt, password)

    const expectedHash = authentication(user.salt, password);

    if (user.password !== expectedHash || expectedHash === "NO SECRET") {
      return c.json({ error: "password, expectedHash wrong" }, 403);
    }

    user.sessiontoken = authentication(random(), user.password);

    const updatedUser = await updateUserById(user.id, user);


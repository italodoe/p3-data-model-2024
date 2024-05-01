import { findAllUsers } from "../../src/users";

try {
  const users = await findAllUsers();
  users.forEach((value, key) => {
    console.log(`User ${key + 1}  >>    `, value, `\n`);
  });
} catch (error) {
  console.error(error);
}

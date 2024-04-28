import { findAllUsers } from "../../src/users";

const users = await findAllUsers();

users.forEach((value, key) => {
    console.log(`User ${key+1}  >>    `, value, `\n`)
}) 

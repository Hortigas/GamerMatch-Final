import { createUserDB } from "../db/users";

export default async (req:any, res:any) => {
    const {user_name, user_email, user_password} = req.body
    const createUser = await createUserDB(user_name, user_email, user_password)
    res.json({result: createUser})
}
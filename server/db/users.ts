import { prisma } from "./db";
export async function getUsersDB(){
    return prisma.public_user.findMany();
}

export async function createUserDB(user_name: string, user_email: string, user_password: string ){
    return prisma.public_user.create({
        data:{
            user_name,
            user_email,
            user_password
        }
    })
}
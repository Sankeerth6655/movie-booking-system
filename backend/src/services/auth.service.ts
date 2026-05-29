import bcrypt from "bcryptjs";
import jwt  from "jsonwebtoken";
import { User } from "../models/user.model";

const SALT_ROUNDS = 10;

export async function hashPassword(password:string):Promise<string>{
    return  bcrypt.hash(password,SALT_ROUNDS);
}

export async function verifyPassword(password:string,passwordHash:string):Promise<void>{
    const ok =await bcrypt.compare(password,passwordHash);
    if(!ok) throw new Error("Invalid username or password!!");
}

export function createToken(username:string,role:string):string{
    return jwt.sign({username,role},process.env.JWT_SECRET as string);
}


//login function
    //username and password will be sent to login
    //finds the username in db and gets role and passwordHash 
    //checks the password and passwordHash 
    //generates the token based on username and role
    //returns userid, username, role and token

export async function loginUser(username:string,password:string):Promise<{
    user:{
        userId:string,
        username:string,
        role:string
    },
    token:string
}>{
    const user = await User.findOne({username}).select('username passwordHash role').lean();
    if(!user) throw new Error("Invalid username or password!!");

    await verifyPassword(password,user.passwordHash);

    return {
        user:{
            userId:user._id.toString(),
            username:user.username,
            role:user.role
        },
        token:createToken(user.username,user.role)
    }
}

//register
    //take username,password,role
    //check if username already exists in database, if yes then throw error
    //hash the password
    //store username, password and role in db
    //return details
export async function registerUser(username:string,password:string,role:string):Promise<{
        userId:string,
        username:string,
        role:string
}>{
    const existing = await User.findOne({username});
    if(existing) throw new Error("Username already exists!!");

    const passwordHash = await hashPassword(password);

    const user = await User.create({
        username:username,
        passwordHash:passwordHash,
        role:role
    });

    return {
        userId:user._id.toString(),
        username:user.username,
        role:user.role
    }
}
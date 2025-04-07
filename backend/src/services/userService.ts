import { userModel } from "../models/userModel";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { orderModel } from "../models/orderModel";
interface RegisterParams {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}
//Applying encapsulation
//All the register business logic.
export const register = async ({
  firstName,
  lastName,
  email,
  password,
}: RegisterParams) => {
  //email:email is the same as email only in js.
  const findUser = await userModel.findOne({ email });
  if (findUser) {
    //Do not register
    return { data: "User already exists!", statusCode: 400 };
  }
  //encrypt the password
  //satltRounds => number of rounds to encrypt the password.
  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = new userModel({
    firstName,
    lastName,
    email,
    password: hashedPassword,
  });
  //save() is also a promise.
  await newUser.save();
  return { data: generateJWT({ firstName, lastName, email }), statusCode: 200 };
};

interface LoginParams {
  email: string;
  password: string;
}

export const login = async ({ email, password }: LoginParams) => {
  const findUser = await userModel.findOne({ email });
  if (!findUser) {
    return { data: "Invalid email or password!", statusCode: 400 };
  }

  const matchPassword = await bcrypt.compare(password, findUser.password);
  if (matchPassword) {
    return {
      data: generateJWT({
        firstName: findUser.firstName,
        lastName: findUser.lastName,
        email,
      }),
      statusCode: 200,
    };
  }
  return { data: "Invalid email or password!", statusCode: 400 };
};
interface MyOrdersParams{
  userId: string;
}
export const getMyOrders = async({userId} : MyOrdersParams)=>{
  try{
    return { data : await orderModel.find({userId}), statusCode:200}
  }catch(err){
    throw err;
  }
}
//will take any type of data
const generateJWT = (data: any) => {
  //sign is the function that will generate the encrypted token.
  //takes options too {expiresIn:'24h'}
  return jwt.sign(data, process.env.JWT_SECRET || "");
};

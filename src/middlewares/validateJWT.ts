import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { userModel } from "../models/userModel";


export interface ExtendRequest extends Request{
  //Optional user property.
   user?:any;
}
export const validateJWT = (
  req: ExtendRequest,
  res: Response,
  next: NextFunction
) => {
  //req.get() => gets everything in the header request.
  //authorization header has the bearer token  .
  const authorizationHeader = req.get("authorization");
  //check the authorization header beacause if it does not exist we will not proceed the request.
  if (!authorizationHeader) {
    //403 Forbidden .
    res.status(403).send("Autorizatin header was not provided!");
    return;
  }
  //bearer space  token
  const bearerToken = authorizationHeader.split(" ");
  const token = bearerToken[1];
  if (!token) {
    res.status(403).send("Bearer is not found");
    return;
  }

  //verify takes the token , secret key
  //This will verify whether the token has been created before or not.
  //callback function that will does the validation .
  //payload is the data that we used while generation the token.
  //payload will have te decrypted data.
  jwt.verify(token, "4SAt8eRJ1rZ06y3qzkczLSzt9C9RpHeg", async (err, payload) => {
    //the token is from another server(another secret key) OR token my be expired or invalid.
    if (err) {
      res.status(403).send("Invalid Token!");
      return;
    }
    if (!payload) {
      res.status(403).send("Invalid Token Payload!");
      return;
    }
    //to avid types errors
    const userPayload = payload as {
      email: string;
      firstName: string;
      lastName: string;
    };
    //Fetch user from database based on payload.
    const user = await userModel.findOne({ email: userPayload.email });

//  In Express applications (especially with authentication systems like JWT), middleware often attaches a user object to req (request).
// For example, when verifying a token, we might store user info in req.user.
// But by default, TypeScript doesn't recognize req.user, so extending Request solves this.
    req.user = user;
    next();
  });
};

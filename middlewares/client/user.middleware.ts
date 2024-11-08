import { NextFunction, Request, Response } from "express";
import { User } from "../../models/user.model";

export const requireAuth = async (
  req: Request, 
  res: Response, 
  next: NextFunction
) => {
  if(!req.headers.authorization) {
    res.json({
      code: "error",
      message: "Vui lòng gửi kèm theo token!"
    });
    return;
  }

  const token = req.headers.authorization.split(" ")[1];

  const existUser = await User.findOne({
    token: token,
    deleted: false
  });

  if(!existUser) {
    res.json({
      code: "error",
      message: "Token không hợp lệ!"
    });
    return;
  }

  req["user"] = existUser;

  next();
}
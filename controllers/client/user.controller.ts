import { Request, Response } from "express";
import { User } from "../../models/user.model";
import md5 from "md5";

export const register = async (req: Request, res: Response) => {
  const user = req.body;

  const existUser = await User.findOne({
    email: user.email,
    deleted: false
  });

  if(existUser) {
    res.json({
      code: "error",
      message: "Email đã tồn tại trong hệ thống!"
    });
    return;
  }

  const dataUser = {
    fullName: user.fullName,
    email: user.email,
    password: md5(user.password),
    token: generateHelper.generateRandomString(30)
  };

  const newUser = new User(dataUser);
  await newUser.save();

  res.json({
    code: "success",
    message: "Đăng ký thành công!",
    token: newUser.token
  })
}
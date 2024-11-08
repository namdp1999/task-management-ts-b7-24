import { Request, Response } from "express";
import { User } from "../../models/user.model";
import md5 from "md5";
import { generateRandomString } from "../../helpers/generate.helper";

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
    token: generateRandomString(30)
  };

  const newUser = new User(dataUser);
  await newUser.save();

  res.json({
    code: "success",
    message: "Đăng ký thành công!",
    token: newUser.token
  })
}

export const login = async (req: Request, res: Response) => {
  const email = req.body.email;
  const password = req.body.password;

  const existUser = await User.findOne({
    email: email,
    deleted: false
  });

  if(!existUser) {
    res.json({
      code: "error",
      message: "Email không tồn tại trong hệ thống!"
    });
    return;
  }

  if(md5(password) != existUser.password) {
    res.json({
      code: "error",
      message: "Sai mật khẩu!"
    });
    return;
  }

  // if(existUser.status != "active") {
  //   res.json({
  //     code: "error",
  //     message: "Tài khoản đang bị khóa!"
  //   });
  //   return;
  // }

  res.json({
    code: "success",
    message: "Đăng nhập thành công!",
    token: existUser.token
  })
}

export const profile = async (req: Request, res: Response) => {
  const token = req.body.token;

  if(!token) {
    res.json({
      code: "error",
      message: "Vui lòng gửi kèm theo token!"
    });
    return;
  }

  const user = await User.findOne({
    token: token,
    deleted: false
  }).select("id fullName email");

  if(!user) {
    res.json({
      code: "error",
      message: "Token không hợp lệ!"
    });
    return;
  }

  res.json({
    code: "success",
    message: "Thành công!",
    data: user
  });
}
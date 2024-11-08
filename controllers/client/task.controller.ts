import { Request, Response } from "express";
import { Task } from "../../models/task.model";

export const index = async (req: Request, res: Response) => {
  const find = {
    deleted: false
  };

  if(req.query.status) {
    find["status"] = req.query.status;
  }

  // Sort
  const sort = {};
  if(req.query.sortKey && req.query.sortValue) {
    sort[`${req.query.sortKey}`] = req.query.sortValue;
  }
  // End Sort

  // Phân trang
  let limitItems = 4;
  let page = 1;

  if(req.query.page) {
    page = parseInt(`${req.query.page}`);
  }

  if(req.query.limit) {
    limitItems = parseInt(`${req.query.limit}`);
  }

  const skip = (page - 1) * limitItems;
  // Hết Phân trang

  // Tìm kiếm
  if(req.query.keyword) {
    const regex = new RegExp(`${req.query.keyword}`, "i");
    find["title"] = regex;
  }
  // Hết Tìm kiếm

  const tasks = await Task
    .find(find)
    .limit(limitItems)
    .skip(skip)
    .sort(sort);

  res.json(tasks);
}

export const detail = async (req: Request, res: Response) => {
  const id: string = req.params.id;

  const task = await Task.findOne({
    _id: id,
    deleted: false
  });

  res.json(task);
}

export const changeMultiPatch = async (req: Request, res: Response) => {
  const status = req.body.status;
  const ids = req.body.ids;

  await Task.updateMany({
    _id: { $in: ids }
  }, {
    status: status
  });

  res.json({
    code: "success",
    message: "Thành công!"
  })
}
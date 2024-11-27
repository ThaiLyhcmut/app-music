import { Request,Response } from "express"
export const index = async (req: Request, res: Response) => {
  res.render("admin/page/dashboard/index", {
    pageTitle: "Trang tong quan",
  })
}
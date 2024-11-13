
import express, { Express, Request, Response } from "express";
import dotenv from "dotenv"
import { connect } from "./config/database"
dotenv.config()

connect(process.env.MONGO_URL)

const app: Express = express();
const port = process.env.MONGO_URL;

app.set('views', `${__dirname}/views`); // Tìm đến thư mục tên là views
app.set('view engine', 'pug'); // template engine sử dụng: pug

app.get("/topics", (req: Request, res: Response) => {
  res.render("client/page/topics/index");
});

app.listen(port, () => {
  console.log(`website đang chạy localhot: http://localhost:${port}`)
})
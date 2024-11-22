
import express, { Express, Request, Response } from "express";
import dotenv from "dotenv"
import bodyParser from "body-parser";
import { connect } from "./config/database"
import { RoutesClient } from "./routes/client/index.route";
dotenv.config()

connect(process.env.MONGO_URL)

const app: Express = express();
const port = process.env.PORT;

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))

app.set('views', `${__dirname}/views`); // Tìm đến thư mục tên là views
app.set('view engine', 'pug'); // template engine sử dụng: pug
app.use(express.static(`${__dirname}/public`))

RoutesClient(app)

app.listen(port, () => {
  console.log(`website đang chạy localhot: http://localhost:${port}`)
})


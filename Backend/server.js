const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();
const fs = require("fs");
const app = express();
app.use(cookieParser());
app.use(express.json());
app.use(cors());
const path = require("path");

/*beispielanfang
let allowed = ["http://localhost:3000", "some other link"];
function options(req, res) {
  let tmp;
  let origin = req.header("Origin");
  if (allowed.indexOf(origin) > -1) {
    tmp = {
      origin: true,
      optionSuccessStatus: 200,
    };
  } else {
    tmp = {
      origin: "not working",
    };
  }
  res(null, tmp);
}
beispielende*/
//routes
app.use(express.static(path.join(__dirname, "build")));
const useRoutes = require("./routes/routes");
app.use("/api", useRoutes);
//fs.readdirSync("./routes").map((r) => app.use("./", require("./routes/" + r)));

//database
mongoose.set("strictQuery", true);
mongoose
  .connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
  })
  .then(() => console.log("database connected successfully"))
  .catch((err) => console.log("error Connecting to mongodb", err));

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});

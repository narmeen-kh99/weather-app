const express = require("express");
const path = require("path");
const api = require("./api");
const bodyParser = require("body-parser");
const weather = require("./model/weather");
const app = express();
const port = 4200;
var cors = require("cors");
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, "node_modules")));
app.use("/", api);

app.listen(port, function () {
  console.log(`Running server on port ${port}`);
  console.log("111111111111111111");
});
/*for (expense of expensesData) {
  const newExpense = new Expenses({
    item: expense.item,
    amount: expense.amount,
    date: expense.date,
    group: expense.group,
  });
  newExpense.save();
  console.log(newExpense);
}*/

const express = require("express");
const path = require("path");
const app = express();
app.use(express.urlencoded({ extended: true }));

let operation = null;

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "home.html"));
});

app.get("/register", (req, res) => {
  res.sendFile(path.join(__dirname, "register.html"));
});

app.get("/operation/:type", (req, res) => {
  operation = req.params.type;
  res.sendFile(path.join(__dirname, "operation.html"));
});

app.post("/postRegister", (req, res) => {
  htmlResponse = `
  <html><head>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet"
      integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3" crossorigin="anonymous">
    <title>Node Assignments</title>
    <style>
      body {
        background: linear-gradient(to right, #2b5876, #4e4376);
      }
      .container {
        margin-top: 25vh; background-color: #fff;
        border-radius: 10px; padding: 25px;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <h1>User Details</h1>
      <table class="table">
        <thead class="thead-light">
          <tr>
            <th scope="col">Username</th>
            <th scope="col">Email</th>
            <th scope="col">Password</th>
            <th scope="col">DOB</th>
            <th scope="col">City</th>
            <th scope="col">Country</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>${req.body.username}</td>
            <td>${req.body.email}</td>
            <td>${req.body.password}</td>
            <td>${req.body.dob}</td>
            <td>${req.body.city}</td>
            <td>${req.body.country}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </body>
  </html>`;
  res.send(htmlResponse);
});

app.post("/postOperation", (req, res) => {
  const number1 = parseInt(req.body.number1);
  const number2 = parseInt(req.body.number2);
  let result = null;
  if (operation === "add") result = number1 + number2;
  else if (operation === "minus") result = number1 - number2;
  else if (operation === "multiply") result = number1 * number2;
  else if (operation === "divide") result = number1 / number2;
  else result = NaN;
  res.send(`
  <html lang="en">
    <head>
      <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet"
        integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3" crossorigin="anonymous">
      <title>Node Assignments</title>
      <style>
        body {background: linear-gradient(to right, #2b5876, #4e4376);}
        td {font-weight: bold;}
        .container {
          margin-top: 25vh;
          background-color: #fff;
          border-radius: 10px;
          padding: 25px;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <h1>Operation Details</h1>
        <table class="table">
          <thead class="thead-light">
            <tr>
              <th scope="col">Number 1</th>
              <th scope="col">Number 2</th>
              <th scope="col">Operation</th>
              <th scope="col">Result</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>${number1}</td>
              <td>${number2}</td>
              <td>${operation}</td>
              <td>${result}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </body>
    </html>
  `);
});
app.listen(3001);
console.log("Server running...\nVisit: http://localhost:3001");

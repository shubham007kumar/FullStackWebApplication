const express = require('express')
const db = require('./src/Config/db.js')
const cors = require('cors')
const PORT = process.env.PORT || 3002
const app = express()
app.use(cors())
app.use(express.json())

app.post("/create", (req, res) => {
    const {id,name,email,phone,date,location,job,imageurl} = req.body
    db.query(
      "INSERT INTO user (id,name,email,phone,date,location,job,imageurl) VALUES (?,?,?,?,?,?,?,?)",
      [id,name,email,phone,date,location,job,imageurl],
      (err, result) => {
        if (err) {
          console.log(err);
        } else {
          res.send("Values Inserted");
        }
      }
    );
  });


  app.get("/user", (req, res) => {
    db.query("SELECT * FROM user", (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    });
  });


  app.delete("/delete/:id", (req, res) => {
    const id = req.params.id;
    db.query("DELETE FROM user WHERE id = ?", id, (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    });
  });

  app.get("/particularUser/:id", (req, res) => {
    const id = req.params.id;
    db.query("SELECT * FROM user WHERE id = ?", id, (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    });
  });

  app.put("/update/:id", (req, res) => {
    const id = req.params.id;
    const {name,email,phone,date,location,job,imageurl} = req.body
    db.query(
      "UPDATE user SET name = ?,email = ?,phone = ?,date = ?,location = ?,job = ?, imageurl = ? WHERE id = ?",
      [name,email,phone,date,location,job,imageurl,id],
      (err, result) => {
        if (err) {
          console.log(err);
        } else {
          res.send(result);
        }
      }
    );
  });
app.listen(PORT,  () => {
    console.log(`Server started at ${PORT} Port`)
})
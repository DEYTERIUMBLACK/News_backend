const express = require("express");
const bodyParser = require("body-parser");
const crypto = require("crypto");
require("dotenv").config();
const user = require("./db.js");
const publisher = require("./db.js");
const news = require("./db.js");
const cors = require("cors");
const app = express();
app.use(bodyParser.json());
app.use(cors());
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`app listening on PORT:${PORT}`);
});
app.get("/users", (req, res) => {
  if (user.length == 0) {
    res.status(204).send({
      message: "empty array",
    });
  } else {
    res.status(200).send(user);
  }
});
app.get("/users/:id", (req, res) => {
  const { id } = req.params;
  const data = user.find((x) => x.id == id);
  if (data !== undefined) {
    res.status(200).send(data);
  } else {
    res.status(204).send("data not found!");
  }
});
app.delete("/users/:id", (req, res) => {
  const { id } = req.params;
  const idx = user.findIndex((x) => x.id == id);
  if (idx === -1) {
    res.send({
      message: "data not found!",
    });
  } else {
    res.status(200).send({
      message: "data deleted successfully",
      data: user.splice(idx, 1),
    });
  }
});
app.post("/users", (req, res) => {
  const { username, fullname, avatar, email, password, isAdmin } = req.body;

  const newProduct = {
    id: crypto.randomUUID(),
    username,
    fullname,
    avatar,
    email,
    password,
    isAdmin,
  };

  user.push(newProduct);
  res.status(201).send({
    message: "data posted successfully",
    data: newProduct,
  });
});
app.put("/users/:id", (req, res) => {
  const { id } = req.params;
  const { username, fullname, avatar, email, password, isAdmin } = req.body;
  const data = user.find((x) => x.id == id);
  const updatedData = {
    id: data.id,
  };
  if (username !== undefined) {
    updatedData.username = username;
  }
  if (fullname !== undefined) {
    updatedData.fullname = fullname;
  }
  if (avatar !== undefined) {
    updatedData.avatar = avatar;
  }
  if (email !== undefined) {
    updatedData.email = email;
  }
  if (password != undefined) {
    updatedData.password = password;
  }
  if (isAdmin !== undefined) {
    updatedData.isAdmin = isAdmin;
  }

  const idx = user.findIndex((x) => x.id == id);
  user[idx] = updatedData;

  res.send({
    message: "data updated successfully!",
    data: updatedData,
  });
});
app.patch("/users/:id", (req, res) => {
  const { id } = req.params;
  const { username, fullname, avatar, email, password, isAdmin } = req.body;
  const data = user.find((x) => x.id == id);

  if (username !== undefined) {
    data.username = username;
  }
  if (fullname !== undefined) {
    data.fullname = fullname;
  }
  if (avatar !== undefined) {
    data.avatar = avatar;
  }
  if (email !== undefined) {
    data.email = email;
  }
  if (password !== undefined) {
    data.password = password;
  }
  if (isAdmin !== undefined) {
    data.isAdmin = isAdmin;
  }

  res.send({
    message: "data updated successfully!",
    data,
  });
});
app.get("/publishers", (req, res) => {
  if (publisher.length == 0) {
    res.status(204).send({
      message: "empty array",
    });
  } else {
    res.status(200).send(publisher);
  }
});
app.get("/publishers/:id", (req, res) => {
  const { id } = req.params;
  const data = publisher.find((x) => x.id == id);
  if (data !== undefined) {
    res.status(200).send(data);
  } else {
    res.status(204).send("data not found!");
  }
});
app.delete("/publishers/:id", (req, res) => {
  const { id } = req.params;
  const idx = publisher.findIndex((x) => x.id == id);
  if (idx === -1) {
    res.send({
      message: "data not found!",
    });
  } else {
    res.status(200).send({
      message: "data deleted successfully",
      data: publisher.splice(idx, 1),
    });
  }
});
app.post("/publishers", (req, res) => {
  const { username, password, email, thumbnail, avatar, fullname } = req.body;
  const newProduct = {
    id: crypto.randomUUID(),
    username,
    password,
    email,
    thumbnail,
    avatar,
    fullname,
    joinedDate: new Date(),
  };

  publisher.push(newProduct);
  res.status(201).send({
    message: "data posted successfully",
    data: newProduct,
  });
});
app.put("/publishers/:id", (req, res) => {
  const { id } = req.params;
  const { username, password, email, thumbnail, avatar, fullname } = req.body;
  const data = user.find((x) => x.id == id);
  const updatedData = {
    id: data.id,
    joinedDate: data.joinedDate,
  };
  if (username !== undefined) {
    updatedData.username = username;
  }
  if (password !== undefined) {
    updatedData.password = password;
  }
  if (email !== undefined) {
    updatedData.email = email;
  }
  if (thumbnail !== undefined) {
    updatedData.thumbnail = thumbnail;
  }
  if (avatar !== undefined) {
    updatedData.avatar = avatar;
  }
  if (fullname !== undefined) {
    updatedData.fullname = fullname;
  }
  const idx = publisher.findIndex((x) => x.id == id);
  publisher[idx] = updatedData;

  res.send({
    message: "data updated successfully!",
    data: updatedData,
  });
});
app.patch("/publishers/:id", (req, res) => {
  const { id } = req.params;
  const { username, password, email, thumbnail, avatar, fullname, joinedDate } =
    req.body;
  const data = user.find((x) => x.id == id);

  if (username !== undefined) {
    updatedData.username = username;
  }
  if (password !== undefined) {
    updatedData.password = password;
  }
  if (email !== undefined) {
    updatedData.email = email;
  }
  if (thumbnail !== undefined) {
    updatedData.thumbnail = thumbnail;
  }
  if (avatar !== undefined) {
    updatedData.avatar = avatar;
  }
  if (fullname !== undefined) {
    updatedData.fullname = fullname;
  }
  if (joinedDate !== undefined) {
    updatedData.joinedDate = joinedDate;
  }

  res.send({
    message: "data updated successfully!",
    data,
  });
});
app.get("/news", (req, res) => {
  if (news.length == 0) {
    res.status(204).send({
      message: "empty array",
    });
  } else {
    res.status(200).send(news);
  }
});
app.get("/news/:id", (req, res) => {
  const { id } = req.params;
  const data = news.find((x) => x.id == id);
  if (data !== undefined) {
    res.status(200).send(data);
  } else {
    res.status(204).send("data not found!");
  }
});
app.delete("/news/:id", (req, res) => {
  const { id } = req.params;
  const idx = news.findIndex((x) => x.id == id);
  if (idx === -1) {
    res.send({
      message: "data not found!",
    });
  } else {
    res.status(200).send({
      message: "data deleted successfully",
      data: user.splice(idx, 1),
    });
  }
});
app.post("/news", (req, res) => {
  const { title, linkURL, thumbnail, newsBody } = req.body;

  const newProduct = {
    id: crypto.randomUUID(),
    title,
    createdAt: new Date(),
    linkURL,
    thumbnail,
    newsBody,
  };

  news.push(newProduct);
  res.status(201).send({
    message: "data posted successfully",
    data: newProduct,
  });
});
app.put("/news/:id", (req, res) => {
  const { id } = req.params;
  const { title, linkURL, thumbnail, newsBody } = req.body;
  const data = news.find((x) => x.id == id);
  const updatedData = {
    id: data.id,
    joinedDate: data.joinedDate,
  };
  if (title !== undefined) {
    updatedData.title = title;
  }
  if (linkURL !== undefined) {
    updatedData.linkURL = linkURL;
  }
  if (thumbnail !== undefined) {
    updatedData.thumbnail = thumbnail;
  }
  if (newsBody !== undefined) {
    updatedData.newsBody = newsBody;
  }
  const idx = news.findIndex((x) => x.id == id);
  news[idx] = updatedData;

  res.send({
    message: "data updated successfully!",
    data: updatedData,
  });
});
app.patch("/news/:id", (req, res) => {
  const { id } = req.params;
  const { title, linkURL, thumbnail, newsBody } = req.body;
  const data = news.find((x) => x.id == id);

  if (title !== undefined) {
    updatedData.title = title;
  }
  if (linkURL !== undefined) {
    updatedData.linkURL = linkURL;
  }
  if (thumbnail !== undefined) {
    updatedData.thumbnail = thumbnail;
  }
  if (newsBody !== undefined) {
    updatedData.newsBody = newsBody;
  }

  res.send({
    message: "data updated successfully!",
    data,
  });
});
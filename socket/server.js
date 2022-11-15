const express = require("express");
const app = express();
const {graphqlHTTP} = require("express-graphql");
const ser = require("http").createServer(app);
const port = process.env.PORT || 3001;
const path = require("path");
const socket = require("socket.io");
const io = socket(ser);
const DB = require("mongodb");
const mongoose =  require("mongoose");
const DBurl = "mongodb+srv://root:root@cluster0.ns55i.mongodb.net/?retryWrites=true&w=majority"
const newSchema = require("./models/schema.js");
const fs = require("fs");
const uuid = require("uuid");
const cors = require("cors");
app.use(cors());
const router = express.Router();
app.use(router);
//////////////////////////////////////////////////////  ROOT    /////////////////////////////


const root = {
 getAllUsers: () => {
   return users
 },

 getUser: ({id})=>{
  return users.find(user => user.id == id)
 }
}

/////////////////////////////////////////////////////////////////////////////////////////////

const graphSchema = require("./graphScjema");
app.use('/graphql', graphqlHTTP({
 graphiql: true,
 schema: graphSchema,
 rootValue: root
}))





app.get('/:id', (req, res)=>{
  let filepath = path.join(__dirname, req.url === '/' ? "front/index.html" : `front/${req.params.id}`);
  const ext = path.extname(filepath);
  if (!ext) {filepath += ".html"};
  res.sendFile(filepath);
})

// app.get('/chat', (req, res)=>{
//  res.sendFile(path.join(__dirname, 'front/chat.html'));
// });

app.use(express.static(__dirname + '/front'));



io.on("connection", (socket)=>{
  socket.on("chat message", data=>{
   io.emit("chat message", {
    message: data.message,
    name: data.name  
   })
    const newNewSchema = new newSchema({
      _id: uuid.v4(),
      name: data.name,
      message: data.message
    })
    //console.log(newNewSchema._id);
    newNewSchema.save();
  });
});





serverConnection = () => {
  ser.listen(port, (err)=>{
    if (err) {throw err};
    console.log("server connected");
   });
   mongoose.connect(DBurl, (err)=>{
    if (err) {throw err}
    console.log("mongo connected");
  });
}
serverConnection();
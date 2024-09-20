const express = require("express");
const {singers} = require("./singers.json");

const app = express();


app.get("/",(req,res) => {
    res.send("網站主頁")
})

app.get("/singer/:id.html",(req,res) => {
    const {id} = req.params;
    const result = singers.find(singer => {
        if(singer.id == id){
            return true;
        }
    });
    console.log(result);
    if(!result){
        res.send("<h1>404 - 找不到此頁面</h1>")
        return;
    }
    res.send(`<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta
        name="viewport"
        content="width=device-width, initial-scale=1.0"
    >
    <title>歌手：${result.singer_name}</title>
    <style>
        img {
            width: 100%;
        }
    </style>
</head>

<body>
    <h1>${result.singer_name}</h1>
    <h3>${result.singer_id}</h3>
    <img
        src="${result.singer_img}"
        alt=""
    >
</body>

</html>`)
})


app.all("*",(req,res) => {
    res.send("404")
})

app.listen(3000, () => {
    console.log("running at http://localhost:3000");
})
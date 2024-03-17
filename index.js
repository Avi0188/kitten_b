const express = require("express")
const connection = require("./config/db")
const userRouter = require("./routes/user.route")
const gameRouter = require("./routes/game.route")
const cardRouter = require("./routes/card.route")
const cors =require("cors")
const app = express()

app.use(express.json())
app.use(cors())
app.use("/user",userRouter)
app.use("/game", gameRouter)
app.use("/card", cardRouter)
app.listen(8000, async ()=>{
    try {
        await connection
        console.log("server is running at port 8000");
    } catch (error) {
        
    }
})
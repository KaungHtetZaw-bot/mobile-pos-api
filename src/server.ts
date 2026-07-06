import express from "express";

const app = express()
const PORT = 8080

app.get("/" , ( req, res ) => {
    res.send('Hello World! Your Express server is running.');
})

app.listen(PORT, ()=> {
    console.log(`Server is successfully running on http://localhost:${PORT}`)
})

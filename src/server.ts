import app from "./app"

const PORT = 8080

app.listen(PORT, ()=> {
    console.log(`Server is successfully running on http://localhost:${PORT}`)
})

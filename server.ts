import { app } from "./src/app";
import dotenv from 'dotenv';
import "reflect-metadata";

dotenv.config()

const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
    console.log(`Running on http://localhost:${PORT}`)
})
import app from "./app.js";
import {connectDb} from "./model/connection.js";
import "dotenv/config";

const PORT = process.env.PORT || 3000;

function start() {
    try {
        connectDb().then(() => console.log("Connected to database"));

        app.listen(PORT, () => {
            console.log(`Server is running on PORT ${PORT}`)
        })
    }
    catch (err) {
        console.log(`Startup error : ${err}`);
        process.exit(1);
    }
}

start();
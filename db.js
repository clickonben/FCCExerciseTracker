import db from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

(async () => {
    try {
        await db.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })  ;
        console.log("connected to database succesfully");
    } catch (error) {
        console.log("failed to connect to database", error);
    }
})();

export default db;
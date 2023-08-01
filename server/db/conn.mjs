// import { MongoClient } from "mongodb";
//
// const connectionString = process.env.ATLAS_URI || "";
//
// const client = new MongoClient(connectionString);
//
// let conn;
// let db;
//
// const connectDB = async () => {
//     try {
//         console.log("Connecting to MongoDB Atlas...");
//         conn = await client.connect();
//         console.log("Connected to MongoDB Atlas");
//         db = conn.db("opt");
//         console.log("db connection set up", db)
//     } catch(e) {
//         console.error(e);
//     }
// }
//
// connectDB();
//
// export default db;

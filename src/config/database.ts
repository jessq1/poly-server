import mongoose from 'mongoose'
import logger from "./logger";

const db = mongoose.connection
const dbUrl = process.env.DATABASE_URL

mongoose.connect(dbUrl).
    catch(error => {
        logger.error("Could not connect to db")
        process.exit(1)
    });

// database connection event
db.on('connected', function () {
  console.log(`Connected to MongoDB ${db.name} at ${db.host}:${db.port}`)
})
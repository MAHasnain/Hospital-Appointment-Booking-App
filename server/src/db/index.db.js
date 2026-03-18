import mongoose from "mongoose";
import logger from "../../logger/winston.logger.js";

import dns from 'node:dns';
dns.setServers(['8.8.8.8', '1.1.1.1']);

const DB_NAME = 'hospital_appointment_system';
const connectDB = async () => {
    try {
        const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}${DB_NAME}`);
        logger.info(`🍀 MongoDB connected! DB HOST: ${connectionInstance.connection.host}`);

    } catch (error) {
        logger.error(`❌ MONGODB connection error: ${error}`);
        process.exit(1);
    }
}

export default connectDB
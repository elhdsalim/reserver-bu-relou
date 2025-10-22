import { handleAvailability, verify } from "./affluences.js";
import cron from "node-cron";
import { Pushover } from "pushover-js";
import dotenv from 'dotenv';
dotenv.config();

const pushover = new Pushover(process.env.PO_USER!, process.env.PO_TOKEN!)

const DATE = "2025-10-23";
const HOUR = "15:00";
const DURATION = "120";

(async() => {
    const job = cron.schedule("*/5 * * * * *", async () => {
        const availability = await verify(DATE, HOUR, DURATION);
        await handleAvailability(availability, job, pushover);
    });
})();
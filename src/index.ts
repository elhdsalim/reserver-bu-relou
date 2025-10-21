import { verify } from "./affluences.js";
import cron from "node-cron";

const DATE = "2025-10-22";
const HOUR = "15:00";
const DURATION = "120";

(async() => {
    const job = cron.schedule("*/5 * * * * *", async () => {
        const hey = await verify(DATE, HOUR, DURATION);
        console.log(new Date().toISOString(), hey)
    });
})();
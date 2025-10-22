import axios from 'axios';
import type { AvailabilityResource } from './types.js';
import type { ScheduledTask } from 'node-cron';
import type { Pushover } from 'pushover-js';

const ENDPOINT = "https://reservation.affluences.com/api/resources/52ca9bef-5796-43c0-a12a-80d9fb3fc0d3/available?"

async function checkAvailability(date : string, start_hour : string, duration : string) : Promise<AvailabilityResource[]> {
    const URL = `${ENDPOINT}date=${date}&start_hour=${start_hour}&duration=${duration}&type=1`
    const { data } = await axios.get(URL);

    return data;
}


export async function verify(date : string, hour : string, duration : string) : Promise<AvailabilityResource[]|null> {
    const availability = await checkAvailability(date, hour, duration) // we could use the current hour, i'll put a default option later
    const available = availability.filter((r: AvailabilityResource) => r.slots_state === "available");

    if (available.length > 0) {
        return availability;
    }

    return null;
}

export async function handleAvailability(availability : AvailabilityResource[] | null, job : ScheduledTask, pushover : Pushover) : Promise<any> {
    if (availability) {
        console.log(new Date().toISOString(), availability);
        const roomName = availability[0]?.resource_name
        
        await pushover.setSound('cashregister')
        .setPriority(1, 60, 30)
        .setHtml()
        .send("Une salle s'est libérée", roomName);
        
        job.stop();
    }
}
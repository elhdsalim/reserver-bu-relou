import axios from 'axios';
import type { AvailabilityResource } from './types.js';

const ENDPOINT = "https://reservation.affluences.com/api/resources/52ca9bef-5796-43c0-a12a-80d9fb3fc0d3/available?"
// add date=2025-10-21&start_hour=16:00&duration=60&type=1

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
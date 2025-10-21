import axios from 'axios';

const ENDPOINT = "https://reservation.affluences.com/api/resources/52ca9bef-5796-43c0-a12a-80d9fb3fc0d3/available?"
// add date=2025-10-21&start_hour=16:00&duration=60&type=1

async function checkAvailability(date : string, start_hour : string, duration : string) {
    const URL = `${ENDPOINT}date=${date}&start_hour=${start_hour}&duration=${duration}&type=1`

    const {data} = await axios.get(URL);


    return data;
}


export async function verify(date : string, hour : string, duration : string) {
    const availability = await checkAvailability(date, hour, duration) // we could use the current hour, i'll put a default option later
    const available = availability.filter((r: any) => r.slots_state === "available");

    if (available.length > 0) {
        console.log("salles disponibles :");
        console.log(available)
        process.exit(0); 
    } else {
        console.log("rien à ", new Date().toLocaleString());
    }
}
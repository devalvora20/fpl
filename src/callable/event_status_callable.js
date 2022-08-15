import { BASE_URL } from "../constants";
export class EventStatusCallable {
    getData = async () => {
        let url = BASE_URL + `event-status/`;
        const response = await fetch(url);
        const data = await response.json();
        let currentGameweek = data["status"][data["status"].length-1]["event"];
        return currentGameweek;
    }
}
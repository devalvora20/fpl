import { BASE_URL } from "../constants";
export class GameweekPicksCallable {
    getData = async (manager_id, gameweek) => {
        let url = BASE_URL + `entry/${manager_id}/event/${gameweek}/picks/`;
        const response = await fetch(url);
        const data = await response.json();
        data["manager_id"] = manager_id;
        return data;
    }
}
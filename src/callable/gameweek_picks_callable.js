import { BACKEND_PROXY_URL, FANTASY_BASE_URL } from "../constants";
import {gw38PicksArchive} from "../data/season_22-23";
export class GameweekPicksCallable {
    getData = async (manager_id, gameweek) => {

        let url = FANTASY_BASE_URL + `entry/${manager_id}/event/${gameweek}/picks/`;
        const response = await fetch(BACKEND_PROXY_URL+url, {
            headers: {
                'Target-URL': url,
                'Authorization':'auth'
              }
        });
        const data = await response.json();

        data["manager_id"] = manager_id;
        return data;

    }
}
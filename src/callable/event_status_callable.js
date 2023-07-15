import { BACKEND_PROXY_URL, FANTASY_BASE_URL } from "../constants";
export class EventStatusCallable {
    getData = async () => {
        let url = FANTASY_BASE_URL + `event-status/`;
        const response = await fetch(BACKEND_PROXY_URL, {
            headers: {
                'Target-URL': url,
                'Authorization':'auth'
              }
        });
        const data = await response.json();
        let currentGameweek;
        
        if(data["status"].length!==0){
            currentGameweek = data["status"][data["status"].length-1]["event"];
        }else{
            currentGameweek = 1
        }
        
        return currentGameweek;
    }
}
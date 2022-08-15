import { BASE_URL } from "../constants";
export class ElementSummaryCallable {
    getElementSummary = async (elementId) => {
        let url = BASE_URL + `element-summary/${elementId}/`;
        const response = await fetch(url);
        const data = await response.json();
        data["id"] = elementId;
        return data;
    }
}
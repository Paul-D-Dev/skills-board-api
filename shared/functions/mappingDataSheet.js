import { mappingSkills } from "./mappingSkills.js";

/**
 * Mapping data receive from Google Spredsheet to render to front app
 * @param values array of strings first array is label and rest is values
 */
export function mappingDataSheet(values) {
    // We want to share a list of stackers with their skills
    // First array's element is name keys
    const keys = values[0];
    // Remove first element of the array
    values.shift();

    return values.map(stacker => {
        let data = {};
        for (let i = 0; i < keys.length; i++) {
            data[keys[i]] = stacker[i];
        }
        data['skills'] = mappingSkills(data['skills']);
        return data;
    })

}

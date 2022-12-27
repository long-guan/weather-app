import {getData} from './fetchData.js';

export async function testing() {
    let data = await getData();
    console.log(data);
    console.log(data.main.temp);
}

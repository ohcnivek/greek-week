import axios from 'axios';

async function getTimezones() {
    return (await axios.get('http://worldtimeapi.org/api/timezone')).data
    
}

async function getTimeofTimezone(timezone) {
    return (await axios.get('http://worldtimeapi.org/api/timezone/' + timezone)).data
}

//array passed in that's returned from getTimezones
async function getTimePerTimezone(timezones) {
    let response = []
    for (let i = 0; i < timezones.length; i++) {
        let res = await getTimeofTimezone(timezones[i])
        // console.log(res);
        response.push(res);

    }
    return response;
}


async function main() {
    let timezones = await getTimezones();
    let res = await getTimePerTimezone(timezones)
    console.log(res)
}

export {getTimezones, getTimeofTimezone, getTimePerTimezone, main}
const axios = require('axios');

module.exports = async (location) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(location) + '.json?access_token=pk.eyJ1IjoidXRjaGFrMTYwIiwiYSI6ImNrYnZyYTcwaTA4dTEyemxnYzF5M2g4ZmEifQ.yu-J3JOgJFvgWQYN7qqpBg&limit=1';
    const response = await axios.get(url);
    const data = response.data;
    if (!data || data.error) {
        throw new Error('Something went wrong');
    }
    const coordinates = {
        lat : data.features[0].center[1],
        lng : data.features[0].center[0]
    };
    return coordinates;
};

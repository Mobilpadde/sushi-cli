const axios = require('axios');

const URI = 'https://api.sushipool.com/api/v1/stats/profile/';

module.exports = (wallet) => {
    return new Promise((res, rej) => {
        axios.get(URI + encodeURI(wallet))
            .then(({ data }) => res(data))
            .catch(rej);
    });
}
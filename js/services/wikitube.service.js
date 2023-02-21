'use strict'

const API_KEY = 'AIzaSyA1_QEy1ItDqhS3Ju8RPhtUBF4Tw8MD6K8'
const STORAGE_KEY = 'gVidsDb'

const urls = {
    vids : `https://www.googleapis.com/youtube/v3/search?part=snippet&videoEmbeddable=true&type=video&key=${API_KEY}&q=`,
    wik: `https://en.wikipedia.org/w/api.php?&origin=*&action=query&list=search&format=json&%20srsearch=`
}

const gVids = loadFromStorage(STORAGE_KEY) || {}

function ask(value, key) {
    
    if(!gVids[value]) gVids[value] = {}
    if(gVids[value][key]) return Promise.resolve(gVids[value][key])

    const url = urls[key] + value
    // console.log(url);

    return axios.get(url)
        .then(res => {
            console.log('Hi from then()')
            gVids[value][key]= res.data
            saveToStorage(STORAGE_KEY, gVids)
            return res.data
        })
        .catch(err => {
            console.log('err: ', err)
            throw 'Had a problem'
        })
}
'use strict'

function onInit() {
    // window.addEventListener("resize", resizePlayer);
    renderAll(ask('mr beast', 'vids'), ask('mr beast', 'wik'))
        .then(values => {
            renderVids(values[0].items)
            renderWik(values[1].query.search)
        })
}

function onSearch(ev) {
    ev.preventDefault();
    const elInput = document.querySelector('.search-input')
    const value = elInput.value
    elInput.value = ''

    renderAll(ask(value, 'vids'), ask(value, 'wik'))
        .then(values => {
            renderVids(values[0].items)
            renderWik(values[1].query.search)
        })
}

function renderVids(items) {
    // console.log(items);
    var strHtmls = items.map(item => {
        return `
            <div class="vid-preview">
                <img src="${item.snippet.thumbnails.default.url}" alt="">
                <p>${item.snippet.title}</p>
            </div>
        `
    })
    document.querySelector('.vids-list').innerHTML = strHtmls.join('')

    var url = `https://www.youtube.com/embed/${items[0].id.videoId}`
    var strHtml = `
        <iframe width="420" height="315"
            src="${url}">
        </iframe>
    `
    document.querySelector('.vid-player-container').innerHTML = strHtml
    // resizePlayer()
}

function resizePlayer(){
    const elContainer = document.querySelector('.vid-player-container')
    const elFrame = document.querySelector('iframe')
    elFrame.width = elContainer.offsetWidth
    elFrame.height = elContainer.offsetHeight
}

function renderWik(searches) {
    searches = searches.splice(0, 2)

    console.log(searches);

    var strHtmls = searches.map(search => {
        return `
            <div class="wik-preview">
                <h2>${search.title}</h2>
                <p>${search.snippet}</p>
            </div>
        `
    })

    console.log(strHtmls);
    document.querySelector('.wik-list').innerHTML = strHtmls.join('')
}


function renderAll(prmVids, prmWik) {
    console.log('prmVids =>', prmVids);
    console.log('prmWik =>', prmWik);
    return Promise.all([prmVids, prmWik])
        .then((values) => {
            return values
        }
    )
}
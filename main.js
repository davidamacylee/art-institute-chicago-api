const getInfo = async (img_index) => {
    let title = document.getElementsByTagName('img')[img_index].attributes[1].value;

    const request = new Request(`https://api.artic.edu/api/v1/artworks/search?q=${title}`, {
        method: 'GET',
        headers: {
            'content-type': 'application/json'
        },
    });

    let result = await fetch(request);

    const response = await result.json();
    return response.data[0]
}

const getInfoByID = async (id) => {
    const request = new Request(`https://api.artic.edu/api/v1/artworks/${id}`, {
        method: 'GET',
        headers: {
            'content-type': 'application/json'
        },
    });

    let result = await fetch(request);

    const response = await result.json();
    console.log(response.data)
    console.log(typeof(response.data))
    return response.data
}

function descriptionPopUp(item_index) {
    var gallery_item = document.getElementsByClassName('gallery__item')[item_index];
    var popup_item = document.getElementsByClassName('popup')[item_index];
    gallery_item.onmouseover = function() {
        popup_item.style.display = 'block';
        console.log(popup_item.innerText);
    };
    gallery_item.onmouseout = function() {
        popup_item.style.display = 'none';
    };
}

function getPopUp(id) {
    switch(id) {
        case 'fig1': {
            descriptionPopUp(0);
            break;
        }
        case 'fig2': {
            descriptionPopUp(1);
            break;
        }
        case 'fig3': {
            descriptionPopUp(2);
            break;
        }
        case 'fig4': {
            descriptionPopUp(3);
            break;
        }
        case 'fig5': {
            descriptionPopUp(4);
            break;
        }
        case 'fig6': {
            descriptionPopUp(5);
            break;
        }
    }
}



function populateCaptions(item_index) {
    var caption = document.getElementsByTagName('figcaption')[item_index];
    var popup_item = document.getElementsByClassName('popup')[item_index];
    getInfo(item_index).then( response => {
        getInfoByID(response.id).then( result => {
            caption.innerText = (result.artist_title + ', ' + result.place_of_origin + ', ' + result.date_display);
    })});
    getInfo(item_index).then( response => {
        getInfoByID(response.id).then( result => {
            popup_item.innerHTML = result.description;
    })});
}

for (let i = 0; i < 6; i++) {
    populateCaptions(i);
}
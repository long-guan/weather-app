export function addLoader() {
    let div = document.createElement('div');
    div.classList.add('loader');
    document.body.appendChild(div);
    document.querySelector('.top-outer-cont').classList.add('blur');
    document.querySelector('.bot-outer-cont').classList.add('blur');
}

export function removeLoader() {
    document.querySelector('.loader').remove();
    document.querySelector('.top-outer-cont').classList.remove('blur');
    document.querySelector('.bot-outer-cont').classList.remove('blur');
}

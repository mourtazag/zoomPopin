import loadImg from "./loadImg.js";
import { emptyElement } from "./utils.js";

// Popin Styles
const styles = `

.zoom-popin {
    pointer-events: none;
    opacity: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 3;
    transition: opacity .3s ease-out;
}

.zoom-popin.is-visible {
    pointer-events: auto;
    opacity: 1;
}

.zoom-popin .loader {
    display: none;
}

.zoom-popin.is-loading .loader {
    display: block;
}

.zoom-popin-overlay {
    background: rgba(255, 255, 255, .7);
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
}

.zoom-popin-close {
    position: absolute;
    bottom: 100%;
    right: 0;
}

.zoom-popin-content {
    display: flex;
    justify-content: center;
    align-items: center;
    max-width: 90vw;
    max-height: 90vh;
    position: relative;
}


.zoom-popin.is-loading .zoom-popin-content  {
    display: none;
}

.zoom-popin-content img {
    vertical-align: middle;
    width: auto;
    max-height: 90vh;
}

`;

// DOM Cache
const Popin = generatePopin();


// Events
function init() {
    document.addEventListener("click", openPopin);
    document.addEventListener("click", closePopin);
}

function openPopin(e) {

    if (!e.target.closest(".js-zoom-popin-trigger")) return;

    e.preventDefault();

    const trigger = e.target.closest(".js-zoom-popin-trigger");

    emptyElement(Popin.querySelector(".zoom-popin-inner-content"));
    Popin.classList.add("is-loading");
    document.body.classList.add("is-blocked");
    Popin.classList.add("is-visible");

    loadImg(trigger.dataset.zoomTarget)
        .then(function (img) {

            Popin.classList.remove("is-loading");
            Popin.querySelector(".zoom-popin-inner-content").appendChild(img);

        });
}

function closePopin(e) {

    if (!e.target.closest(".js-zoom-popin-close")) return;

    e.preventDefault();

    Popin.classList.remove("is-visible");
    document.body.classList.remove("is-blocked");

}

function generatePopin() {

    const DOMPopin = document.querySelector(".zoom-popin");

    if (DOMPopin) return DOMPopin;

    const Popin = document.createElement("div");
    Popin.classList.add("zoom-popin");
    Popin.classList.add("is-loading");
    const Overlay = document.createElement("div");
    Overlay.classList.add("zoom-popin-overlay");
    Overlay.classList.add("js-zoom-popin-close");
    const Wrapper = document.createElement("div");
    Wrapper.classList.add("zoom-popin-wrapper");
    const Loader = document.createElement("div");
    Loader.classList.add("loader");
    Loader.appendChild(document.createElement("div"));
    const Content = document.createElement("div");
    Content.classList.add("zoom-popin-content");
    const Close = document.createElement("button");
    Close.classList.add("zoom-popin-close");
    Close.classList.add("js-zoom-popin-close");
    Close.classList.add("link");
    Close.innerHTML = "Fermer";
    const Inner = document.createElement("div");
    Inner.classList.add("zoom-popin-inner-content");

    Content.appendChild(Close);
    Content.appendChild(Inner);
    Wrapper.appendChild(Loader);
    Wrapper.appendChild(Content);
    Popin.appendChild(Overlay);
    Popin.appendChild(Wrapper);

    document.body.appendChild(Popin);

    const popinStyles = document.createElement("style");
    popinStyles.innerHTML = styles;
    document.body.insertBefore(popinStyles, Popin);


    return Popin;

}

const ZoomPopin = {
    init
};

export default ZoomPopin;

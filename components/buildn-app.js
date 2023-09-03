import { loadFastnElements } from "./fastn/index.js";

class BuildnApp extends HTMLElement {
    #hasRendered = false
    fastnElements = new Map()

    constructor() {
        super();
    }

    handleFastnElementLoaded = ({ detail: { element, metadata } }) => {
        this.fastnElements.set(element, metadata);
    }

    handleFastnElementsLoaded = () => {
        console.log(this.fastnElements)
    }

    attachListeners() {
        window.addEventListener("fastn-element-loaded", this.handleFastnElementLoaded);
        window.addEventListener("fastn-elements-loaded", this.handleFastnElementsLoaded);
    }

    connectedCallback() {
        if(this.#hasRendered) {
            return;
        }

        this.attachListeners();

        loadFastnElements(this);

        this.#hasRendered = true;
    }
}

customElements.define('buildn-app', BuildnApp);

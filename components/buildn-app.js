import { loadFastnElements } from "./fastn/index.js";

const template = document.createElement('template');

template.innerHTML = `
    <buildn-modal></buildn-modal>
    <buildn-container>
        <buildn-toolbar></buildn-toolbar>
        <buildn-navigator></buildn-navigator>
        <buildn-main></buildn-main>
        <buildn-inspector></buildn-inspector>
    </buildn-container>
`;

class BuildnApp extends HTMLElement {
    #hasRendered = false
    #selectedElement = null
    fastnElements = new Map()

    constructor() {
        super();
    }

    handleFastnElementLoaded = ({ detail: { element, metadata } }) => {
        this.fastnElements.set(element, metadata);
    }

    handleFastnElementsLoaded = () => {
        console.log(this.fastnElements);
    }

    handleFastnElementSelected = ({ detail: { target, metadata } }) => {
        this.#selectedElement = target;
        console.log(target, metadata);
    }

    connectedCallback() {
        this.render();
    }

    async render() {
        if(this.#hasRendered) {
            return;
        }

        window.addEventListener("fastn-element-loaded", this.handleFastnElementLoaded);
        window.addEventListener("fastn-elements-loaded", this.handleFastnElementsLoaded);

        await loadFastnElements(this);

        this.appendChild(template.content.cloneNode(true));

        this.buildnMain = this.querySelector('buildn-main');
        this.buildnModal = this.querySelector('buildn-modal');

        customElements.whenDefined('buildn-modal').then(() => {
            this.buildnModal.createElementList(this.fastnElements);
        });

        customElements.whenDefined('buildn-navigator').then(() => {
            this.buildnNavigator = this.querySelector('buildn-navigator');
        });

        window.addEventListener('fastn-add-element', ({ detail }) => {
            const parent = this.#selectedElement
                ? this.#selectedElement
                : this.buildnMain;

            const elementNode = this.#createElement(detail);

            parent.appendChild(elementNode);

            window.dispatchEvent(new CustomEvent('fastn-element-added', {
                bubbles: true,
                composed: true,
                cancelable: false,
                detail: {
                    target: elementNode,
                    detail,
                }
            }));    
        });

        window.addEventListener("fastn-element-selected", this.handleFastnElementSelected);

        this.#hasRendered = true;
    }

    #createElement = ({ element }) => {
        const id = crypto.randomUUID();

        if(!this.fastnElements.has(element)) {
            window.dispatchEvent(new CustomEvent('buildn-error', {
                bubbles: true,
                composed: true,
                cancelable: false,
                detail: {
                    error: '#element-not-registered',
                    id,
                    element
                }
            }));
        }

        const metadata = this.fastnElements.get(element);

        const elementNode = document.createElement(element);

        elementNode.setAttribute('id', id);

        elementNode.setAttribute('data-fastn-element', '');

        window.dispatchEvent(new CustomEvent('fastn-element-selected', {
            bubbles: true,
            composed: true,
            cancelable: false,
            detail: {
                target: elementNode,
                metadata,
            }
        }));

        return elementNode;
    }
}

customElements.define('buildn-app', BuildnApp);

const template = document.createElement('template');

template.innerHTML = `
    <div>
        <slot />
    </div>
`;

class BuildnMain extends HTMLElement {
    #hasRendered = false

    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        this.render();
    }

    render() {
        if(this.#hasRendered) {
            return;
        }

        this.shadowRoot.appendChild(template.content.cloneNode(true));

        this.#hasRendered = true;
    }

}

customElements.define('buildn-main', BuildnMain);

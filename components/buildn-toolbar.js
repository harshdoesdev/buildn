const template = document.createElement('template');

template.innerHTML = `
    <div class="bar">
        <h1 class="heading is-small">buildn</h1>
    </div>
`;

class BuildnToolbar extends HTMLElement {
    #hasRendered = false

    constructor() {
        super();
    }

    connectedCallback() {
        this.render();
    }

    render() {
        if(this.#hasRendered) {
            return;
        }

        this.appendChild(template.content.cloneNode(true));

        this.#hasRendered = true;
    }

}

customElements.define('buildn-toolbar', BuildnToolbar);

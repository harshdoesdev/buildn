class BuildnNavigatorNode extends HTMLElement {
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

        this.node = document.createElement('div');

        this.node.innerHTML = this.getAttribute('data-element');

        this.appendChild(this.node);

        this.#hasRendered = true;
    }

}

customElements.define('buildn-navigator-node', BuildnNavigatorNode);

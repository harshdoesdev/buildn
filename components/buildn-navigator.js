const template = document.createElement('template');

template.innerHTML = `
    <div class="bar justify-end with-separator">
        <button id="add-element-button" class="has-icon">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M11 11V5H13V11H19V13H13V19H11V13H5V11H11Z" fill="rgba(255,255,255,1)"></path></svg>
            Add
        </button>
    </div>
`;

class BuildnNavigator extends HTMLElement {
    #hasRendered = false

    constructor() {
        super();

        this.selectedNode = null;
    }

    connectedCallback() {
        this.render();
    }

    render() {
        if(this.#hasRendered) {
            return;
        }

        this.appendChild(template.content.cloneNode(true));

        this.buildnElementsModal = document.querySelector('buildn-modal');
        this.addElementButton = this.querySelector('#add-element-button');
        this.nodeContainer = this.querySelector('.buildn-navigator-nodes');

        this.attachListeners();

        this.#hasRendered = true;
    }

    attachListeners() {
        this.addElementButton.addEventListener('click', () => {
            window.dispatchEvent(new CustomEvent('buildn-modal-open', {
                bubbles: true,
                composed: true,
                cancelable: false,
            }));
        });

        window.addEventListener('fastn-element-added', ({ detail: { target, detail } }) => {
            const node = document.createElement('buildn-navigator-node');

            node.setAttribute('data-element', detail.element);
            node.setAttribute('data-element-id', target.id);

            this.appendChild(node);
        });
    }

}

customElements.define('buildn-navigator', BuildnNavigator);

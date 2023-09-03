const template = document.createElement('template');

template.innerHTML = `
    <style>
    .buildn-modal {
        position: fixed;
        top: 0;
        left: 0;
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100vw;
        height: 100vh;
        background-color: rgba(0, 0, 0, .5);
    }

    .buildn-modal:not(.open) {
        display: none;
    }

    .buildn-modal-items {
        width: 60%;
        height: 50%;
        margin: 2rem;
        background: var(--surface-color);
        border-radius: 1rem;
        overflow: hidden;
        padding: 1rem;
    }
    </style>

    <div class="buildn-modal">
        <div class="buildn-modal-items">
            <slot />
        </div>
    </div>
`;

class BuildnModal extends HTMLElement {
    #hasRendered = false

    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        if(this.#hasRendered) {
            return;
        }

        this.render();

        this.modal = this.shadowRoot.querySelector('.buildn-modal');

        this.attachListeners();

        this.#hasRendered = true;
    }

    createElementList(elements) {
        customElements.whenDefined('buildn-element-button').then(() => {
            for(const [element, metadata] of elements.entries()) {
                const button = document.createElement('buildn-element-button');
    
                button.setElementData({ element, metadata });
    
                this.appendChild(button);
            }
        });
    }

    render() {
        this.shadowRoot.appendChild(template.content.cloneNode(true));
    }

    attachListeners() {
        window.addEventListener('buildn-modal-close', () => this.modal.classList.remove('open'));
        window.addEventListener('buildn-modal-open', () => this.modal.classList.add('open'));
    }
}

customElements.define('buildn-modal', BuildnModal);

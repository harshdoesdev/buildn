class BuildnElementButton extends HTMLElement {
    #hasRendered = false;
    #element = null
    
    connectedCallback() {
        this.render();
    }

    setElementData(element) {
        this.#element = element;
    }

    render() {
        if(this.#hasRendered) {
            return;
        }

        this.button = document.createElement('button');

        this.button.classList.add('bar-button');

        this.button.innerHTML = this.#element.metadata.elementName;

        this.appendChild(this.button);

        this.attachListeners();

        this.#hasRendered = true;
    }

    attachListeners() {
        this.button.addEventListener('click', () => {
            window.dispatchEvent(new CustomEvent('fastn-add-element', {
                bubbles: true,
                composed: true,
                cancelable: false,
                detail: this.#element
            }));

            window.dispatchEvent(new CustomEvent('buildn-modal-close', {
                bubbles: true,
                composed: true,
                cancelable: false,
            }));
        });
    }

}

customElements.define('buildn-element-button', BuildnElementButton);

import FastnElement from "../../fastn-element.js";

const template = document.createElement('template');

template.innerHTML = `
    <div class="row">
        <slot />
    </div>
`;

class FastnRow extends FastnElement {
    render() {
        this.shadowRoot.appendChild(template.content.cloneNode(true));
    }
}

customElements.define('fastn-row', FastnRow);

export { default as metadata } from './metadata.js';

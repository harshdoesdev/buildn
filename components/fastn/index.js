const elements = [
    'fastn-column',
    'fastn-row',
];

export const loadFastnElements = async (_app) => {
    try {
        await Promise.all(elements.map(async element => {
            const { metadata } = await import(`./elements/${element}/${element}.js`);

            await customElements.whenDefined(element);

            window.dispatchEvent(new CustomEvent("fastn-element-loaded", {
                bubbles: true,
                composed: true,
                cancelable: false,
                detail: {
                    element,
                    metadata
                }
            }));
        }));

        window.dispatchEvent(new CustomEvent('fastn-elements-loaded', {
            bubbles: true,
            composed: true,
            cancelable: false,
        }));
    } catch(e) {
        console.error(e);

        window.dispatchEvent(new CustomEvent('fastn-elements-loading-failed', {
            bubbles: true,
            composed: true,
            cancelable: false,
        }));
    }
};

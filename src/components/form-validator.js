
import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';

class FormValidator extends PolymerElement {
  static get properties () {
    return {};
  }

  validate () {
    let isValid = true
    super.childNodes.forEach(node => {
      if (node.tagName === 'INPUT-VALIDATOR') {
        if (!node.validate()) {
          isValid = false
        }
      }
    })
    return isValid
  }

  static get template () {
    return html`
      <slot></slot>
    `;
  }
}

customElements.define('form-validator', FormValidator);

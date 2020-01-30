import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';
import PolyValidator from '../index'

class InputValidator extends PolymerElement {
  static get properties () {
    return {
      rules: { type: String },
      customRules: { type: Object },
      customErrorMessages: { type: Object },
      name: { type: String },
      element: {
        type: Object,
        required: false
      }
    };
  }

  ready(){
    super.ready();
    this.inputField = this.element || this.querySelector('input')
    this.configureValidationBehaviour()
  }

  configureValidationBehaviour () {
    const validationBehaviour = PolyValidator.interactionMode.getInputBehaviour()
    this.inputField.addEventListener(validationBehaviour, this.validate.bind(this));    
  } 

  validate () {
    let value = this.inputField.value
    let isValid = true
    let errorMessage = ''
    const validationRules = this.customRules || PolyValidator.rules.get()
    const validationErrors = this.customErrorMessages || PolyValidator.errorMessages.get()
    const rules = this.rules.split('|')
    rules.forEach(rule => {
      let ruleName = rule.split(':')[0]
      let param = rule.split(':')[1]
      try {
        if (!validationRules[ruleName](value, param)) {
          isValid = false
          errorMessage = validationErrors[ruleName](this.name, param)
        }
      } catch (e) {
        console.log(e)
      }
    });
    let detail = {
      fieldName: this.name,
      isValid,
      errorMessage
    }
    this.dispatchEvent(new CustomEvent('validate', {detail}));
    return isValid
  }
  
  static get template () {
    return html`
      <div>
        <slot></slot>
      </div>
    `;
  }
}

customElements.define('input-validator', InputValidator);

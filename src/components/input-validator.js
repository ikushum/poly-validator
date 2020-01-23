import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';

const validationBehaviour = 'input'

class InputValidator extends PolymerElement {
  static get properties () {
    return {
      rules: {
        type: String,
        value: ''
      },
      name: {
        type: String
      }
    };
  }

  ready(){
    super.ready();
    this.configureValidationBehaviour()
  }

  configureValidationBehaviour () {
    this.querySelector('input').addEventListener(validationBehaviour, this.validate.bind(this));    
  }

  validate () {
    let value = this.querySelector('input').value
    let isValid = true
    let errorMessage = ''
    const rules = this.rules.split('|')
    rules.forEach(rule => {
      let ruleName = rule.split(':')[0]
      let param = rule.split(':')[1]
      try {
        if (!RULES[ruleName](value, param)) {
          isValid = false
          errorMessage = ERROR_MESSAGES[ruleName](this.name, param)
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

const RULES = {
  required (value) {
    return !!value
  },
  number (value) {
    return !isNaN(value)
  },
  max (value, param) {
    return !(value.length > param)
  },
  min (value, param) {
    return !(value.length < param)
  }
}

const ERROR_MESSAGES = {
  required (fieldName) {
    return `The field ${fieldName} is required`
  },
  number (fieldName) {
    return `The field ${fieldName} must be a numeric value`
  },
  max (fieldName, param) {
    return `The field ${fieldName} must not be greater than ${param} characters`
  },
  min (fieldName, param) {
    return `The field ${fieldName} must not be less than ${param} characters`
  }
}
# poly-validator

![npm](https://img.shields.io/npm/v/poly-validator)

For client side form validation in polymer apps

## Installation

```sh
yarn add poly-validator
```

## Rules
 - required
 - number
 - min:`<minimum allowed-characters>`
 - max:`<maximum-allowed-characters>`
 

## Properties
* ##### input-validator
  -  **rules**: A string of rules seperated by ```|```. For example ``` rules="required|number" ```
  - **name**: A string representing the name of the input field.
  - **element**: The HTML element (usually the input field) to validate
  
## Events
* ##### input-validator
  -  **validate**: Is fired every time a validation is verified. The payload contains an object with properties representing fieldName (String), errorMessage (String) and isValid (Boolean)

## Methods
* ##### input-validator
  -  **validate**: Takes no parameter. Returns if the field is valid or not.

* ##### form-validator
  -  **validate**: Takes no parameter. Returns if the form is valid or not.

## Usages

#### Necessary Imports
```
import 'poly-validator/src/components/input-validator'
import 'poly-validator/src//components/form-validator'
```
#### In the template

Wrap the input field with ```<input-validator>```
```
<input-validator 
  rules="min:2|max:5"
  name="Gender"
  @validate="${this.handleValidation}" 
>
  <input type="text" value="Male">
  <p>${this.fieldErrors.Gender}</p>
</input-validator>

```

Wrap a list of ```<input-validator>``` with ```<form-validator>```
```
<form-validator>
  <input-validator>....</input-validator>
  <input-validator>....</input-validator>
  <input-validator>....</input-validator>
  ...  
</form-validator>
```

#### Full Example
````
import { LitElement, html } from 'lit-element';
import 'poly-validator/src/components/input-validator'
import 'poly-validator/src//components/form-validator'

class TestForm extends LitElement {
  static get properties () {
    return {
      fieldErrors: {
        type: Object
      },      
      isValid: {
        type: Boolean
      }
    };
  }

  constructor() {
    super();
    this.isValid = true
    this.fieldErrors = {}
  }

  submitForm () {
    let formValidator = this.shadowRoot.querySelector('form-validator')
    this.isValid = formValidator.validate()
  }

  handleValidation (payload) {
    this.fieldErrors[payload.detail.fieldName] = payload.detail.errorMessage
    super.performUpdate()
  }  

  render () {
    return html`
      <p>${this.isValid}</p>
      <form-validator>
        Name
        <input-validator 
          rules="min:2|max:5"
          name="Gender"
          @validate="${this.handleValidation}" 
        >
          <input type="text" value="Male">
          <p>${this.fieldErrors.Gender}</p>
        </input-validator>
        <br>
        Age
        <input-validator 
          rules="required|number"
          name="Age"
          @validate="${this.handleValidation}" 
        >
          <input type="text" value="">
          <p>${this.fieldErrors.Age}</p>
        </input-validator>
        <br>        
        <button @click="${this.submitForm}">Submit</button>
      </form-validator>
    `;
  }
}

customElements.define('test-form', TestForm);

````

License
----
MIT
**Free Software, Hell Yeah!**

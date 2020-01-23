export default function(superClass) {
  return class extends superClass {
    constructor() {
      super();
      this.fieldErrors = {}
    }
    
    static get properties() {
      return {
        fieldErrors: {
          type: Object
        }
      };
    }

    handleValidation (payload) {
      this.fieldErrors[payload.detail.fieldName] = payload.detail.errorMessage
      super.performUpdate()
    }

  }
}
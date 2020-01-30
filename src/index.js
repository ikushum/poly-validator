class InteractionMode {
    constructor () {
      this.interactionMode = 'aggressive'
    }
    set (mode) {
      if (Object.keys(interactionModes).includes(mode)) {
        this.interactionMode = mode
      } else {
        console.error(`${mode} is not a valid input event`)
      }
    }
    get () {
      return this.interactionMode
    }
    getInputBehaviour () {
      return interactionModes[this.interactionMode]
    }
  }
  
  class Rule {
    constructor () {
      this.rules = RULES
    }
    addNew (newRules) {
      this.rules = {
        ...this.rules,
        ...newRules
      }
    }
    get () {
      return this.rules
    }
  }
  
  class ErrorMessage {
    constructor () {
      this.messages = ERROR_MESSAGES
    }
    addNew (messages) {
      this.rules = {
        ...this.messages,
        ...messages
      }
    }
    get () {
      return this.messages
    }
  }
  
  
  
  const interactionModes = {
    aggressive: 'input',
    lazy: 'blur'
  }
  
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
  
  const interactionMode = new InteractionMode()
  const rules = new Rule()
  const errorMessages = new ErrorMessage()
  export default {
    interactionMode,
    rules,
    errorMessages
  }
  
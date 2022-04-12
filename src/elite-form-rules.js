const internalValMethods = {

  email: function(node) { // node = the 'this' keyword. we need access to state
    let error = true
    const name = node.validationName || node.name || node.type
    const validEmail = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/

    error = !validEmail.test(node.value)

    const err = {
      message: error ? `Please enter a valid ${name} address.` : null,
      error: error
    }
    return err // ***** switched this to return the object in order to collate all the errors
  },

  //NOTE***developer needs to use escape variable when writing their custom strings***
  endsWith: function(node, devInput) { // node = the 'this' keyword. we need access to state, devInput = array of strings, represents list of strings that are allowed endings 
    let error = true
    for (let i = 0; i < devInput.length; i++) {
      const validEnding = RegExp(String.raw`.*${devInput[i]}$`)
      if (validEnding.test(node.value)) {
        error = false
        i = devInput.length
      }
    }
    const err = {
      message: error ? 'This field doesn\'t end with a valid value.' : null,
      error: error
    }
    return err // ***** switched this to return the object in order to collate all the errors
  },

  matches: function(node, devInput) { // node = the 'this' keyword. we need access to state, devInput = array of strings, represents list of strings that are allowed endings 
    let error
    //handle case if developer chooses to pass regex
    if (devInput.regex) {
      error = !devInput.regex.test(node.value) ? true : false
    }
    //handle case if developer chooses to pass only strings
    if (devInput.type === 'string') {
      const validArr = devInput.values
      error = true
      for (let i = 0; i < validArr.length; i++) {
        if (validArr[i] === node.value) {
          error = false
          i = validArr.length
        }
      }
    }
    const err = {
      message: error ? `${node.value} is not an allowed value.` : null,
      error: error
    }
    return err // ***** switched this to return the object in order to collate all the errors
  },

  not: function(node, devInput) { // node = the 'this' keyword. we need access to state, devInput = array of strings, represents list of strings that are allowed endings 
    let error
    const name = node.validationName || node.name || node.type
    //handle case if developer chooses to pass regex
    if (devInput.regex) {
      error = devInput.regex.test(node.value) ? true : false
    }
    //handle case if developer chooses to pass only strings
    if (devInput.type === 'string') {
      const validArr = devInput.values
      error = false
      for (let i = 0; i < validArr.length; i++) {
        if (validArr[i] === node.value) {
          error = true
          i = validArr.length
        }
      }
    }
    const err = {
      message: error ? `${node.value} is not an allowed ${name}.` : null,
      error: error
    }
    return err // ***** switched this to return the object in order to collate all the errors
  },

  required: function(node) { // node = the 'this' keyword. we need access to state
    const name = node.validationName || node.name || node.type
    const err = {
      message: !node.value ? `${name} is required.` : null,
      error: !node.value ? true : false
    }
    return err // ***** switched this to return the object in order to collate all the errors
  },

  alphanumeric: function(node) {
    const alphanumericRegex = /[^a-zA-Z0-9]+/g
    const name = node.validationName || node.name || node.type
    const error = alphanumericRegex.test(node.value)
    const err = {
      message: error ? `${name} can only contain letters and numbers` : null,
      error: error
    }
    // console.log(err)
    return err
  },

  alpha: function(node) {
    const name = node.validationName || node.name || node.type
    const alphaRegex = /[^a-zA-Z]+/g
    const error = alphaRegex.test(node.value)
    const err = {
      message: error ? `${name} can only contain alphabetical characters` : null,
      error: error
    }
    return err
  },

  number: function(node) {
    const name = node.validationName || node.name || node.type
    const numberRegex = /[^0-9]+/g
    const error = numberRegex.test(node.value)
    const err = {
      message: error ? `${name} must be a number` : null,
      error: error
    }
    return err
  },
  password: function(node) {
    const name = node.validationName || node.name || node.type
    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,}$/;
    const error = !passwordRegex.test(node.value)
    const err = {
      message: error ? `${name} must be 8 characters long and contain at least: 1 number,\n1 uppercase character,\n1 lowercase character,\n1 special character (!,@,#,$,%,^,&,*)` : null,
      error: error
    }
    return err
  },

  min: function(node, devInput) {
    let error = true;
    const name = node.validationName || node.name || node.type
    if (node.value && node.value.length >= devInput){
      error = false;
    }
    const err = {
      message: error ? `${name} must be at least ${devInput} characters long` : null,
      error: error
    }
    return err;
  },

  max: function(node, devInput) {
    let error = false;
    const name = node.validationName || node.name || node.type;
    if (node.value && node.value.length > devInput){
      error = true;
    }
    const err = {
      message: error ? `The maximun number of characters of ${name} is ${devInput} characters long` : null,
      error: error
    }
    return err;
  },

  between: function(node, devInput) { // devInput is an array of [min, max]
    let error = true;
    const name = node.validationName || node.name || node.type;
    if (node.value && node.value.length >= devInput[0] && node.value.length <= devInput[1]) {
      error = false;
    }
    const err = {
      message: error ? `${name} must be in between ${devInput[0]} and ${devInput[1]} characters long` : null,
      error: error
    }
    return err;
  },
  
  checkExisting: async function(node, devInput) {  
    let error = false
    // console.log('validation node value: ', node.value)
    // console.log('fetch func results: ', devInput(node.value))
    const result = await devInput(node.value)
    if (node.name === 'username' && result === true) {
      error = true
      const err = {
        message: error ? `Sorry, ${node.value} is unavailable.` : null,
        error: error
      }
      // console.log(`${node.value} error: `, err)
      return err;
    } else if (node.name === 'email' && result === true) {
      error = true
      const err = {
        message: error ? `${node.value} belongs to an existing account. Please sign in.` : null,
        error: error
      }
      // console.log(err)
      return err
    }
    return {
      message: null,
      error: false
    }
  }, 
}

export default internalValMethods;
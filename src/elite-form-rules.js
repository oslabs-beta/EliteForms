const internalValMethods = {

  email: function(node) { // node = the 'this' keyword. we need access to state
    let error = true
    const name = node.validationName || node.name || node.type
    const validEmail = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/
    //console.log(node);
    error = !validEmail.test(node.value);
    const err = {
      message: error ? `Please enter a valid ${name} address.` : null,
      error: error
    }
    console.log(err.error);
    return err.error // for consistency, im returning the boolean, but we should return the error message also. do so by switching return statement to just err instead of err.error
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
    return err.error // for consistency, im returning the boolean, but we should return the error message also. do so by switching return statement to just err instead of err.error
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
    return err.error // for consistency, im returning the boolean, but we should return the error message also. do so by switching return statement to just err instead of err.error
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
    return err.error // for consistency, im returning the boolean, but we should return the error message also. do so by switching return statement to just err instead of err.error
  },

  required: function(node) { // node = the 'this' keyword. we need access to state
    const name = node.validationName || node.name || node.type
    const err = {
      message: !node.value ? `${name} is required.` : null,
      error: !node.value ? true : false
    }
    return err.error // for consistency, im returning the boolean, but we should return the error message also. do so by switching return statement to just err instead of err.error
  },
  
  alphanumeric: function(val) {
    const alphanumericRegex = /[^a-zA-Z0-9]+/g
    console.log(!alphanumericRegex.test(val));
    return !alphanumericRegex.test(val);
  },
  alpha: function(val) {
    const alphaRegex = /[^a-zA-Z]+/g;
    console.log(!alphaRegex.test(val));
    return !alphaRegex.test(val);
  },
  number: function(val) {
    const numberRegex = /[^0-9]+/g;
    console.log(!numberRegex.test(val));
    return !numberRegex.test(val);
  }
}

export default internalValMethods;
  /* This function is responsible for doing one last data validation of all the input fields
  by default, it will data validate EVERY elite-form element and cache their values plus any other 
  custom vanilla html input field values into an object and then invoke the callback. here, the callback
  is to be the developers own handleSubmit function. 
  there is an option to inclue an array, if the developer wanted to only do data validation for a certain
  subset of the input fields*/

function validateForm(node, callback, arr) {
  const fields = node.shadowRoot.children.main.children
  console.log(fields)
  let fieldsCheck = true
  const cache = {}

  for (let singleElement in fields) {
    const currentElement = fields[singleElement]
    if (!isNaN(Number(singleElement))) {
      if (Array.isArray(arr)) {
        if (currentElement.eliteForm && arr.includes(currentElement.id)) {
          cache[currentElement.id] = currentElement.value
          currentElement.handleValidation()
          if (Object.keys(currentElement.error).length > 0) fieldsCheck = false
        }else if (arr.includes(currentElement.id)) {
          const { id, value } = fields[singleElement]
          cache[id] = value
        }
      } else if (currentElement.eliteForm) {
        cache[currentElement.id] = currentElement.value
        currentElement.handleValidation()
        if (Object.keys(currentElement.error).length > 0) fieldsCheck = false
      } else {
        const { id, value } = fields[singleElement]
        cache[id] = value
      }
    }
  }
  if (fieldsCheck) {
    callback(cache)
  } else {
    console.log('bad form')
  }
}

export default validateForm
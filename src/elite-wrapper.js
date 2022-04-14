import {LitElement, html} from 'lit';

export class EliteWrapper extends LitElement {

  static properties = {
    onSubmit: {},
    arr: {},
    error: {},
    buttonName: {},
    badFormMessage: {},
  }

  constructor() {
    super();
    this.error = true
    this.buttonName = 'Submit'
    this.badFormMessage = 'Missing Fields'
  }

  render() {
    return html`
      <div>
        <slot></slot><br><br>
        <button @click=${() => this.validateForm(this.onSubmit, this.arr)}>${this.buttonName}</button><br><br>
        <div ?hidden=${this.error}>${this.badFormMessage}</div>
      </div>
    `;
  }

  validateForm(callback, arr) {
    const fields = this.querySelectorAll('.elite-form')
    // console.log(fields)
    let fieldsCheck = true
    const cache = {}

    for (let singleElement in fields) {
      const currentElement = fields[singleElement]
      if (!isNaN(Number(singleElement))) {
        if (Array.isArray(arr)) {
          if (currentElement.eliteForm && arr.includes(currentElement.id)) {
            if (!currentElement.value) {
              currentElement.handleValidation()
            }
            cache[currentElement.id] = currentElement.value
            if (Object.keys(currentElement.error).length > 0) fieldsCheck = false
          }else if (arr.includes(currentElement.id)) {
            const { id, value } = fields[singleElement]
            cache[id] = value
          }
        } else if (currentElement.eliteForm) {
          if (!currentElement.value) {
            currentElement.handleValidation()
          }
          cache[currentElement.id] = currentElement.value
          if (Object.keys(currentElement.error).length > 0) fieldsCheck = false
        } else {
          const { id, value } = fields[singleElement]
          cache[id] = value
        }
      }
    }
    if (fieldsCheck) {
      this.error = true
      callback(cache)
    } else {
      this.error = false
    }
  }

}

window.customElements.define('elite-wrapper', EliteWrapper);

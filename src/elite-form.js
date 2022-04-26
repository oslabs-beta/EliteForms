import {LitElement, html, css} from 'lit';

export class EliteForm extends LitElement {
  static styles = css`
    :host {
      font-family: monospace;
    }

    button {
      color: skyblue;
    }

    /* styling for the submit button starts*/
    /* .btn {
      width: 100%;
      display: block;
      margin: 50px 0px;
      padding: 14px 16px;
      background: transparent;
      outline: none;
      border: 0;
      color: #000000;
      letter-spacing: 0.1em;
      font-weight: bold;
      font-family: monospace;
      font-size: 16px;
    } */

  `;

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
    this.badFormMessage = '!! Missing Fields !!'
  }

  render() {
    return html`
      <div>
        <slot></slot>
        <button 
          class='submitBtn' 
          @click=${() => this.validateForm(this.onSubmit, this.arr)}>
            ${this.buttonName}
        </button>
        <div id='sbm-err-msg' ?hidden=${this.error}>${this.badFormMessage}</div>
        test text
      </div>
    `;
  }

  validateForm(callback, arr) {
    const fields = this.querySelectorAll('.elite-input')
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

window.customElements.define('elite-form', EliteForm);

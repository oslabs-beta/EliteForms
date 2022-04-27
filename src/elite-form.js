import {LitElement, html, css} from 'lit';
import {styleMap} from 'lit/directives/style-map.js';

export class EliteForm extends LitElement {
  static styles = css`
    :host {
      /* font-family: monospace; */
    }
    .button-container {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
    }
    .submitBtn {
      font-family: 'Roboto', sans-serif;
      align-items: center;
      background-color: #ffffff;
      border: 1px solid rgba(39, 48, 152, 0.5); 
      border-radius: .25rem;
      box-shadow: rgba(39, 48, 152, 0.1) 0 1px 3px 0;
      box-sizing: border-box;
      color: rgba(39, 48, 152, 0.85);
      cursor: pointer;
      display: inline-flex;
      font-size: 20px;
      font-weight: 600;
      letter-spacing: 0.1em;
      justify-content: center;
      line-height: 1.25;
      margin: 0;
      min-height: 3rem;
      padding: calc(.875rem - 1px) calc(1.5rem - 1px);
      position: relative;
      text-decoration: none;
      transition: all 250ms;
      user-select: none;
      -webkit-user-select: none;
      touch-action: manipulation;
      vertical-align: baseline;
      width: auto;
    }
    .submitBtn:hover,
    .submitBtn:focus {
      border-color: 1px solid rgba(39, 48, 152, 0.5);
      box-shadow: rgba(13, 242, 253, 0.3) 0 4px 12px;
      color: rgba(49, 78, 255, 0.85);
    }
    .submitBtn:hover {
      transform: translateY(-1px);
    }
    .submitBtn:active {
      background-color: #7a8fff;
      border-color: rgba(0, 0, 0, 0.15);
      box-shadow: rgba(0, 0, 0, 0.06) 0 2px 4px;
      color: rgba(39, 48, 152, 0.85);
      transform: translateY(0);
    }
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
    this.buttonStyles = '';
    this.badFormMessageStyles = '';
    this.buttonContainerStyles = '';
  }

  render() {
    return html`
      <div 
        class='button-container'
        style=${styleMap(this.buttonContainerStyles)}>
        <slot></slot>
        <button 
          class='submitBtn' 
          @click=${() => this.validateForm(this.onSubmit, this.arr)}
          style=${styleMap(this.buttonStyles)}>
            ${this.buttonName}
        </button>
        <div 
          class='sbm-err-msg' 
          id='sbm-err-msg' 
          ?hidden=${this.error}
          style=${styleMap(this.badFormMessageStyles)}>
            ${this.badFormMessage}
          </div>
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

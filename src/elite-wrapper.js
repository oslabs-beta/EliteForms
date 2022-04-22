import {LitElement, html, css} from 'lit';

export class EliteForm extends LitElement {
  static styles = css`
    :host {
      font-family: monospace;
    }
    /* styling for the submit button starts*/
    .btn {
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
    }

    .block-cube {
      position: relative;
    }
    .block-cube .bg-top {
      position: absolute;
      height: 10px;
      background: #ffffff;
      background: linear-gradient(90deg, #020024 0%, #340979 37%, #00d4ff 94%);
      bottom: 100%;
      left: 5px;
      right: -5px;
      transform: skew(-45deg, 0);
      margin: 0;
    }
    .block-cube .bg-top .bg-inner {
      bottom: 0;
    }
    .block-cube .bg {
      position: absolute;
      left: 0;
      top: 0;
      right: 0;
      bottom: 0;
      background: #ffffff;
      background: linear-gradient(90deg, #020024 0%, #340979 37%, #00d4ff 94%);
    }
    .block-cube .bg-right {
      position: absolute;
      background: #ffffff;
      background: #00d4ff;
      top: -5px;
      z-index: 0;
      bottom: 5px;
      width: 10px;
      left: 100%;
      transform: skew(0, -45deg);
    }
    
    .block-cube .bg-right .bg-inner {
      left: 0;
    }
    .block-cube .bg .bg-inner {
      transition: all 0.2s ease-in-out;
    }
    .block-cube .bg-inner {
      background: #ffffff;
      position: absolute;
      left: 2px;
      top: 2px;
      right: 2px;
      bottom: 2px;
    }
    .block-cube .text {
      position: relative;
      z-index: 2;
    }
    .block-cube.block-input input {
      position: relative;
      z-index: 2;
    }
  
    .block-cube.block-input .bg-top,
    .block-cube.block-input .bg-right,
    .block-cube.block-input .bg {
      background: rgba(255, 255, 255, 0.5);
      transition: background 0.2s ease-in-out;
    }
    .block-cube.block-input .bg-right .bg-inner,
    .block-cube.block-input .bg-top .bg-inner {
      transition: all 0.2s ease-in-out;
    }
  
    .block-cube.block-cube-hover:focus .bg .bg-inner, 
    .block-cube.block-cube-hover:hover .bg .bg-inner {
      top: 100%;
    }

    .text:hover {
      color: white;
    }

    /* styling for the submit button ends*/
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
    this.badFormMessage = 'Missing Fields'
  }

  
  render() {
    return html`
      <div>
        <slot></slot>
        <button 
          class='btn block-cube block-cube-hover' 
          @click=${() => this.validateForm(this.onSubmit, this.arr)}>
        <!-- divs for styling starts -->
          <div class='bg-top'>
            <div class='bg-inner'></div>
          </div>
          <div class='bg-right'>
            <div class='bg-inner'></div>
          </div>
          <div class='bg'>
            <div class='bg-inner'></div>
          </div>
          <div class='text'>
            ${this.buttonName}
          </div>
        <!-- divs for styling ends -->
        </button>
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

window.customElements.define('elite-form', EliteForm);

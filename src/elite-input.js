import {LitElement, html, css} from 'lit';
import {styleMap} from 'lit/directives/style-map.js';
import internalValMethods from 'elite-forms/src/elite-form-rules'
import debounce from 'elite-forms/src/debounce'

export class EliteInput extends LitElement {
  static styles = css`

    :host {
      font-family: 'Roboto', sans-serif;
      color: #595b5e;
    }
    .elite-input-container {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      padding: 10px;
      width: 400pt;
    }
    label {
      font-size: 1.3em;
      font-weight: bold;
      letter-spacing: 0.1em;
      padding-bottom: 0.3em;
    }
    .text-input, .radio-checkbox-container, textarea, select {
      font-family: 'Roboto', sans-serif;
      background-color: #ffffff;
      border: 1px solid rgba(39, 48, 152, 0.3);
      border-radius: .25rem;
      box-shadow: rgba(39, 48, 152, 0.1) 0 1px 3px 0;
      box-sizing: border-box;
      color: #595b5e;
      font-size: 16px;
      line-height: 1.25;
      margin: 0;
      min-height: 3rem;
      padding: calc(.875rem - 1px) calc(1.5rem - 1px);
    }
    .text-input:focus, textarea:focus, select:focus {
      outline: 1px solid rgba(13, 242, 253, 0.8);
    }
    .note, .show-word-count, .error {
      padding-top: 10px;
    }
    .note, .show-word-count {
      color: rgba(39, 48, 152, 0.85);
    }
    ul.error {
      color: rgb(49, 78, 255);
      padding: 10pt, 0, 0, 10pt;
      list-style-type: "✕ ";
    }
    .range-minmax-indexbox {
      display: flex;
      justify-content: space-between;
      font-weight: 600;
      margin-bottom: 1em;
      span:first-child{
      margin-left: 10px;
      }
    }
    .range-valuebox {
      font-size: 1.5em;
      color: rgb(39, 48, 152);
      font-weight: 600;
      display: flex;
      justify-content: center;
      margin-top: 1em;
    }
    .range-input {
      -webkit-appearance: none;
      background-color: rgba(39, 48, 152, 0.5);
      height: 2px;
      border-radius: 5px;
      outline: 0;
    }
    .range-input::-webkit-slider-thumb {
      -webkit-appearance: none;
      background-color: rgba(49, 78, 255, 0.8); 
      border: 1px solid rgba(13, 242, 253, 0.8);
      width: 12px;
      height: 20px;
      border-radius: 20%;
      cursor: pointer;
      transition: .3s ease-in-out;
    }

    input[type='checkbox'] {
      height: 15px;
      width: 15px;
      -webkit-appearance: none;
      -moz-appearance: none;
      -o-appearance: none;
      appearance: none;
      border: 1px solid rgba(39, 48, 152, 0.5);
      outline: none;
      transition-duration: 0.3s;
      cursor: pointer;
      margin-right: 0.5em;
    }
    input[type='checkbox']:checked {
      border: 1px solid #0df2fd;
      background-color: rgba(49, 78, 255, 0.8);
    }
    input[type='radio'] {
      height: 15px;
      width: 15px;
      border-radius: 100%;
      -webkit-appearance: none;
      -moz-appearance: none;
      -o-appearance: none;
      appearance: none;
      border: 1px solid rgba(39, 48, 152, 0.5);
      outline: none;
      transition-duration: 0.3s;
      cursor: pointer;
      margin-right: 0.5em;
    }
    input[type='radio']:checked {
      border: 1px solid #0df2fd;
      background-color: rgba(49, 78, 255, 0.8);
    }
    .options {
      margin-bottom: 0.2em;
      display: flex;
      justify-items: center;
    }
  `;

  static properties = {
    id: {},
    name: {},
    class: {},
    label: {},
    name: {},
    placeholder: {},
    type: {},
    note: {},
    validationRules: {},
    errorBehavior: {}, 
    validationName: {},
    options: {},
    optionGroup: {},
    defaultHidden: {},
    min: {},
    max: {},
    showIndex: {},
    showVal: {},
    row: {},
    cols: {},
    showWordCount: {},
    conditional: {}
  }

  static state = {
    internalValMethods: internalValMethods, 
    debounce: debounce
  }

  constructor() {
    super();
    this.id = '';
    this.class = '';
    this.label = '';
    this.name = '';
    this.placeholder = '';
    this.type = 'text';
    this.note = '';
    this.showIndex = false;
    this.showVal = false;
    this.defaultHidden = ' select one option'
    this.row = '4'; 
    this.cols = '50';
    this.showWordCount = true;
    this.error = {};
    this.styles = ''; 
    this.labelStyles = '';  
    this.inputStyles = ''; 
    this.noteStyles = ''; 
    this.errorStyles = '';
    this.showWordCountStyles = '';
    this.conditionalBool = true;
    this.eliteInputContainerStyles = '';
    this.radioCheckboxContainerStyles = '';
    this.optionsStyles = '';
    this.rangeMinmaxIndexboxStyles = '';
    this.rangeValueboxStyles = '';
  }

  render() {
    
    const errorsArr = []
    for (let err in this.error) {
      errorsArr.push(html`<li>${this.error[err]}</li>`)
    }
    const error = html`
      <ul
        class="error" 
        style=${styleMap(this.errorStyles)}>
        ${errorsArr} 
      </ul>
    `
    const label = html`
      <label class='label'
        for=${this.id}
        style=${styleMap(this.labelStyles)}>
        ${this.label && this.label}
      </label>`

    const note = html`
      <div 
          class='note' 
          ?hidden=${!this.note} 
          style=${styleMap(this.noteStyles)}>
            ${this.note}
      </div>`
    
    if (this.type === 'radio' || this.type === 'checkbox') {
      return html`
        <div class='elite-input-container' style=${styleMap(this.styles)}>
          ${label}
          <div 
            class='radio-checkbox-container' 
            style=${styleMap(this.radioCheckboxContainerStyles)}
            @change=${this.handleBox} 
            id=${this.id} 
            name=${this.name}>
            ${this.options.map((option) => html `
              <div 
                class='options' 
                style=${styleMap(this.optionsStyles)}>
                <input 
                  type=${this.type}
                  name=${this.name}
                  class=${this.name}
                  value=${option.value}
                  style=${styleMap(this.inputStyles)}
                >${option.option}<br>
              </div>
            `
            )}
          </div>
          ${note}
          ${error}
        </div>
        <div ?hidden=${this.conditionalBool}>
          <slot>
          </slot>
        </div>
      `;
    } 
    else if (this.type === 'select') {
      if (this.optionGroup) {
        const optionGroups = Object.entries(this.optionGroup)
        return html `
        <div class='elite-input-container' style=${styleMap(this.styles)}>
          ${label}
          <select 
            id=${this.id} 
            name=${this.name} 
            @change=${this.handleInput}
            style=${styleMap(this.inputStyles)}>
          <option value='none' selected disabled hidden>${this.defaultHidden}</option>

            ${optionGroups.map((group) => {
              const options = Object.entries(group[1])
              
              return html `
              <optgroup label=${group[0]}>
                  ${options.map((option) => {
                    return html `
                    <option value=${option[0]}>${option[1]}</option>
                    `
                  })}
              </optgroup>
              `
            })}
          </select>
          ${note}
          ${error}
        </div>
      `
      } else {
        return html `
        <div class='elite-input-container' style=${styleMap(this.styles)}>
          ${label}
          <select 
            id=${this.id} 
            name=${this.name} 
            @change=${this.handleInput}
            style=${styleMap(this.inputStyles)}>
          <option value='none' selected disabled hidden>${this.defaultHidden}</option>
          ${this.options.map((option) => 
            html `
            <option value=${option.value}>${option.option}</option>
            `)}
          </select>
          ${note}
          ${error}
        </div>
      `
      }
    } 
    else if (this.type === 'textarea') {
      return html `
      <div class='elite-input-container' style=${styleMap(this.styles)}>
        ${label}
        <textarea
          id=${this.id}
          class='input'
          @input=${this.handleInput} 
          @blur=${this.handleBlur}
          placeholder=${this.placeholder}
          style=${styleMap(this.inputStyles)}
          row=${this.row}
          cols=${this.cols}>
        </textarea>
        <div
          class='show-word-count'
          ?hidden=${this.showWordCount === 'false'}
          style=${styleMap(this.showWordCountStyles)}>
            Current word count: ${this.countWords()}
        </div>
        ${note}
        ${error}
      </div>
      `
    }
    else if (this.type === 'range'){
      return html`
      <div class='elite-input-container' style=${styleMap(this.styles)}>
        ${label}
          <div 
            class='range-minmax-indexbox' 
            ?hidden=${!this.showIndex}
            style=${styleMap(this.rangeMinmaxIndexboxStyles)}>
              <span>${this.min}</span><span>${this.max}</span>
          </div>
          <input 
            class='range-input'
            id=${this.id} 
            type=${this.type}
            @input=${this.handleInput} 
            @blur=${this.handleBlur}
            placeholder=${this.placeholder} 
            min=${this.min}
            max=${this.max}
            style=${styleMap(this.inputStyles)}>
          <span 
            id='range-valuebox' 
            class='range-valuebox' 
            ?hidden=${!this.showVal}
            style=${styleMap(this.rangeValueboxStyles)}>
              ${this.value ? this.value : "slide it"}
          </span>
        ${note}
        ${error}
      </div>
      `;
    }
    else {
      return html`
      <div class='elite-input-container' style=${styleMap(this.styles)}>
        ${label}
          <input
            class='text-input'
            id=${this.id} 
            type=${this.type}
            @input=${this.handleInput} 
            @blur=${this.handleBlur}
            placeholder=${this.placeholder} 
            min=${this.min}
            max=${this.max}
            style=${styleMap(this.inputStyles)}>
        ${note}
        ${error}
      </div>
      <div ?hidden=${this.conditionalBool}>
        <slot></slot>
      </div>
    `;
    }
  }

  handleConditional() {
    if (this.value == this.conditional[0]) {
      this.conditionalBool = false
    } else {
      this.conditionalBool = true
    }
  }

  countWords() {
    if (!this.value) {
      return 0;
    }
    else {
      const regex = /[!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~]/g;
      const wordArr = this.value.replace(regex, '').split(' ').filter(elem => elem);
      return wordArr.length;
    }
  }

  handleBox(event) {
    const form = this.shadowRoot.querySelectorAll(`.${this.name}`)
    console.log('form: ', form)
    const response = []
    for (let input in form) {
      if (!isNaN(Number(input))) {
        const { checked, value } = form[input]
        if (checked) response.push(value)
        else {
          response.slice(response.indexOf(value),1)
        }
      }
    }
    
    this.value = response
    console.log(this.value)
    if (this.conditional) {
      this.handleConditional()
    }
    this.handleValidation()
  }

  withDebounce = debounce(() => this.handleValidation(), 500)
  
  handleBlur(event) {
    if (this.errorBehavior === 'blur') {
      const { value } = event.target;
      this.value = value
      if (this.conditional) {
        this.handleConditional()
      }
      this.handleValidation()
    }
  }

  handleInput(event) {
    const { value } = event.target;
    this.value = value
    if (this.errorBehavior === 'debounce') {
      if (this.conditional) {
        this.handleConditional()
      }
      this.withDebounce()    
    } else {
      if (this.errorBehavior !== 'blur') {
        if (this.conditional) {
          this.handleConditional()
        } 
        this.handleValidation()
      }
    }
  }

  handleValidation() {
    const error = {}
    for (let rule in this.validationRules) {
      if (rule === 'checkExisting') {
        this.handdleAsyncValidation()
      }
      const result =  internalValMethods[rule](this, this.validationRules[rule])
      if (result.error) {
        error[rule] = result.message
      }
    }
    this.error = error
    this.requestUpdate()
  }

  async handdleAsyncValidation() {
    const error = {}
    for (let rule in this.validationRules) {
      const result = await internalValMethods[rule](this, this.validationRules[rule])
      if (result.error) {
        error[rule] = result.message
      }
    }
    this.error = error
    this.requestUpdate()
  }
}

window.customElements.define('elite-input', EliteInput)
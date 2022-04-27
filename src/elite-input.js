import {LitElement, html, css} from 'lit';
import {styleMap} from 'lit/directives/style-map.js';
import internalValMethods from 'elite-forms/src/elite-form-rules'
import debounce from 'elite-forms/src/debounce'

export class EliteInput extends LitElement {
  static get styles() {
    return css`
      :host {
          font-family: monospace;
      }
      .elite-form {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        padding: 10px;
       }
      label {
        font-size: 1.3em;
        font-weight: bold;
        letter-spacing: 0.1em;
      }
      input {
        font-family: monospace;
      }
      ul {
        list-style-type: "✕ ";
      }
  `}

  static properties = {
    id: {},
    name: {},
    class: {},
    type: {},
    label: {},
    placeholder: {},
    note: {},
    validationRules: {}, // this is the prop that the dev passes in
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
    this.eliteForm = true;
    this.id = '';
    this.class = '';
    this.type = 'text';
    this.label = '';
    this.placeholder = '';
    this.note = '';
    this.name = '';
    this.errors = '';
    this.styles = ''; // styles for the most outer div
    this.labelStyles = '';  
    this.inputStyles = ''; 
    this.noteStyles = ''; 
    this.errorStyles = '';
    this.showWordCountStyles = '';
    this.error = {};
    this.showIndex = false;
    this.showVal = false;
    this.conditionalBool = true;
    this.row = '4'; // text area default row
    this.cols = '50'; // text area default columnsg
    this.showWordCount = true;
    this.defaultHidden = ' select one option'
  }

  render() {
    const error = []
    for (let err in this.error) {
      error.push(html`<li>${this.error[err]}</li>`)
    }
    
    if (this.type === 'radio' || this.type === 'checkbox') {
      return html`
        <div class='elite-form' style=${styleMap(this.styles)}>
          <label>${this.label}</label><br>
          <div @change=${this.handleBox} id=${this.id}>
            ${this.options.map((option) => html `
              <input
                type=${this.type}
                name=${this.name}
                class=${this.name}
                value=${option.value}
              >${option.option}<br>
            `
            )}
          <ul 
            class="error" 
            style=${styleMap(this.errorStyles)}>
            ${error} 
          </ul>
          </div>
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
        <div class='elite-form' style=${styleMap(this.styles)}>
          <label>${this.label}</label><br>
          <select id=${this.id} name=${this.name} @change=${this.handleInput}>
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
          <ul 
            class="error" 
            style=${styleMap(this.errorStyles)}>
            ${error} 
          </ul>
        </div>
      `
      } else {
        return html `
        <div class='elite-form' style=${styleMap(this.styles)}>
          <label>${this.label}</label><br>
          <select id=${this.id} name=${this.name} @change=${this.handleInput}>
          <option value='none' selected disabled hidden>${this.defaultHidden}</option>
          ${this.options.map((option) => 
            html `
            <option value=${option.value}>${option.option}</option>
            `)}
          </select>
          <ul 
            class="error" 
            style=${styleMap(this.errorStyles)}>
            ${error} 
          </ul>
        </div>
      `
      }
    } 
    else if (this.type === 'textarea') {
      return html `
      <div class='elite-form' style=${styleMap(this.styles)}>
        <label 
          for=${this.id}
          style=${styleMap(this.labelStyles)}>
            ${this.label && this.label}
        </label>
        <textarea
          id=${this.id}
          @input=${this.handleInput} 
          @blur=${this.handleBlur}
          placeholder=${this.placeholder}
          style=${styleMap(this.inputStyles)}
          row=${this.row}
          cols=${this.cols}></textarea>
        <div
          class="showWordCount" 
          ?hidden=${this.showWordCount === 'false'}
          style=${styleMap(this.showWordCountStyles)}>
            Current word count: ${this.countWords()}
        </div>
        <div 
          class="note" 
          ?hidden=${!this.note} 
          style=${styleMap(this.noteStyles)}>
            ${this.note}
        </div>
        <ul 
          class="error" 
          style=${styleMap(this.errorStyles)}>
            ${error} 
        </ul>
      </div>
      `
    }
    else {
      return html`
      <div class='elite-form' style=${styleMap(this.styles)}>
        <label 
          for=${this.id}
          style=${styleMap(this.labelStyles)}>
            ${this.label && this.label}
        </label>
        <span>
          <span ?hidden=${!this.showIndex}>${this.min}</span>
          <input 
            id=${this.id} 
            type=${this.type}
            @input=${this.handleInput} 
            @blur=${this.handleBlur}
            placeholder=${this.placeholder} 
            min=${this.min}
            max=${this.max}
            style=${styleMap(this.inputStyles)}>
          <span ?hidden=${!this.showIndex}>${this.max}</span>
        </span>
        <div ?hidden=${!this.showVal}>${this.value}</div>
        <div 
          class="note" 
          ?hidden=${!this.note} 
          style=${styleMap(this.noteStyles)}>
            ${this.note}
        </div>
        <ul 
          class="error" 
          style=${styleMap(this.errorStyles)}>
            ${error} 
        </ul>
      </div>
      <div ?hidden=${this.conditionalBool}>
        <slot>
        </slot>
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
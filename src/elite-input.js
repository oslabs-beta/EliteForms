import {LitElement, html, css} from 'lit';
import {styleMap} from 'lit/directives/style-map.js';
import internalValMethods from 'elite-forms/src/elite-form-rules'
import debounce from 'elite-forms/src/debounce'
import context from 'elite-forms/src/context'

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
    eliteForm: {},
    id: {},
    class: {},
    type: {},
    label: {},
    placeholder: {},
    note: {},
    name: {},
    validationRules: {}, // this is the prop that the dev passes in
    asyncValidationRules: {},
    errors: {},
    errorBehavior: {}, 
    validationName: {},
    options: {},
    min: {},
    max: {},
    showIndex: {},
    showVal: {},
    defaultHidden: {},
    conditional: {},
    conditionalField: {}
  }

  static state = {
    internalValMethods: internalValMethods, 
    debounce: debounce,
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
    this.error = {};
    this.showIndex = false;
    this.showVal = false;
    this.defaultHidden = 'select an option';
    this.context = context;
    this.conditionalType = '';
    this.conditionalName = '';
    this.conditionalLabel = '';
  }

  render() {
    console.log('context: ', this.context)
    console.log('typeof conditional ', typeof this.conditional)
    const error = []
    for (let err in this.error) {
      error.push(html`<li>${this.error[err]}</li>`)
    }

    if (this.conditional) {
      console.log('this.conditional: ', this.conditional)
      console.log('this.conditionalField: ', this.conditionalField)
      const result = this.handleConditional(this.conditional)
      console.log('result: ', result)
      if (result === true && this.conditionalField.type === 'text') {
        this.conditionalType = this.conditionalField.type
        this.conditionalLabel = this.conditionalField.label
        this.conditionalName = this.conditionalField.name
        this.conditionalPlaceholder = this.conditionalField.placeholder
        return html`
          <div class='elite-form' style=${styleMap(this.styles)}>
            <label 
              for=${this.id}
              style=${styleMap(this.labelStyles)}>
                ${this.conditionalLabel && this.conditionalLabel}
            </label>
            <span>
              <span ?hidden=${!this.showIndex}>${this.min}</span>
              <input 
                id=${this.id} 
                name=${this.conditionalName}
                type=${this.conditionalType}
                @input=${this.handleInput} 
                @blur=${this.handleBlur}
                placeholder=${this.conditionalPlaceholder} 
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
          `
      } 
    }
    if (this.type === 'radio' || this.type === 'checkbox') {
      return html`
        <label>${this.label}</label><br>
        <div @change=${this.handleBox} id=${this.name}>
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
      `;
    } 
    else if (this.type === 'select') {
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
    `;
    }
  }

  handleConditional(func) {
    // console.log('inside handleConditional func')
    // console.log('handleConditional func: ', func)
    // console.log('context in handleConditional: ', this.context)
    const boolean = func(this.context)
    console.log(boolean)
    return boolean
  }

  handleBox(event) {
    const form = this.shadowRoot.querySelectorAll(`.${this.name}`)
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
    this.handleValidation()
  }

  withDebounce = debounce(() => this.handleValidation(), 500)
  
  handleBlur(event) {
    if (this.errorBehavior === 'blur') {
      const { value } = event.target;
      this.value = value
      this.handleValidation()
    }
  }

  handleInput(event) {
    const { value } = event.target;
    this.value = value
    if (!this.context[this.name]) {
      this.context[this.name] = this.value
    } else {
      this.context[this.name] = this.value
    }
    // console.log(this.context)
    if (this.errorBehavior === 'debounce') {
      this.withDebounce()    
    } else {
      if (this.errorBehavior !== 'blur') {
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
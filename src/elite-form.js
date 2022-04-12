import {LitElement, html, css} from 'lit';
import {styleMap} from 'lit/directives/style-map.js';
import internalValMethods from './elite-form-rules'
import debounce from './debounce'

export class EliteForm extends LitElement {
  static get styles() {
    return css`
      .elite-form{
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        padding: 10px;
        font-family: 'Roboto Slab', serif;
       }`
  }

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
    this.type = '';
    this.label = '';
    this.placeholder = '';
    this.note = '';
    this.name = '';
    this.errors = '';
    this.errorBehavior = ''; 
    this.styles = ''; // styles for the most outer div
    this.labelStyles = '';  
    this.inputStyles = ''; 
    this.noteStyles = ''; 
    this.errorStyles = '';
  }

  // style=${styleMap(this.styles)}

  render() {
    const error = []
    for (let err in this.error) {
      error.push(html`<li>${this.error[err]}</li>`)
    }
    // console.log('this.error before render', this.error)

    return html`
      <div class='elite-form' style=${styleMap(this.styles)}>
        <label 
          for=${this.id}
          style=${styleMap(this.labelStyles)}>
            ${this.label && this.label}
        </label>
        <input 
          id=${this.id} 
          type=${this.type}
          @input=${this.handleInput} 
          @blur=${this.handleValidation}
          placeholder=${this.placeholder} 
          style=${styleMap(this.inputStyles)}
        >
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

  withDebounce = debounce(() => this.handleValidation(), 1000)
  // asyncWithDebounce = debounce(() => this.handdleAsyncValidation(), 1000)

  handleInput(event) {
    const { value } = event.target;
    this.value = value
    if (this.errorBehavior === 'debounce') {
      this.withDebounce()    
    } else {
      this.handleValidation()
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

window.customElements.define('elite-form', EliteForm)
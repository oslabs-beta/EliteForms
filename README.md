# EliteForms

A robust form library for Lit that enriches input components with easy-to-use data validation features.

## Installation

1) ```npm install elite-forms```
2) ```import 'elite-forms'``` into your project file 

## Usage
### Using the elite-form tag ###

Our custom <elite-form> element allows you to validate the entire form before a submit event and comes equipped with a Submit button. 

### Using the elite-input tag: ###

Use our custom <elite-input> tag with your desired type attribute to create any input field.
Types supported include:
* Text
   * Email
   * Password
   * Date
* Radio
* Checkbox
* Select 
* Range
* Textarea

#### Example of text input: ####
```javascript 
<elite-input 
   id='username'
   type='text'
   class="elite-input"
   label='Choose a username' 
   placeholder='username'
   .validationRules= ${{
     required: true,
     alphanumeric: true,
     between: [3,10],
   }}
 ></elite-input>
```
         
#### Example of checkbox input: ####
```javascript 
<elite-input
   id="breakfast"
   type="checkbox"
   class="elite-input"
   label="Pancakes or waffles?"
   name='breakfast'
   note='Note: you can choose both 😉'
   .validationRules=${{
     required: true, 
   }}
   .options=${[
     {option: 'pancakes', value: 'pancakes'},
     {option: 'waffles', value: 'waffles'},
   ]}
></elite-input>
```

### Field Validation: ###

Include the validationRules attribute in your <elite-input> element with the rules you’d like applied to the form field. 
         
#### Example of alphanumeric rule: ####
```javascript 
<elite-input 
   id='username'
   type='text'
   class="elite-input"
   label='Choose a username' 
   validationName='Username'
   note='Note: symbols are not allowed'
   .validationRules= ${{
     alphanumeric: true,
   }}
></elite-input>
```         
#### Example of reqUpper, reqLower, reqSpecialChar rules: ####
```javascript 
<elite-input
   id='password'
   type='password'
   class='elite-input'
   label='Set a password'
   .validationRules= ${{
     reqNumber: true,
     reqUpper: true,
     reqLower: true,
     reqSpecialChar: true
   }}
></elite-input>
```         

### Form Validation: ###

The submit event will not fire successfully unless all fields have passed its validation rules. Our form validator confirms the final state of each element before completing. 

### Conditional Fields: ###

To create conditional fields, you must nest your conditional field within the dependent field. 
```javascript 
<elite-input
   id="dessertconditional"
   type="radio"
   class='elite-input'
   label="choose your dessert"
   name='dessertconditional'
   .options=${[
     {option: 'cake', value: 'cake'}, 
     {option: 'ice cream', value: 'ice cream'}
   ]}
   .conditional=${['ice cream']}
   .validationRules=${{
     required: true,
   }}
 >
   <elite-input
     id="flavor"
     type="radio"
     class="elite-input"
     label="Select a flavor:"
     name="flavor"
     validationName="ice cream"
     .options=${[
       {option: 'vanilla', value: 'vanilla'},
       {option: 'chocolate', value: 'choco'},
       {option: 'strawberry', value: 'strawb'},
       {option: 'neopolitan', value: 'neo'}
     ]}
  ></elite-input>
</elite-input>
```         
         
![dessert_conditional](https://user-images.githubusercontent.com/97770491/165827826-21db2ffc-02de-4d8b-825a-a0e302109470.gif)


## Contributing

We welcome all contributors! 
Features + improvements we’ve started or would like to see implemented:
- Model binding 
- Typescript support 
- Ability to create custom validation rule
- Custom validation error messages

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.
Please make sure to update tests as appropriate.

https://github.com/oslabs-beta/EliteForms

## License
[MIT](https://choosealicense.com/licenses/mit/)

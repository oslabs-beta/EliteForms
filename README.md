# EliteForms

EliteForms is a front end form library built from litElement web components with built-in data validation. Elite forms is lightweight, highly customizable, and extensible.

## Installation

*INSTALLATION INSTRUCTIONS ARE FOR BETA/DEV TESTING ONLY*


1) Clone this repository to a folder where you keep all your software projects. 
i.e /Users/myUserName/Documents/CodeSmith/EliteForms

2) In the terminal navigate to the EliteForms directory you used cloned.

3) In the EliteForms directory run: 
         npm link

4) Navigate to the project directory where you would like to test & use EliteForms.

5) In the test project directory run:  npm link elite-forms

## Usage
For .jsx files, or usage within React components
```
import 'elite-forms';

const App = props => {
  return (
    <elite-form>
        type='email' 
        label='Email:'
        placeholder='email'
        id='email'
        validationRules = {{
          required: true,
          email: true, 
        }}
    </elite-form>
  )
}
```
For usage within vanilla HTML
```
<script type="module" src='../node_modules/elite-forms'></script>
<body>
  <elite-form 
    type='email' 
    label='Email:'
    placeholder='email'
    id='email'
    validationRules = {{
      required: true,
      email: true, 
    }}
  ></elite-form>
</body>
```

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

https://github.com/oslabs-beta/EliteForms

## License
[MIT](https://choosealicense.com/licenses/mit/)
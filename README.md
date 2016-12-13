# babel-plugin-transform-react-handled-props

Generates handledProps from defaultProps and propTypes during the build :sparkles:

## Story

This plugin was originally created for [Semantic React](https://github.com/Semantic-Org/Semantic-UI-React) package.
It implements useful pattern with handled props by component, using it you can let down unhandled props to child component.

## Installation

```sh
$ npm install --save-dev babel-plugin-transform-react-handled-props
```

## Example

**In**

```js
const Baz = (props) => (
  <div {...props} />
);

Baz.propTypes = {
  children: React.PropTypes.node,
  className: React.PropTypes.string
};
```

**Out**

```js
const Baz = (props) => (
  <div {...props} />
);

Baz.handledProps = ['className'];

Baz.propTypes = {
  children: React.PropTypes.node,
  className: React.PropTypes.string
};
```

## Usage

### Via `.babelrc` (Recommended)

**.babelrc**

```json
{
  "plugins": ["transform-react-handled-props"]
}
```

### Via CLI

```sh
$ babel --plugins transform-react-handled-props script.js
```

### Via Node API

```javascript
require("babel-core").transform("code", {
  plugins: ["transform-react-handled-props"]
});
```

## Is it safe?

Absolutely :sunglasses: You can also use in production with [babel-plugin-transform-react-remove-prop-types](https://github.com/oliviertassinari/babel-plugin-transform-react-remove-prop-types) and it will work perfectly.

```js
const Baz = (props) => {
  const rest = _.omit(props, Baz.handledProps);

  return (
    <div {...props}>
      <Foo {...rest} />
    </div>
  )
};
```

## License

**MIT**

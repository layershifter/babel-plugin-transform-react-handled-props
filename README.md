# babel-plugin-transform-react-handled-props

Generates handledProps from defaultProps and propTypes during the build :sparkles:

[![Build Status](https://travis-ci.org/layershifter/babel-plugin-transform-react-handled-props.svg?branch=master)](https://travis-ci.org/layershifter/babel-plugin-transform-react-handled-props)
[![Gemnasium](https://img.shields.io/david/layershifter/babel-plugin-transform-react-handled-props.svg?style=flat)](https://david-dm.org/layershifter/babel-plugin-transform-react-handled-props)
[![npm](https://img.shields.io/npm/v/babel-plugin-transform-react-handled-props.svg?style=flat)](https://www.npmjs.com/package/babel-plugin-transform-react-handled-props)

## Installation

```sh
$ yarn add --dev babel-plugin-transform-react-handled-props
```

*This plugin is for Babel 7. If you need to support Babel 6 use the  [babel6](https://github.com/layershifter/babel-plugin-transform-react-handled-props/tree/babel6) branch.*

## Story

This plugin was originally created for [Semantic UI React](https://github.com/Semantic-Org/Semantic-UI-React) package.
It implements useful pattern with handled props by component, using it you can let down unhandled props to child component.

## Motivation

Let's take an example from real life. There are cases when you need to pass some of the props to the child component.
The simplest way is to use the destruction of the object.

```jsx
const Foo = (props) => {
  const { className, ...rest } = props
  const classes = classNames(className, 'foo')

  return <div {...rest} className={classes} />
}
```

The solution is simple and straightforward, but what if the props that will need to be handled is not used in the method?
We still need to specify it explicitly.

```jsx
class Foo extends React.Component {
  handleClick = (e) => this.props.onClick(e)

  render() {
    const { className, onClick, ...rest } = this.props
    const classes = classNames(className, 'foo')

    return <div {...rest} className={classes} onClick={this.handleClick} />
  }
}
```

And what if there are a lot of components? Yes, we will come to another solution, it's to rely on the React's `propTypes`.
It's a good and logical solution.

```jsx
class Foo extends React.Component {
  static propTypes = {
    className: PropTypes.string,
    onClick: PropTypes.func,
  }

  handleClick = (e) => this.props.onClick(e)

  render() {
    const { className } = this.props
    const classes = classNames(className, 'foo')
    const rest = _.omit(this.props, _.keys(Foo.propTypes))

    return <div {...rest} className={classes} onClick={this.handleClick} />
  }
}
```

Looks pretty good? But, there is only one problem, we don't need `propTypes` in the production build.
We can take the [plugin](https://github.com/oliviertassinari/babel-plugin-transform-react-remove-prop-types) to remove them, but then our solution will be broken?
It's possible that you already use this approach, but you can't get rid of `propTypes` in the your bundle.
This plugin solves the described problem, so you can rely on `propTypes` and at the same time remove them from the production build.

```jsx
class Foo extends React.Component {
  static propTypes = {
    className: PropTypes.string,
    onClick: PropTypes.func,
  }

  handleClick = (e) => this.props.onClick(e)

  render() {
    const { className } = this.props
    const classes = classNames(className, 'foo')
    const rest = _.omit(this.props, Foo.handledProps)

    return <div {...rest} className={classes} onClick={this.handleClick} />
  }
}
```

## Example transform

**In**

```js
const Baz = (props) => (
  <div {...props} />
)

Baz.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
}
```

**Out**

```js
const Baz = (props) => (
  <div {...props} />
)

Baz.handledProps = ['className', 'children'];

Baz.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
}
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

## Options

#### `ignoredProps`

This options allows to ignore some props, this will allow to not add them to `handledProps`.

```json
{
  "plugins": ["transform-react-handled-props", { "ignoredProps": ["children"] }]
}
```

**In**

```js
const Baz = (props) => (
  <div {...props} />
)

Baz.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
}
```

**Out**

```js
const Baz = (props) => (
  <div {...props} />
)

Baz.handledProps = ['className'];

Baz.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
}
```

## Is it safe?

Absolutely :sunglasses: You can also use in production with [babel-plugin-transform-react-remove-prop-types](https://github.com/oliviertassinari/babel-plugin-transform-react-remove-prop-types) and it will work perfectly.

```js
const Baz = (props) => {
  const rest = _.omit(props, Baz.handledProps)

  return (
    <div {...props}>
      <Foo {...rest} />
    </div>
  )
}
```

## License

**MIT**

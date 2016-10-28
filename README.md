# babel-plugin-sui-props



## Example

**In**

```js
// input code
```

**Out**

```js
"use strict";

// output code
```

## Installation

```sh
$ npm install babel-plugin-sui-props
```

## Usage

### Via `.babelrc` (Recommended)

**.babelrc**

```json
{
  "plugins": ["sui-props"]
}
```

### Via CLI

```sh
$ babel --plugins sui-props script.js
```

### Via Node API

```javascript
require("babel-core").transform("code", {
  plugins: ["sui-props"]
});
```

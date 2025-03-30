# nepali-calendar-react

> Made with create-react-library

[![NPM](https://img.shields.io/npm/v/nepali-calendar-react.svg)](https://www.npmjs.com/package/nepali-calendar-react) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
npm install --save nepali-calendar-react
```

## Usage

```jsx
import React, { Component } from 'react'

import { Calender } from 'nepali-calendar-react'
import 'nepali-calendar-react/dist/index.css'

class Example extends Component {
  render() {
    return (
      <Calendar
        language='nepali'
        onDateClicked={(result) => console.log(result)}
        dayClickBehaviour='single'
        mode='monthly'
        startDate='2020/10/21'
      />
    )
  }
}
```

## Props

| Name                  | Required | Type       | Default            | Description                                                        |
| :-------------------- | :------- | :--------- | :----------------- | :----------------------------------------------------------------- |
| `language`            | No       | `String`   |    `english`       | A language of preference `english` or `nepali`                     |
| `mode`                | No       | `String`   | `monthly`          | Wheather a single year or multiple year should be available        |
| `onDateClicked`       | Yes      | `Function` |                    | return array if `multiple` dayClickedBehaviour else returns object |
| `dayClickedBehaviour` | No       | `String`   | `single`           | whether single or multiple date should be selected on click        |
| `sartDate`            | No       | `Date`     | current Date       | takes date in ad                                                   |

## License

MIT © [Sajandhakal12](https://github.com/Sajandhakal12)

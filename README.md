## Live demo
The project can be accessed [here](https://prsevero.com.br/css-highlights/).

## Project
Autocomplete Component with essential features:
- Data loaded from external API (list of countries)
- Client-side filtering
- Highlights matched strings without adding new DOM elements (with polyfill when unsupported)

## How it works
The app loads a list of 100 countries. It accepts `objects` and can have key/id and label/text customized, defaults to `id` and `text`. Users can then search for any country, and the matching results will be displayed below the input field, with the matched string highlighted.

## Architecture

- app: global application files (api, types, utils...)
- assets: static files
- components: UI components

## Stack

- [TypeScript](https://www.typescriptlang.org)
- [React](https://react.dev)
- [Vite](https://vitejs.dev)
- [Vitest](https://vitest.dev)
- [React Testing Library](https://github.com/testing-library/react-testing-library)

## TODO / Improvements

Here is a list of improvements and next steps:
- Add keyboard events such as key up, key down and enter, for moving and selection
- Improve polyfill to highlight multiple matches in same string
- Include a button to quickly clear the selection
- Enhance the overall UI

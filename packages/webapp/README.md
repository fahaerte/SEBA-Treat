# Webapp

## Start Scripts

- First, you need to execute `yarn install` and `yarn build:lib` from the root directory
- Run `yarn start` to start your application in the packages/webapp directory
- Webapp is available on [http://localhost:3000](http://localhost:3000)

## Technologies

**UI Components and Styling**
Sometimes, in the styles.ts files, the hexadecimal color codes for opacity are used.<br/>
This is necessary, since the colors are defined in the theme as hex codes.
<br/>
For a quick lookup, reference this README to get the color codes during development: [https://gist.github.com/lopspower/03fb1cc0ac9f32ef38f4]().
- Styled-Components
- Sass
- Bootstrap

**Webapp Logic**

- Redux Toolkit
- React Router v6

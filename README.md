# NASA Capstone Project V2

## Table of Contents

- [NASA Capstone Project V2](#nasa-capstone-project-v2)
  - [Table of Contents](#table-of-contents)
  - [Introduction](#introduction)
  - [Features](#features)
  - [Installation](#installation)
  - [Usage](#usage)
  - [Directory Structure](#directory-structure)
    - [`assets`](#assets)
    - [`components`](#components)
      - [ASOD.jsx Component](#asodjsx-component)
        - [Description](#description)
        - [State Variables](#state-variables)
        - [Functions](#functions)
        - [Usage](#usage-1)
        - [Props](#props)
        - [Dependencies](#dependencies)
    - [`styles`](#styles)
    - [`App.css`](#appcss)
    - [`App.jsx`](#appjsx)
    - [`index.css`](#indexcss)
    - [`main.jsx`](#mainjsx)
  - [Contributing](#contributing)
  - [License](#license)

## Introduction

This project is a remake of a capstone application for a bootcamp. It aims to provide a media player and a population globe.

## Features

- Media Player
- Population Globe

## Installation

Clone the repository and navigate to the project directory. Then run:

```bash
npm install
```

## Usage

To start the application, run:

```bash
npm start
```

## Directory Structure

```
src/
|-- assets/
|-- components/
|-- styles/
|-- App.css
|-- App.jsx
|-- index.css
|-- main.jsx
```

### `assets`

Contains initial Vite setup files.

### `components`

Contains files related to the media player's styling.

#### ASOD.jsx Component

##### Description

The `ASOD.jsx` component is responsible for displaying NASA's Astronomy Picture of the Day (ASOD). It fetches the ASOD data and renders it as either an image or a video, depending on the media type. The component also allows users to save the current ASOD to their list of favorites.

##### State Variables

- `asod`: Holds the ASOD data.
- `media`: Holds the HTML for rendering the ASOD.
- `favorites`: Holds the list of favorite images.
- `loading`: Manages the loading state.

##### Functions

- `getAsod()`: Fetches ASOD data.
- `getFavorites()`: Fetches the list of favorite images.
- `saveButton()`: Saves the current ASOD to favorites.

##### Usage

This component is used within the main application to display the ASOD. It is a self-contained unit that manages its own state and API calls.

```javascript
import ASOD from "./components/ASOD";

function App() {
  return (
    <div>
      <ASOD />
    </div>
  );
}
```

##### Props

None.

##### Dependencies

- React
- Axios

### `styles`

Contains files related to table scrolling behavior.

### `App.css`

Handles video loading styles.

### `App.jsx`

Responsible for rendering the population globe with the correct name.

### `index.css`

Contains Tailwind CSS configuration.

### `main.jsx`

Wraps the application in a browser router.

## Contributing

Please read [CONTRIBUTING.md](CONTRIBUTING.md) for details on how to contribute to this project.

## License

This project is licensed under the MIT License.

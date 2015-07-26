# agile-prototyping-skeleton

Inspired by [generator-webpack-es6-cssnext](https://github.com/ilkka/generator-webpack-es6-cssnext)

## Installation

`npm i`

## Start Dev Server

add these two lines just before `</body>`, this is specifically for development. If you are building the project for production, you should remove these lines.

``` html
<script src="http://localhost:8080/webpack-dev-server.js"></script>
<script src="bundle.js"></script>
```

then

`npm start`

## Build for Production

add the line below just before `</body>`

`<script src="build/bundle.js"></script>`

add the setting below to enable javascript uglify(optional)

``` javascript
  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    }),
    ...
  ]

```

then

`npm run build`
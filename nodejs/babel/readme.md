# install

```
npm install --save-dev babel-preset-es2015 babel-preset-stage-2 babel-preset-react babel-cli
```

`.babelrc`:

```
  {
    "presets": [
      "es2015",
      "react",
      "stage-2"
    ],
    "plugins": []
  }
```

# run

`babel src -d lib`
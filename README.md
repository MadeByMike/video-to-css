# Video to CSS
A hack project. It is a bit stupid so maybe don't do it.

## If you must

```
npm i
npm start
```

This will build a `test.html` file from `test.gif` in the root directory change the source and destination files `index.js`.

## More disclaimers

This will probably chrash your browser! In my tests Firefox worked best. It also helped slowing the duration (vars in `index.js`).

It does some smart stuff like remove duplicate frames but if there are any other optomisation that could make it work better (or work at all) let me know.

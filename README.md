# libs-compiler-starter

Bundler dinámico de módulos JS hecho en TS.

## Base

La base funcional del proyecto es la misma que en el proyecto:

- [https://github.com/allnulled/tsc-starter](https://github.com/allnulled/tsc-starter).

La diferencia es que partimos de tener un compilador para usar en runtime.

## Uso

Para compilar:

```js
const compilation = await Compiler.create("basedir/of/modules").compile("/path/to/entry.js");

console.log(compilation.output.js);
```

Para importar:

```js
const val1 = Libs.require("path/to/importable.js");
const val2 = await Libs.async("path/to/asynchronous/importable.js");
const val3 = await Libs.require("./relative.js");
const str4 = await Libs.source("./source.html");
```

Para exportar:

```js
module.exports = function() {
   console.log("This module exported a function");
}
```

## Entradas

Alineado con la *Arquitectura Troyánica*, las entradas son las siguientes:

- **bin**: desde `src/entry/bin/index.js`
- **server**: desde `src/entry/server/index.js`
- **client**: desde `src/entry/client/index.js`
- **web**: desde `src/entry/web/index.js`
- **desktop**: desde `src/entry/desktop/index.js`

### Otros ficheros importantes

- en el `dist/libs-compiler.dist.js` está el compilador
- en el `src/libs-compiler.ts` empieza el compilador

## ¿Por qué?

- TypeScript permite código JavaScript
- Pero un bundler en runtime desde el navegador que use TypeScript sería excesivo
- Esta pequeña API permite tener un bundler en runtime desde el navegador que NO usa TypeScript
   - Pero puedes tener tus `*.ts` para fabricar los bundleables igual
      - (Que es el siguiente punto del proyecto)



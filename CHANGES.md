# Done

- [ ] Compilación en TypeScript
   - [ ] Para tipos y ctrl + espacio
- [ ] Compilación con Libs
   - [ ] Para modularidad en runtime
- [ ] Compilación selectiva
   - [ ] Para compilar solo los entry mínimos
   - [ ] Configurable desde `commands/utils/hasSpecificEntry.js`
- [ ] Carpetas con compilación abreviada:
   - [ ] `src/app/{entry}.ts`: una entrada de aplicación
   - [ ] `src/app/{entry}/`: un directorio de entrada
   - [ ] `src/test/{entry}.test.ts`: un test de entrada
   - [ ] `src/test/{entry}.test/`: un directorio de test de entrada
- [ ] Otros ficheros y carpetas importantes:
   - [ ] `src/external/libs-compiler/`: aquí va el código del compilador de libs
   - [ ] `src/libs/`: aquí irían las libs satelitales no específicas
   - [ ] `src/libs/settings.json`: aquí van las configuraciones del compiler de Libs
      - [ ] que algunas opciones pueden heredarse, como: `settings.json#drivers`
   - [ ] `src/types/`: aquí irían los tipos
   - [ ] `src/types/global.d.ts`: aquí van los tipos globales automáticamente inyectados
   - [ ] `dist/`: aquí van los distribuibles
   - [ ] `dist/app/{entry}/{entry}.dist.js`: una entrada de aplicación
   - [ ] `dist/app/{entry}/{entry}.test.dist.js`: un test de entrada de aplicación
   - [ ] `commands/dev.sh`: el loop con `refrescador`
   - [ ] `commands/build.js`: comando para reconstruir proyecto
      - [ ] Si puede especificar una entry, solo compila esa entry
   - [ ] `commands/test.js`: comando para testear proyecto
      - [ ] Si puede especificar una entry, solo testea esa entry
- [ ] Soporte para inyectar texto por fichero
   - [ ] en TS con `source\`ruta/a/fichero.txt\``
- [ ] Soporte para shortnames en los paths
- [ ] Sirviendo cliente web automático
   - [ ] Con refresco sincronizado a cambios ya bindeado gracias a `refrescador --serve`
   - [ ] Con vista web segura porque `refrescador --serve dist/app/web` es un directorio seguro
- [ ] Con `entries` definidas pero:
   - [ ] no polucionan el scope: en `src/app`
   - [ ] con distribuible: en `dist/app/{entry}/{entry}.dist.js`
   - [ ] con testeable: en `dist/app/{entry}/{entry}.test.dist.js`
   - [ ] con compilaciones optimizadas para cada caso
   - [ ] con soporte de TS
   - [ ] con soporte de comandos dinámicos con `Libs`
- [x] que los src/modules/**/*.ts se compilen:
   - [x] independientemente, como 1 specific entry (pero sin serlo)
   - [x] independientemente, sin triggear a todo el toolchain
   - [x] independientemente, como 1 fichero js aislado
   - [x] y la salida aparezca justo al lado en formato js
   - [x] y use module.exports para sacar valores

# To-do

- [ ] que se puedan hacer copias de los dist desde configuraciones del `build.js`
   - [ ] usando de pivotador al `libsconfig.js#copies.<entry>.*`
- [ ] 



- [x] los Libs.require(...) para sync o async, solo que usas el await o no
- [x] Entrada common
- [ ] los Libs.asyncly() para indicar que un fichero es módulo asíncrono (devuelve una promise)
- [ ] Que libs devuelva el css en un json
   - [ ] Mergearlo dinámicamente en js y en orden desde Libs a mano (Libs.css)
   - [ ] Consultar a chatgpt
- [x] libsconfig.js#drivers generando settings.json#drivers y tsconfig.json#compilerOptions.paths
- [ ] Otras demos varias:
   - [ ] cómo hacer un módulo Libs y reusar tipos
   - [ ] cómo hacer una vista
   - [ ] cómo hacer un comando de entrada estático de: bin,server,client,web,common
   - [ ] Libs.require("{bin.command}/path/to/command.js")
   - [ ] Y demo de cómo se reusan tipos








- [ ] Soporte para inyectar texto por fichero
   - [ ] FALSO: la inyección de source se hace en compilation-time no runtime
   - [ ] la hace rollup al pasar a js con `source\`fichero.txt\``
   - [ ] en Libs con `Libs.source("ruta/a/fichero.txt")`
- [ ] Soporte para shortnames en los paths 
   - [ ] en Libs con `Libs.settings.drivers` en `src/libs/settings.json#drivers`
- [ ] Primeras clases abstractas:
   - [ ] AbstractProgram
   - [ ] AbstractCommand
- [ ] Primeras clases para cli:
   - [ ] BinaryProgram extends AbstractProgram
   - [ ] BinaryCommand extends AbstractCommand
      - [ ] usa el filetree
      - [ ] no hagas inventos
      - [ ] apóyate en los directorios para hacer los endpoints de los comandos base
      - [ ] aquí no hagas inventos
         - [ ] pivota en 1 o 2 o 1 familia de comandos
      - [ ] pero que de cada comando pueda sacarse el `help.txt`
      - [ ] y que se puedan encontrar con `**/help.txt`
      - [ ] y que se puedan extender añadiendo ficheros sin pensar mucho más
- [ ] Primeras clases para server:
   - [ ] StationProgram extends AbstractProgram
   - [ ] StationStationCommand extends AbstractCommand
- [ ] Primeras clases para client:
   - [ ] SateliteProgram extends AbstractProgram
   - [ ] SateliteCommand extends AbstractCommand
- [ ] Primeras clases para gui:
   - [ ] View
      - [ ] para vistas vue
      - [ ] que use el source
   - [ ] Gui
   - [ ] GuiProgram extends EndpointProgram (pero no usa el history sino uno propio)
   - [ ] GuiCommand extends EndpointCommand
   - [ ] EndpointProgram extends AbstractProgram
   - [ ] EndpointCommand extends AbstractCommand

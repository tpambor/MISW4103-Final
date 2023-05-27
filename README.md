# MISW4103 Semana 8

## Generación de datos
Equipo #3
- Laura Alejandra Carrillo Guzmán, l.carrillog@uniandes.edu.co​​
- Sandra Victoria Hurtado Gil, sv.hurtadog@uniandes.edu.co​​
- Leidy Viviana Osorio Jimenez, l.osorioj@uniandes.edu.co​​
- Tim Ulf Pambor, t.pambor@uniandes.edu.co​​

## Retrospectiva
https://miro.com/app/board/uXjVMFMo-RM=/?share_link_id=289633975934

## Descripción de las estrategias usadas

[Estrategias usadas](https://github.com/tpambor/MISW4103-GenDatos/wiki/Estrategias-usadas)

## Instrucciones para ejectuar análisis de código estático con [eslint](https://eslint.org/)
1. Iniciar un contenedor docker de Node 12.22.12 con `docker run --rm -it node:12.22.12-bullseye bash`
2. Preparar el entorno con el commando `apt update && apt install -y libvips-dev python-is-python3`
3. Instalar el código fuente de Ghost con `git clone https://github.com/TryGhost/Ghost.git`
4. Ir al carpeta con el código de Ghost con `cd Ghost`
5. Hacer checkout de la versión 3.41.1 con `git checkout tags/3.41.1`
6. Bajar los git submodules con `git submodule update --init --recursive`
7. Instalar las dependencias con `yarn install`
8. Instalar las dependencias para ejecutar eslint con `yarn add babel-eslint`
9. Ejecutar el análisis de código estático con eslint usando `node_modules/.bin/eslint 'core/**/*.js'`

## Instrucciones para ejecutar pruebas Cypress
1. Clonar este repositorio
2. Ir a la carpeta Cypress
3. Instalar las dependencias con `npm install`
4. Ejecutar Ghost 3.41.1 con Docker `docker run --rm -t -p 2368:2368 ghost:3.41.1` (recomendado) o de forma local siguiendo las instrucciones del [tutorial](https://thesoftwaredesignlab.github.io/AutTestingCodelabs/ghost-local-deployment/index.html)
5. Si Ghost está ubicado en una dirección differente a http://localhost:2368, hay que cambiar el `baseUrl` en `cypress.config.js`
6. Si aun **no** ha creado un sitio en Ghost
    * se puede crear de forma automatizado, ir a punto 8
    * se puede crear de forma manual en http://127.0.0.1:2368/ghost/#/setup/one, ir a punto 7
7. Si ya ha creado un sitio en Ghost, se puede configurar `username` y `password` en `cypress.config.js` con los datos del usuario para ejecutar las pruebas
8. Iniciar Cypress (ubicado en la carpeta cypress):
    * Para Linux, ejecuta `./node_modules/.bin/cypress open` para iniciar Cypress
    * Para Windows, ejecuta `node_modules\.bin\cypress open` para iniciar Cypress
9. Seleccionar `E2E Testing`
10. Seleccionar `Chrome`/`Chromium` y haz clic en `Start E2E Testing in Chromium`
11. Seleccionar el archivo que se desea ejecutar (create-post, create-tag o editar-perfil).
12. Se puede observar la ejecución de las pruebas y sus resultados, tanto los exitosos como los que fallan (de los cuales se reportan los correspondientes issues).

## Instrucciones para ejecutar pruebas Kraken y Kraken-Apriori
1. Ejecutar Ghost 3.41.1 con Docker `docker run --rm -t -p 2368:2368 ghost:3.41.1` (recomendado) o de forma local siguiendo las instrucciones del [tutorial](https://thesoftwaredesignlab.github.io/AutTestingCodelabs/ghost-local-deployment/index.html)
2. Crear, en Ghost, un usuario (puede ser el usuario administrador) y tener un sitio (puede ser el que se crea por defecto).
2. Clonar este repositorio
3. Ir a la carpeta Kraken o a la carpeta Kraken-Apriori (para ambas el funcionamiento es igual, pero con estrategias diferentes).
4. Instalar Kraken con el comando `npm install kraken-node`. Se puede ver más información sobre el uso de Kraken en este [tutorial](https://thesoftwaredesignlab.github.io/AutTestingCodelabs/kraken-web-testing-tool/index.html)
5. Abrir el archivo `properties.json` y actualizar los enlaces, el email y el password correspondientes a la instalación que tiene de Ghost
6. En la carpeta features: **Renombrar el archivo que se desee ejecutar** para que tenga la extensión "feature" (solo un archivo con esta extensión cada vez).
7. Ejecutar las pruebas, estando en la caperta Kraken (o Kraken-Apriori), con el comando: `node "./node_modules/kraken-node/bin/kraken-node" run`
8. Se pueden observar los resultados por consola, tanto los exitosos como los que fallan (de los cuales se reportan los correspondientes issues).

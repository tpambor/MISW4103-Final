# MISW4103 Semana 8

Equipo #3
- Laura Alejandra Carrillo Guzmán, l.carrillog@uniandes.edu.co​​
- Sandra Victoria Hurtado Gil, sv.hurtadog@uniandes.edu.co​​
- Leidy Viviana Osorio Jimenez, l.osorioj@uniandes.edu.co​​
- Tim Ulf Pambor, t.pambor@uniandes.edu.co​​

## Estrategia final de pruebas
[Estrategia Final del Grupo #3](https://github.com/tpambor/MISW4103-Final/blob/main/Estrategia/estrategia-grupo3.pdf).

Puede verse el documento en Word aquí: [Estrategia en Word](https://github.com/tpambor/MISW4103-Final/blob/main/Estrategia/estrategia-grupo3.docx).

Un resumen de la estrategia se puede encontrar aquí: [Resumen estrategia](https://github.com/tpambor/MISW4103-Final/wiki/Estrategia-de-pruebas).

## Video
VIDEO - FALTA

## Aspectos complementarios
* [Inventario de pruebas manuales](https://github.com/tpambor/MISW4103-Final/blob/main/Estrategia/InventarioPruebasExploratorias.pdf). También se puede ver el documento original en excel: [Inventario de pruebas en excel](https://github.com/tpambor/MISW4103-Final/blob/main/Estrategia/InventarioPruebasExploratorias.xlsx)
* [Wiki con Pros y Contras de Herramientas](https://github.com/tpambor/MISW4103-Final/wiki)
* [Resultados de esta semana](https://github.com/tpambor/MISW4103-Final/wiki/Resultados-Semana-8)
* [Retrospectiva](https://miro.com/app/board/uXjVMFMo-RM=/?share_link_id=289633975934)

## Instrucciones para ejecutar las diferentes pruebas
* [Análisis estático con SonarQube](#sonarqube)
* [Análisis estático con ESLint](#eslint)
* [Análisis estático con JSHint](#jshint)
* [Pruebas con Cypress](#cypress)
* [Reporte de regresión visual](#reporte)
* [Pruebas con Kraken](#kraken)

<a name="sonarqube"></a>
## Instrucciones para ejecutar análisis de código estático con [Sonarqube](https://www.sonarsource.com/products/sonarqube/)
1. Es necesario tener acceso a una instancia de Sonarqube, si aun no cuentas con una instancia de Sonarqube puedes crear una nueva instancia siguiendo las instrucciones en https://docs.sonarqube.org/latest/try-out-sonarqube/
2. Crear un nuevo proyecto en Sonarqube como en el imagen
![Create](https://github.com/tpambor/MISW4103-Final/assets/1379478/84eadc3b-90e3-4b66-9608-0753f5241304)
3. Seleccionar "Locally"
![Create](https://github.com/tpambor/MISW4103-Final/assets/1379478/9be34120-bd39-464e-a95b-6f90d154b94a)
4. Generar un nuevo token de acceso
![Create](https://github.com/tpambor/MISW4103-Final/assets/1379478/bce521f8-5f8d-4f23-bd85-867e3a803128)
5. Bajar el código fuente de Ghost con `git clone https://github.com/TryGhost/Ghost.git`
6. Ir al carpeta con el código de Ghost con `cd Ghost`
7. Hacer checkout de la versión 3.41.1 con `git checkout tags/3.41.1`
8. Bajar los git submodules con `git submodule update --init --recursive`
9. Bajar y instalar el SonarScanner de la página https://docs.sonarqube.org/10.0/analyzing-source-code/scanners/sonarscanner/
10. Ejecutar el análsis de código estático con `sonar-scanner -Dsonar.projectKey=MISW4103-FINAL-GRUPO3 -Dsonar.sources=core -Dsonar.host.url=<SONAR_URL> -Dsonar.token=<SONAR_TOKEN>` donde <SONAR_URL> es la URL a la instancia de Sonarqube y <SONAR_TOKEN> es el token creado
12. En la página del proyecto en Sonarqube se puede mirar los resultados
![Screenshot 2023-05-25 11 08 55](https://github.com/tpambor/MISW4103-Final/assets/1379478/2ef97857-335f-4ee5-8ba0-b2be9c5ea895)

<a name="eslint"></a>
## Instrucciones para ejecutar análisis de código estático con [ESLint](https://eslint.org/)
1. Iniciar un contenedor docker de Node 12.22.12 con `docker run --rm -it node:12.22.12-bullseye bash`
2. Preparar el entorno con el commando `apt update && apt install -y libvips-dev python-is-python3`
3. Instalar el código fuente de Ghost con `git clone https://github.com/TryGhost/Ghost.git`
4. Ir al carpeta con el código de Ghost con `cd Ghost`
5. Hacer checkout de la versión 3.41.1 con `git checkout tags/3.41.1`
6. Bajar los git submodules con `git submodule update --init --recursive`
7. Instalar las dependencias con `yarn install`
8. Instalar las dependencias para ejecutar eslint con `yarn add babel-eslint`
9. Ejecutar el análisis de código estático con eslint usando `node_modules/.bin/eslint 'core/**/*.js'`

<a name="jshint"></a>
## Instrucciones para ejecutar análisis de código estático con [JSHint](https://jshint.com/)
1. Instalar el código fuente de Ghost con `git clone https://github.com/TryGhost/Ghost.git`
2. Ir al carpeta con el código de Ghost con `cd Ghost`
3. Hacer checkout de la versión 3.41.1 con `git checkout tags/3.41.1`
4. Bajar los git submodules con `git submodule update --init --recursive`
5. Instalar el programa JSHint con `npm install --save-dev jshint`
6. En esa misma carpeta crear un archivo llamado ".jshintrc" que internamente tiene lo siguiente:
```json
{
  "esversion": 11,
  "globals":{
    "Promise":true
  }
}
```
7. Ejecutar el análisis con `node node_modules/jshint/bin/jshint core`

<a name="cypress"></a>
## Instrucciones para ejecutar pruebas con Cypress (E2E, VRT y Generación de Datos)
1. Clonar este repositorio
2. Ir a la carpeta Cypress
3. Instalar las dependencias con `npm install`
4. Ejecutar Ghost 3.41.1 con Docker `docker run --rm -t -p 2368:2368 ghost:3.41.1` (recomendado) o de forma local siguiendo las instrucciones del [tutorial](https://thesoftwaredesignlab.github.io/AutTestingCodelabs/ghost-local-deployment/index.html)
   * (OPCIONAL): Si se desea hacer una prueba de regresión visual, se deben seguir estos mismos pasos pero cambiando la versión de Ghost, por ejemplo, por la 4.44.0, y configurando la opción correspondiente en el archivo `cypress.config.js` (ver paso 7).
5. Si Ghost está ubicado en una dirección differente a http://localhost:2368, hay que cambiar el `baseUrl` en `cypress.config.js`
6. Si aun **no** ha creado un sitio en Ghost
    * se puede crear de forma automatizado, ir a punto 8
    * se puede crear de forma manual en http://127.0.0.1:2368/ghost/#/setup/one, ir a punto 7
7. Si ya ha creado un sitio en Ghost, se puede configurar `username` y `password` en `cypress.config.js` con los datos del usuario para ejecutar las pruebas. Si se desean ejecutar pruebas de regresión visual, se debe cambiar el valor de `screenshotEnabled`.
8. Iniciar Cypress (ubicado en la carpeta cypress):
    * Para Linux, ejecuta `./node_modules/.bin/cypress open` para iniciar Cypress
    * Para Windows, ejecuta `node_modules\.bin\cypress open` para iniciar Cypress
9. Seleccionar `E2E Testing`
10. Seleccionar `Chrome`/`Chromium` y haz clic en `Start E2E Testing in Chromium`
11. Seleccionar el archivo que se desea ejecutar (create-post, create-tag, editar-perfil, editar-design, create-tag-pseudo, editar-perfil-pseudo).
12. Se puede observar la ejecución de las pruebas y sus resultados, tanto los exitosos como los que fallan (de los cuales se reportan los correspondientes issues). Si se habilitó la opción de screenshots, se pueden ver las imágenes en la carpeta "screenshots" bajo "cypress".

<a name="reporte"></a>
## Instrucciones para generar el reporte HTML 
1. Clonar este repositorio
2. Ir a la carpeta ResembleJS
3. Instalar las dependencias con `npm install`
4. En la carpeta ResembleJS crear una carpeta llamada "ghost3". 
5. Copiar en esta carpeta los screenshots resultantes de la ejecución con Ghost3 (que están dentro de la carpeta screenshots). O también se puede decargar y descomprimir en esta carpeta el archivo "cypress-screenshots-ghost3" que se encuentra en [Resultados ejecución pruebas](https://github.com/tpambor/MISW4103-VRT/actions/runs/4970812573).
6. En la carpeta ResembleJS crear una carpeta llamada "ghost4". 
7. Copiar en esta carpeta los screenshots resultantes de la ejecución con Ghost4 (que están dentro de la carpeta screenshots). O también se puede decargar y descomprimir en esta carpeta el archivo "cypress-screenshots-ghost4" que se encuentra en [Resultados ejecución pruebas](https://github.com/tpambor/MISW4103-VRT/actions/runs/4970812573).
8. Desde la carpeta ResembleJS ejecutar el comando  `node index.js`
9. Abrir el reporte, que queda en /ResembleJS/results/report.html

<a name="kraken"></a>
## Instrucciones para ejecutar pruebas Kraken y Kraken-Apriori (E2E y Generación de Datos)
1. Ejecutar Ghost 3.41.1 con Docker `docker run --rm -t -p 2368:2368 ghost:3.41.1` (recomendado) o de forma local siguiendo las instrucciones del [tutorial](https://thesoftwaredesignlab.github.io/AutTestingCodelabs/ghost-local-deployment/index.html)
2. Crear, en Ghost, un usuario (puede ser el usuario administrador) y tener un sitio (puede ser el que se crea por defecto).
3. Clonar este repositorio
4. Ir a la carpeta Kraken o a la carpeta Kraken-Apriori (para ambas el funcionamiento es igual, pero con estrategias diferentes).
5. Instalar Kraken con el comando `npm install kraken-node`. Se puede ver más información sobre el uso de Kraken en este [tutorial](https://thesoftwaredesignlab.github.io/AutTestingCodelabs/kraken-web-testing-tool/index.html)
6. Abrir el archivo `properties.json` y actualizar los valores de `email` y `password` correspondientes a la instalación que tiene de Ghost. En caso de tener una dirección diferente a http://localhost:2368 también hay que actualizar los enlaces en este archivo. OPCIONAL: Si se desea tener los screenshot con nombres más significativos que los genera automáticamente Kraken, se debe cambiar a "YES" el valor de `Screenshots`.
7. En la carpeta features: **Renombrar el archivo que se desee ejecutar** para que tenga la extensión "feature" (solo un archivo con esta extensión cada vez).
8. Ejecutar las pruebas, estando en la caperta Kraken (o Kraken-Apriori), con el comando: `node "./node_modules/kraken-node/bin/kraken-node" run`
9. Se pueden observar los resultados por consola, tanto los exitosos como los que fallan (de los cuales se reportan los correspondientes issues). En el caso de haber seleccionado la opción de screenshots, se pueden observar en la carpeta "screenshots" que se crea.


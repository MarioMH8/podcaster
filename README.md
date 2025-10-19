<h1 align="center">
  Podcaster
</h1>

<p align="center">
  Mini aplicación para escuchar podcasts musicales.
</p>

<p align="center">
  <img alt="Static Badge" src="https://img.shields.io/badge/version-v.1.0.0-blue">
  <img alt="Static Badge" src="https://img.shields.io/badge/build-passing-green">
  <img alt="Static Badge" src="https://img.shields.io/badge/coverage-100%25-green">
</p>

Indice
======

<!--ts-->

* [Instalación](#instalación)
* [Uso](#uso)
    * [Desarrollo](#desarrollo)
    * [Producción](#producción)
* [Comandos disponibles](#comandos-disponibles)
* [Estructura del proyecto](#estructura-del-proyecto)
* [Stack tecnológico y librerías utilizadas](#stack-tecnológico-y-librerías-utilizadas)
* [FAQs](#faqs)
* [Puntos de mejora](#puntos-de-mejora)

<!--te-->

## Instalación

Para clonar el repositorio, utiliza el siguiente comando:

```bash
git clone git@github.com:MarioMH8/podcaster.git
```

Instala las dependencias del proyecto con tu gestor de paquetes preferido (`npm` / `yarn` / `pnpm` / `bun`).

```bash
npm install
```

## Uso

A continuación se describen las diferentes formas de ejecutar la aplicación.

### Desarrollo

Para iniciar la aplicación en modo desarrollo, utiliza el siguiente comando:

```bash
npm run dev
```

Se iniciará un servidor de desarrollo y podrás acceder a la aplicación en tu navegador web en la dirección
[http://localhost:5173](http://localhost:5173).

### Producción

Antes de ejecutar la aplicación en modo producción, es necesario construir el proyecto. Utiliza el siguiente comando
para construir el proyecto:

```bash
npm run build
```

Una vez construido el proyecto, puedes iniciar la aplicación en modo producción con el siguiente comando:

```bash
npm run preview
```

La aplicación estará disponible en tu navegador web en la dirección [http://localhost:4173](http://localhost:4173).

## Comandos disponibles

En el archivo `package.json` se encuentran los siguientes comandos disponibles:

- `build`: Construye el proyecto para producción.

```bash
npm run build
```

- `dev`: Inicia la aplicación en modo desarrollo.

```bash
npm run dev
```

- `lint`: Ejecuta el linter para verificar la calidad del código.

```bash
npm run lint
```

- `lint:fix`: Ejecuta el linter y corrige automáticamente los problemas encontrados.

```bash
npm run lint:fix
```

- `preview`: Inicia la aplicación en modo producción.

```bash
npm run preview
```

- `test`: Ejecuta los tests del proyecto.

```bash
npm run test
```

- `test:coverage`: Ejecuta los tests midiendo la cobertura de código.

```bash
npm run test:coverage
```

- `typecheck`: Verifica los tipos de TypeScript en el proyecto.

```bash
npm run typecheck
```

### Estructura del proyecto

Se ha desarrollado el proyecto siguiendo la metodología Clean Architecture, dividiendo el código en diferentes capas
para mejorar la mantenibilidad y escalabilidad del proyecto. A continuación se describe la estructura del proyecto:

- `src/`: Contiene todo el código fuente de la aplicación.
    - `domain/`: Contiene las entidades de dominio así como los value objects y las interfaces de los repositorios.
    - `application/`: Contiene los casos de uso de la aplicación.
    - `infrastructure/`: Encontramos las implementaciones de los repositorios y servicios externos.
    - `presentation/`: En esta capa se encuentra la interfaz de usuario y los componentes de React.
        - `pages`: Contiene las páginas principales de la aplicación.
        - `components/`: Contiene los componentes reutilizables de la aplicación.
        - `features/`: Contiene las componentes de React que implementan funcionalidades específicas de la aplicación.
        - `context/`: Contiene los hooks encargados de exponer los datos y funcionalidades de la aplicación.
        - `utils/`: Contiene funciones y utilidades reutilizables en toda la aplicación.
    - `container.ts`: Contenedor de inyección de dependencias.
- `e2e/`: Contiene los tests `e2e` de la aplicación.
- `mock/`: Contiene datos de prueba y mocks para facilitar el desarrollo y las pruebas.
- `public/`: Contiene archivos estáticos del proyecto.

### Stack tecnológico y librerías utilizadas

El proyecto ha sido desarrollado utilizando las librerías:

- [**React**](https://es.react.dev/): Biblioteca principal para construir la interfaz de usuario.
- [**Wouter**](https://www.npmjs.com/package/wouter): Alternativa ligera a React Router para el enrutamiento de la
  aplicación.
- [**Zod**](https://zod.dev/): Biblioteca para la validación de esquemas de datos.
- [**Inversify**](https://inversify.io/): Contenedor de inyección de dependencias para gestionar las dependencias de la
  aplicación.
- [**normalize.css**](https://necolas.github.io/normalize.css/): Reset de CSS.

A continuación, se detallan otras librerías y herramientas utilizadas en el proyecto:

- [**Vite**](https://vitejs.dev/): Herramienta de construcción y desarrollo rápido para proyectos web.
- [**Vitest**](https://vitest.dev/): Se utiliza como framework de pruebas.
- [**ESLint**](https://eslint.org/): Herramienta para identificar errores y formatear el código (Utilizando Prettier).
- [**Testing Library**](https://testing-library.com/): Librería para realizar pruebas de componentes de React.
- [**HappyDOM**](https://github.com/capricorn86/happy-dom): Implementación de DOM para entornos de prueba.
- [**MSW**](https://mswjs.io/): API para simular peticiones HTTP en pruebas y desarrollo.

### FAQs

**¿Por qué las versiones del `package.json` están 'bloqueadas' a una versión en específico?**

Para evitar posibles problemas de compatibilidad que puedan surgir al actualizar las dependencias a versiones. En estos
casos, suelo configurar herramientas como Renovate o Dependabot para gestionar las actualizaciones de las dependencias
de manera controlada y segura.

**¿Por qué los tests no están en una carpeta independiente?**
He optado por colocar los tests junto a los archivos que prueban (patrón
[**SUT**](https://martinfowler.com/bliki/UnitTest.html#:~:text=SUT%20is%20an%20abbreviation%20for,under%20test%20(or%20system%20under%20test).)), ya que considero que esto mejora la legibilidad y facilita el mantenimiento del código de prueba.

**¿Por qué no se utiliza Redux u otra librería de gestión de estado?**

En este proyecto, he optado por utilizar el Context API de React junto con hooks personalizados para gestionar el
estado,
ya que la aplicación es relativamente sencilla y no requiere la complejidad adicional que conlleva el uso de librerías
como Redux.

### Puntos de mejora

- [X] Crear test de los componentes y hooks de React utilizando React Testing Library.
- [X] Crear test e2e de la aplicación.
- [ ] Introducir el patrón Mother para la creación de datos de prueba.
- [ ] Mejorar la gestión de errores creando errores específicos que permitan identificar mejor los problemas de la
  aplicación.

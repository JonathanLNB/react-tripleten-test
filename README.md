<p align="center">
  <h1 align="center">Mesto React App</h1>
  <p align="center">
    Aplicación web desarrollada con React que permite gestionar perfil de usuario y tarjetas (cards), incluyendo autenticación, interacción y manejo de estado.
  </p>
</p>

---

## 🚀 Descripción

Este proyecto es una aplicación basada en React que permite a los usuarios:

- Registrarse e iniciar sesión.
- Visualizar y editar su perfil.
- Actualizar su avatar.
- Agregar nuevas tarjetas (cards).
- Dar y quitar "like" a las tarjetas.
- Eliminar tarjetas propias.
- Visualizar imágenes en un popup.
- Recibir mensajes de éxito o error mediante ventanas informativas.

Se realizaron mejoras importantes en arquitectura, manejo de estado, experiencia de usuario y calidad de código, manteniendo la funcionalidad previa del proyecto y corrigiendo errores detectados durante la revisión.

---

## 🛠️ Tecnologías utilizadas

- React
- Create React App
- JavaScript (ES6+)
- CSS
- Metodología BEM
- React Router
- Context API
- Fetch API
- GitHub Pages

---

## ⚙️ Requisitos

Se recomienda utilizar la siguiente versión de Node.js:

```bash
Node.js v16.8
```

Puedes verificar tu versión instalada con:

```bash
node -v
```

---

## 📦 Instalación

Clona el repositorio:

```bash
git clone https://github.com/JonathanLNB/react-tripleten-test.git
```

Ingresa al proyecto:

```bash
cd react-tripleten-test
```

Instala las dependencias:

```bash
npm install
```

---

## 🧪 Ejecución en desarrollo

Para correr el proyecto en modo desarrollo:

```bash
npm start
```

---

## 🏗️ Construcción para producción

Para generar una versión optimizada del proyecto:

```bash
npm run build
```

Este comando genera la carpeta `build`, lista para ser desplegada.

---

## 🌐 Despliegue

El proyecto puede publicarse en GitHub Pages.

Comando sugerido:

```bash
npm run deploy
```

> En caso de usar GitHub Pages con rutas internas, se recomienda utilizar `HashRouter` para evitar errores al refrescar rutas como `/signin` o `/signup`.

---

## 📁 Estructura general del proyecto

```txt
src/
  components/
    App.js
    Card.js
    Header.js
    Footer.js
    Main.js
    PopupWithForm.js
    ImagePopup.js
    AddPlacePopup.js
    EditAvatarPopup.js
    EditProfilePopup.js
    Register.js
    Login.js
    InfoTooltip.js
    Loader.js

  contexts/
    CurrentUserContext.js
   
  services/
    api.js
    auth.js

  utils/
    constants.js

  blocks/
  images/
  index.js
  index.css
```

---

## 🧠 Mejoras implementadas

### 🔹 Routing

Se corrigieron errores relacionados con el manejo de rutas y rutas protegidas:

- Corrección del componente `ProtectedRoute`.
- Redirección correcta de usuarios no autenticados a `/signin`.
- Redirección correcta después de iniciar sesión hacia `/`.
- Separación adecuada entre rutas públicas y rutas protegidas.
- Corrección del flujo de cierre de sesión hacia `/signin`.

---

### 🔹 Autenticación y JWT

Se realizaron ajustes en la lógica de autenticación:

- Validación del JWT al montar la aplicación.
- Eliminación del JWT al cerrar sesión.
- Corrección de inconsistencias entre `token` y `jwt`.
- Manejo de sesión persistente mediante `localStorage`.
- Limpieza del estado de autenticación en logout.

---

### 🔹 Manejo de estado

Se mejoró la gestión del estado dentro de la aplicación:

- Centralización del estado principal en `App`.
- Uso de `CurrentUserContext` para compartir información del usuario.
- Estado global para usuario, tarjetas, sesión, popups y mensajes.
- Corrección de estados iniciales con tipos más adecuados.
- Actualización local de tarjetas después de agregar, eliminar o dar like.

---

### 🔹 Context API

El proyecto utiliza `CurrentUserContext` para compartir la información del usuario entre componentes.

Esto permite que componentes como `Main` y `Card` accedan a los datos del usuario sin necesidad de pasar props innecesarias por múltiples niveles.

---

### 🔹 Popups y modales

Se mejoró el comportamiento de los popups:

- Apertura de popups desde los elementos correspondientes.
- Cierre mediante botón de cierre.
- Cierre mediante tecla `Esc`.
- Cierre al hacer click en el overlay.
- Popup de edición de perfil.
- Popup de edición de avatar.
- Popup para agregar nueva tarjeta.
- Popup de imagen.
- Popup informativo de éxito/error.
- Popup de confirmación para eliminar tarjetas.

---

### 🔹 Eliminación de tarjetas

Se agregó una confirmación antes de eliminar una tarjeta.

Flujo implementado:

1. El usuario selecciona eliminar una tarjeta.
2. Se abre un popup de confirmación.
3. Al confirmar, se ejecuta la petición a la API.
4. Se actualiza el estado local eliminando la tarjeta.
5. Se cierra el popup.

Esto evita eliminaciones accidentales y mejora la experiencia de usuario.

---
### 🔹 Formularios

Se mejoró el manejo de formularios:

- Inputs controlados.
- Validación de campos requeridos.
- Uso de tipos adecuados para los campos.
- Manejo de submit desde los componentes popup.
- Separación de lógica de negocio dentro de `App`.

---

### 🔹 Loader / estado de carga

Se agregó un loader para mostrar que la información se está cargando mientras se obtienen:

- Datos del usuario.
- Tarjetas.

Esto mejora la experiencia del usuario durante la carga inicial de la aplicación.

---

### 🔹 Mensajes de éxito y error

Se implementaron mensajes más claros de acuerdo con la acción realizada:

- Error al validar sesión.
- Error al cargar perfil y tarjetas.
- Perfil actualizado correctamente.
- Error al actualizar perfil.
- Error en login.
- Tarjeta agregada correctamente.
- Error al agregar tarjeta.
- Tarjeta eliminada correctamente.
- Error al eliminar tarjeta.
- Avatar actualizado correctamente.
- Error al actualizar avatar.
- Registro exitoso.
- Error en registro.

Los mensajes fueron centralizados en un archivo de constantes para mejorar mantenimiento y reutilización.

---

## 🧼 Clean Code

Se aplicaron prácticas de Clean Code para mejorar la legibilidad y mantenibilidad del proyecto:

- Uso de nombres más descriptivos.
- Separación de responsabilidades.
- Eliminación de código redundante.
- Reducción de lógica innecesaria dentro de componentes visuales.
- Mejor organización de archivos.
- Uso de constantes para mensajes reutilizables.
- Corrección de inconsistencias en nombres de variables y funciones.

---

## 🧱 Principios SOLID aplicados

### Single Responsibility Principle (SRP)

Se separaron responsabilidades entre:

- Componentes visuales.
- Lógica de negocio.
- Llamadas a API.
- Manejo de estado.
- Mensajes de alerta.

Por ejemplo, los popups se encargan principalmente de mostrar UI y manejar el submit, mientras que `App` contiene la lógica de actualización de datos y comunicación con API.

---

## 🔐 Variables de entorno

Se recomienda utilizar variables de entorno para evitar valores hardcodeados dentro del código.

Ejemplo:

```env
REACT_APP_API_URL=https://api.example.com
REACT_APP_API_TOKEN=your_token
```

Uso en el proyecto:

```js
process.env.REACT_APP_API_URL
```

---

## ⚠️ Consideraciones

- No almacenar secretos reales en frontend.
- Mantener actualizado el archivo `.gitignore`.
- Evitar versionar archivos como `.DS_Store`, `.idea` o `node_modules`.
- Revisar periódicamente vulnerabilidades con `npm audit`.
- Mantener dependencias actualizadas cuando sea posible.

---

## 👨‍💻 Autor

Proyecto revisado y mejorado aplicando buenas prácticas de React, Clean Code y principios SOLID.

---

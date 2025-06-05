# 📱 Gestión de Cocina - Guía de Instalación

Una Progressive Web App (PWA) para gestionar platos e ingredientes de cocina, optimizada para dispositivos móviles.

[Aplicación de Gestion de Cocina](https://josem286.github.io/GestionCocina/)

## 📋 Descripción del Proyecto

**Gestión de Cocina** es una aplicación web progresiva que permite:

- ✅ Crear y gestionar platos con sus ingredientes
- ✅ Organizar ingredientes por categorías (Pan, Hamburguesa, Extra)
- ✅ Seleccionar múltiples platos y calcular ingredientes totales
- ✅ Exportar e importar datos de platos
- ✅ Funcionar offline una vez instalada
- ✅ Instalarse como app nativa en dispositivos móviles

## 🛠️ Tecnologías Utilizadas

- **Frontend**: HTML5, CSS3, JavaScript (Vanilla)
- **PWA**: Service Worker, Web App Manifest
- **Almacenamiento**: LocalStorage del navegador
- **Servidor de desarrollo**: http-server
- **Responsive Design**: Optimizado para móviles

## 📱 Instalación para Móviles

### Opción 1: Instalación Directa desde el Navegador (Recomendada)

#### Para Android (Chrome/Edge):

1. **Abrir la aplicación web**:

   - Visita la URL donde esta alojada la aplicación: [Gestion Cocina](https://josem286.github.io/GestionCocina/)
   - O ejecuta localmente siguiendo las instrucciones de desarrollo

2. **Instalar la PWA**:

   - Aparecerá automáticamente un banner "¿Quieres instalar la aplicación?"
   - Toca el botón **"Instalar"**
   - O usa el menú del navegador: ⋮ → "Instalar aplicación" o "Añadir a pantalla de inicio"

3. **Acceso**:
   - La app aparecerá en tu pantalla de inicio como una aplicación nativa
   - Se ejecutará en modo standalone (sin barra del navegador)

#### Para iOS (Safari):

1. **Abrir en Safari**:

   - Visita la URL de la aplicación en Safari
   - **Importante**: Debe ser Safari, no Chrome u otros navegadores

2. **Añadir a pantalla de inicio**:

   - Toca el botón de compartir 📤 en la parte inferior
   - Selecciona "Añadir a pantalla de inicio"
   - Personaliza el nombre si deseas
   - Toca "Añadir"

3. **Acceso**:
   - La app aparecerá como icono en tu pantalla de inicio
   - Se ejecutará como una aplicación independiente

### Opción 2: Instalación para Desarrollo Local

#### Prerrequisitos

- **Node.js** (versión 14 o superior)
- **npm** (incluido con Node.js)
- Dispositivo móvil conectado a la misma red WiFi

#### Pasos de Instalación:

1. **Clonar o descargar el proyecto**:

   ```bash
   git clone [URL_DEL_REPOSITORIO]
   cd GestionCocina
   ```

2. **Instalar dependencias**:

   ```bash
   npm install
   ```

3. **Iniciar el servidor de desarrollo**:

   ```bash
   npm start
   ```

   El servidor se iniciará en `http://localhost:8080`

4. **Acceder desde el móvil**:

   - Encuentra la IP de tu computadora:
     - **Windows**: `ipconfig` (busca la IPv4 de tu red WiFi)
     - **Mac/Linux**: `ifconfig` o `ip addr show`
   - En tu móvil, abre el navegador y ve a: `http://[IP_DE_TU_PC]:8080`
   - Ejemplo: `http://192.168.1.100:8080`

5. **Instalar la PWA** siguiendo los pasos de la Opción 1

## 🚀 Uso de la Aplicación

### Funcionalidades Principales:

#### 1. **Crear Platos** 📝

- Accede a "Crear Platos"
- Ingresa el nombre del plato
- Añade ingredientes con sus tipos:
  - **Pan**: Tipos de pan y bases
  - **Hamburguesa**: Carnes y proteínas principales
  - **Extra**: Complementos, salsas, vegetales
- Guarda el plato

#### 2. **Lista de Platos** 📋

- Visualiza todos los platos creados
- **Editar**: Modifica platos existentes
- **Eliminar**: Borra platos (con confirmación)
- **Exportar**: Descarga tus platos en formato JSON
- **Importar**: Carga platos desde un archivo JSON

#### 3. **Seleccionar Platos** 🎯

- Organización por categorías (Pan, Hamburguesa, Extra)
- Selecciona múltiples platos
- **Calcular Ingredientes**: Obtén la lista total de ingredientes necesarios

#### 4. **Lista de Ingredientes** 📊

- Visualiza ingredientes calculados por cantidad
- Organizado por tipo
- Función "Limpiar Selección"

### Características Offline:

- ✅ **Funciona sin internet** una vez instalada
- ✅ **Datos persistentes** (se guardan en el dispositivo)
- ✅ **Actualizaciones automáticas** cuando hay conexión

## 🔧 Configuración Avanzada

### Personalización de la PWA:

#### Modificar información de la app:

Edita `manifest.json`:

```json
{
  "name": "Tu Nombre de App",
  "short_name": "TuApp",
  "description": "Tu descripción personalizada",
  "theme_color": "#tu-color-hex"
}
```

#### Cambiar iconos:

Reemplaza los archivos en la carpeta `icons/`:

- `icon-72x72.png`
- `icon-192x192.png`
- `icon-512x512.png`

#### Modificar rutas (si cambias la estructura):

Actualiza las rutas en:

- `manifest.json` (start_url, scope)
- `sw.js` (urlsToCache)

## 🐛 Solución de Problemas

### Problemas Comunes:

#### La app no se instala en móvil:

- ✅ Verifica que uses HTTPS o localhost
- ✅ Confirma que todos los archivos del manifest estén accesibles
- ✅ En iOS, usa Safari exclusivamente

#### Los datos se pierden:

- ✅ Los datos se guardan en LocalStorage del navegador
- ✅ No borres los datos del navegador/app
- ✅ Usa la función de exportar para respaldos

#### La app no funciona offline:

- ✅ Verifica que el Service Worker esté registrado
- ✅ Abre las herramientas de desarrollador y revisa la consola
- ✅ Asegúrate de haber visitado todas las páginas al menos una vez online

#### Problemas de red en desarrollo:

- ✅ Verifica que el móvil esté en la misma red WiFi
- ✅ Desactiva firewall temporalmente si es necesario
- ✅ Usa la IP correcta de tu computadora

### Comandos Útiles:

```bash
# Verificar que el servidor esté corriendo
npm start

# Reinstalar dependencias si hay problemas
rm -rf node_modules
npm install

# Verificar la IP de tu computadora
# Windows:
ipconfig
# Mac/Linux:
ifconfig
```

## 📞 Soporte

Si encuentras problemas:

1. Revisa la consola del navegador (F12 → Console)
2. Verifica que todos los archivos estén presentes
3. Confirma que el Service Worker esté activo (F12 → Application → Service Workers)

## 🔄 Actualizaciones

La PWA se actualiza automáticamente cuando:

- Hay cambios en el código
- El usuario visita la app con conexión a internet
- El Service Worker detecta una nueva versión

## 🌐 Despliegue en Producción

### Opciones de Hosting Gratuito:

#### 1. **GitHub Pages**:

```bash
# Subir a GitHub
git add .
git commit -m "Initial commit"
git push origin main

# Activar GitHub Pages en Settings → Pages
# Seleccionar source: Deploy from a branch → main
```

#### 2. **Netlify**:

- Arrastra la carpeta del proyecto a [netlify.com](https://netlify.com)
- O conecta tu repositorio de GitHub
- Se desplegará automáticamente

#### 3. **Vercel**:

```bash
# Instalar Vercel CLI
npm i -g vercel

# Desplegar
vercel
```

#### 4. **Firebase Hosting**:

```bash
# Instalar Firebase CLI
npm install -g firebase-tools

# Inicializar proyecto
firebase init hosting

# Desplegar
firebase deploy
```

### Configuración para HTTPS:

- **Importante**: Las PWAs requieren HTTPS para funcionar completamente
- Todos los servicios mencionados proporcionan HTTPS automáticamente
- Para desarrollo local, usa `localhost` (considerado seguro)

## 📊 Estructura del Proyecto

```
GestionCocina/
├── 📄 index.html              # Página principal
├── 📄 CrearObjetos.html       # Crear nuevos platos
├── 📄 ListarPlatos.html       # Lista y gestión de platos
├── 📄 SeleccionarPlatos.html  # Selección de platos
├── 📄 ListarObjetos.html      # Lista de ingredientes
├── 📄 EditarPlato.html        # Edición de platos
├── 📄 estilos.css             # Estilos CSS responsivos
├── 📄 manifest.json           # Configuración PWA
├── 📄 sw.js                   # Service Worker
├── 📄 package.json            # Dependencias Node.js
├── 📁 js/                     # Scripts JavaScript
│   ├── storage.js             # Gestión de datos
│   ├── form.js                # Formularios
│   ├── list.js                # Listas de ingredientes
│   ├── listPlatos.js          # Lista de platos
│   ├── seleccionPlatos.js     # Selección de platos
│   └── editDish.js            # Edición de platos
└── 📁 icons/                  # Iconos de la PWA
    ├── icon-72x72.png
    ├── icon-192x192.png
    └── icon-512x512.png
```

## 🔍 Características Técnicas

### PWA Features:

- ✅ **Service Worker**: Cache offline y actualizaciones
- ✅ **Web App Manifest**: Instalación como app nativa
- ✅ **Responsive Design**: Optimizado para todos los tamaños de pantalla
- ✅ **Touch-friendly**: Botones y controles adaptados para móviles
- ✅ **Fast Loading**: Recursos cacheados para carga rápida

### Almacenamiento de Datos:

- **LocalStorage**: Persistencia local de datos
- **Exportar/Importar**: Backup y sincronización manual
- **Sin servidor**: No requiere base de datos externa

### Compatibilidad:

- ✅ **Android**: Chrome, Edge, Firefox, Samsung Internet
- ✅ **iOS**: Safari (para instalación), Chrome (para uso)
- ✅ **Desktop**: Todos los navegadores modernos
- ✅ **Offline**: Funciona completamente sin conexión

## 🎯 Casos de Uso

### Para Restaurantes:

- Gestión de menú y ingredientes
- Cálculo de compras por cantidad de platos
- Organización por categorías de ingredientes

### Para Cocina Doméstica:

- Planificación de comidas
- Lista de compras automática
- Gestión de recetas familiares

### Para Catering:

- Cálculo de ingredientes para eventos
- Gestión de múltiples platos simultáneos
- Exportación de listas para proveedores

## 🚀 Mejoras a estudiar

### Funcionalidades Adicionales:

- 🔄 Sincronización en la nube
- 📸 Fotos de platos
- 🏷️ Etiquetas y categorías personalizadas
- 📊 Estadísticas de uso
- 🔍 Búsqueda avanzada
- 👥 Compartir platos entre usuarios

### Mejoras Técnicas:

- 🗄️ Base de datos offline (IndexedDB)
- 🔔 Notificaciones push
- 📱 Integración con APIs de supermercados
- 🌍 Soporte multiidioma
- 🎨 Temas personalizables

---

## 📝 Licencia

Este proyecto está bajo la Licencia MIT. Puedes usarlo, modificarlo y distribuirlo libremente.

## 🤝 Contribuciones

¡Las contribuciones son bienvenidas! Si tienes ideas para mejorar la aplicación:

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

---

¡Disfruta gestionando tu cocina de manera eficiente! 👨‍🍳👩‍🍳

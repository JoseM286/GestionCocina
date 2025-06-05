# 📱 Guía Rápida de Instalación Móvil

## 🚀 Instalación Inmediata (Sin Programación)

### Para Android:

1. **Abrir Chrome o Edge**
2. **Ir a la URL de la aplicación**
3. **Buscar el banner de instalación** que aparece automáticamente
4. **Tocar "Instalar"** o usar el menú ⋮ → "Instalar aplicación"
5. **¡Listo!** La app aparecerá en tu pantalla de inicio

### Para iPhone/iPad:

1. **Abrir Safari** (importante: debe ser Safari)
2. **Ir a la URL de la aplicación**
3. **Tocar el botón compartir** 📤 (parte inferior de la pantalla)
4. **Seleccionar "Añadir a pantalla de inicio"**
5. **Personalizar el nombre** si deseas
6. **Tocar "Añadir"**
7. **¡Listo!** La app aparecerá como icono en tu pantalla de inicio

## 🏠 Instalación Local (Para Desarrolladores)

### Paso 1: Preparar tu Computadora

```bash
# 1. Instalar Node.js desde https://nodejs.org
# 2. Abrir terminal/cmd y navegar a la carpeta del proyecto
cd GestionCocina

# 3. Instalar dependencias
npm install

# 4. Iniciar servidor
npm start
```

### Paso 2: Conectar tu Móvil

1. **Encontrar la IP de tu computadora:**
   - **Windows**: Abrir cmd → escribir `ipconfig`
   - **Mac**: Abrir terminal → escribir `ifconfig`
   - **Linux**: Abrir terminal → escribir `ip addr show`
   - Buscar algo como: `192.168.1.XXX`

2. **En tu móvil:**
   - Conectar a la misma WiFi que tu computadora
   - Abrir navegador
   - Ir a: `http://192.168.1.XXX:8080` (reemplazar XXX con tu IP)

3. **Instalar la PWA** siguiendo los pasos de arriba

## 🔧 Solución Rápida de Problemas

### ❌ "No aparece el banner de instalación"
- ✅ Verifica que uses HTTPS o localhost
- ✅ En iPhone, usa Safari exclusivamente
- ✅ Refresca la página

### ❌ "No puedo acceder desde el móvil"
- ✅ Verifica que ambos dispositivos estén en la misma WiFi
- ✅ Desactiva temporalmente el firewall de tu PC
- ✅ Usa la IP correcta (no 127.0.0.1 o localhost)

### ❌ "La app no funciona offline"
- ✅ Visita todas las páginas al menos una vez con internet
- ✅ Verifica que el Service Worker esté activo

## 🌐 URLs de Ejemplo

Si ya tienes la app desplegada, puedes usar estas URLs directamente:

- **GitHub Pages**: `https://tuusuario.github.io/GestionCocina/`
- **Netlify**: `https://tu-app-name.netlify.app/`
- **Vercel**: `https://gestion-cocina.vercel.app/`

## 📞 ¿Necesitas Ayuda?

1. **Revisa la consola del navegador**: F12 → Console (en PC)
2. **Verifica los archivos**: Asegúrate de que todos los archivos estén presentes
3. **Prueba en modo incógnito**: Para descartar problemas de cache

## ✨ Características una vez Instalada

- 🚀 **Carga instantánea** (sin esperar al navegador)
- 📱 **Icono en pantalla de inicio** como app nativa
- 🔒 **Funciona sin internet** una vez cacheada
- 🎯 **Pantalla completa** (sin barra del navegador)
- 🔄 **Actualizaciones automáticas** cuando hay conexión

---

¡En menos de 5 minutos tendrás tu app de gestión de cocina funcionando en tu móvil! 🍳

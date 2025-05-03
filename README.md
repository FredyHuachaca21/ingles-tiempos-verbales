# Mapas Mentales de Tiempos Verbales en Inglés

Aplicación interactiva para visualizar los diferentes tiempos verbales en inglés usando mapas mentales. Permite explorar verbos regulares e irregulares en presente, pasado y futuro mediante visualizaciones jerárquicas.

<!-- Cuando tengas una captura de pantalla, descomentar esta línea y agregar la imagen a la raíz del proyecto:
![Captura de pantalla](screenshot.png)
-->

## 🌟 Características

- Visualización de mapas mentales para tiempos verbales en inglés
- Selección entre verbos regulares e irregulares
- Navegación entre tiempos presente, pasado y futuro
- Interfaz de usuario intuitiva y minimalista
- Diseño responsivo para diferentes dispositivos

## 🚀 Demo

Puedes ver la aplicación en acción en: [https://fredyhuachaca21.github.io/ingles-tiempos-verbales](https://fredyhuachaca21.github.io/ingles-tiempos-verbales)

## 🔧 Tecnologías

- React 19
- TypeScript
- Markmap (para generar mapas mentales desde Markdown)
- Vite (para build y desarrollo)
- CSS moderno (variables, flexbox)
- GitHub Pages (para hosting)
- GitHub Actions (para CI/CD)

## 📋 Requisitos previos

- Node.js 18 o superior
- npm o yarn

## 🛠️ Instalación

1. Clona este repositorio:
   ```bash
   git clone https://github.com/fredyhuachaca21/ingles-tiempos-verbales.git
   cd ingles-tiempos-verbales
   ```

2. Instala las dependencias:
   ```bash
   npm install
   ```

3. Inicia el servidor de desarrollo:
   ```bash
   npm run dev
   ```

4. Abre tu navegador en `http://localhost:5173`

## 📦 Construcción para producción

```bash
npm run build
```

Los archivos de salida se encontrarán en el directorio `dist/`.

## 🚢 Despliegue

Este proyecto está configurado para ser desplegado en GitHub Pages automáticamente usando GitHub Actions. El workflow ya está configurado en `.github/workflows/deploy.yml`.

### Configuración de GitHub Pages:

1. Ve a la configuración del repositorio (Settings)
2. Navega a Pages
3. Asegúrate de que la fuente (Source) esté configurada como "GitHub Actions"

Cada vez que hagas push a la rama `main`, GitHub Actions construirá y desplegará automáticamente tu aplicación.

### Despliegue manual:

También puedes desplegar manualmente utilizando el paquete gh-pages:

```bash
npm run deploy
```

Este comando construirá la aplicación y la publicará en la rama gh-pages de tu repositorio.

## 📁 Estructura del proyecto

```
/
├── .github/workflows/    # Configuraciones de GitHub Actions
├── public/               # Archivos estáticos
│   └── data/             # Archivos Markdown con datos de tiempos verbales
│       ├── regular/      # Verbos regulares
│       └── irregular/    # Verbos irregulares
├── src/                  # Código fuente
│   ├── components/       # Componentes React
│   ├── services/         # Servicios (carga de datos)
│   ├── App.tsx           # Componente principal
│   └── main.tsx          # Punto de entrada
└── vite.config.ts        # Configuración de Vite
```

## 🧩 Personalización

### Agregar nuevos mapas mentales:

1. Añade archivos Markdown en `public/data/regular/` o `public/data/irregular/`
2. Actualiza `src/services/markdownService.ts` para incluir los nuevos archivos

### Modificar estilos:

Los estilos principales se encuentran en `src/components/Markmap.css`.

## 📄 Licencia

MIT

## 👥 Contribuciones

Las contribuciones son bienvenidas. Por favor, abre un issue o PR para sugerencias o mejoras.

---

⭐ Si te resulta útil este proyecto, ¡no dudes en darle una estrella en GitHub!

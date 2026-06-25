# PsicoAlma

PsicoAlma es una pagina web de apoyo psicologico para personas con enfermedades catastroficas, sus familias y cuidadores.

El proyecto esta construido como una aplicacion frontend desplegable en Vercel, sin backend. La seccion de comentarios usa `localStorage` como una mini base de datos local para pruebas y prototipado.

## Tecnologias

- React
- Vite
- Tailwind CSS
- CSS modular por pagina
- Lucide React para iconos
- localStorage para comentarios locales

## Requisitos

- Node.js
- npm

## Instalacion

```bash
npm install
```

## Desarrollo

```bash
npm run dev
```

Luego abre:

```text
http://127.0.0.1:5173/
```

## Compilar para produccion

```bash
npm run build
```

## Vista previa de produccion

```bash
npm run preview
```

## Estructura principal

```text
src/
  components/
    Header/
    Footer/
  data/
    siteData.js
  pages/
    HomePage/
    CarePage/
    ResourcesPage/
    CommunityPage/
    README.md
  routes/
    pageRegistry.js
  App.jsx
  App.css
  index.css
  main.jsx
```

## Paginas actuales

- Inicio: pagina principal con hero, llamada a la accion y resumen de cuidados.
- Cuidados: evaluacion, diagnostico, tratamiento, prevencion y promocion.
- Recursos: biblioteca de apoyo para pacientes, familias y cuidadores.
- Comunidad: comentarios guardados localmente en el navegador.

## Como agregar una nueva pestaña

1. Crear una carpeta dentro de `src/pages`.

```text
src/pages/NuevaPage/
  NuevaPage.jsx
  NuevaPage.css
```

2. Importar la nueva pagina en `src/routes/pageRegistry.js`.

3. Registrar el componente en `pageRegistry`.

4. Agregar el enlace en `src/data/siteData.js`, dentro de `navigation`.

## Despliegue en Vercel

Configuracion recomendada:

```text
Framework Preset: Vite
Build Command: npm run build
Output Directory: dist
Install Command: npm install
```

## Nota sobre comentarios

Actualmente los comentarios se guardan solo en el navegador del usuario usando `localStorage`. Si se necesitan comentarios reales compartidos entre usuarios, se recomienda integrar una solucion como Supabase o Firebase.

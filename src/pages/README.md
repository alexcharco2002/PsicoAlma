# Pages

Cada pestaña vive en su propia carpeta para que el proyecto pueda crecer sin mezclar estilos ni lógica.

Pestañas actuales:

- `HomePage`: bienvenida.
- `ServicesPage`: servicios de apoyo psicológico.
- `EvaluationPage`: evaluación emocional inicial.
- `PreventionPage`: prevención psicológica y consejos de autocuidado.
- `TreatmentPage`: tratamientos psicológicos comunes.
- `DiseasesPage`: enfermedades catastróficas.
- `ContactPage`: contacto general y especialistas.

Estructura recomendada para un nuevo módulo:

```text
src/pages/NuevaPage/
  NuevaPage.jsx
  NuevaPage.css
```

Para registrar una pestaña nueva:

1. Crear la carpeta y sus archivos en `src/pages`.
2. Importar la página en `src/routes/pageRegistry.js`.
3. Agregar el id y componente en `pageRegistry`.
4. Agregar el item visible en `src/data/siteData.js`, dentro de `navigation`.

Reglas de estilo:

- Cada página importa solo su propio CSS.
- Los estilos compartidos viven en `src/App.css` o `src/index.css`.
- Evitar usar clases de otra página dentro de un módulo nuevo.
- Mantener los breakpoints móviles dentro del CSS de la página correspondiente.

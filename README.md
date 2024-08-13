# Generador de Contraseñas Seguro

Este proyecto es un **Generador de Contraseñas Seguro** desarrollado con **React** y **TypeScript**. Su objetivo es proporcionar una herramienta versátil y eficaz para generar contraseñas robustas y personalizadas, adecuadas para diferentes necesidades de seguridad.

## Características

- **Generación de Contraseñas Aleatorias**:
  - Personalización de la longitud de la contraseña.
  - Inclusión o exclusión de caracteres especiales.
  - Opción para evitar caracteres ambiguos como `0`, `O`, `1`, y `l`.

- **Generación de Contraseñas Basadas en Frases**:
  - Transforma una palabra o frase en una contraseña segura mediante:
    - Substitución de caracteres comunes (ej. 'a' → '@').
    - Alternancia aleatoria entre mayúsculas y minúsculas.
    - Inserción de caracteres especiales en posiciones aleatorias.
    - Inversión parcial o total de la frase.

- **Evaluación de la Seguridad de la Contraseña**:
  - Clasificación automática de la contraseña generada como `Débil`, `Media` o `Fuerte`.

- **Interfaz de Usuario Intuitiva**:
  - Diseñada con **Tailwind CSS** y **Bootstrap 5** para un aspecto moderno y responsivo.
  - Interfaz amigable con opciones claras para la personalización de la contraseña.

## Tecnologías Utilizadas

- **React.js**: Para la construcción de la interfaz de usuario.
- **TypeScript**: Para asegurar un código tipado y más robusto.
- **Vite**: Para un entorno de desarrollo rápido y moderno.
- **Tailwind CSS y Bootstrap 5**: Para el diseño y la estructura visual.
- **Jest**: Para pruebas unitarias que aseguran la calidad del código.

## Instalación

Sigue estos pasos para clonar y ejecutar el proyecto localmente:

1. **Clona el repositorio**:
   ```bash
   git clone https://github.com/ebweb-lab/password-generator-eb.git
   cd password-generator-eb
   
2. **Instala las dependencias**:
   ```bash
   npm install

3. **Inicia el servidor de desarrollo**:
   ```bash
   npm run dev

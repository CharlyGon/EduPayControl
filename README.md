# Control of Payments (Education)

Control of payments (Education) es una solución de escritorio multiplataforma diseñada para facilitar la gestión y seguimiento de los pagos de las cuotas de los alumnos en instituciones educativas. Permite a los administradores escolares registrar, monitorear y reportar pagos de cuotas de manera eficiente, asegurando una gestión financiera efectiva y transparente dentro del colegio.

## Características Principales

- Registro y gestión de alumnos.
- Seguimiento de pagos de cuotas (transacciones bancarias, efectivo).
- Gestión de perfiles de alumnos con datos personales y estado de cuotas.
- Informes de pagos y adeudos.
- Interfaz intuitiva y fácil de usar.

## Tecnologías Utilizadas

- **Electron**: Para el desarrollo de la aplicación de escritorio multiplataforma, utilizando tecnologías web como HTML, CSS y JavaScript.
- **TypeScript**: Como lenguaje de programación principal, ofreciendo un desarrollo más robusto y seguro con tipado estático.
- **SQLite**: Para la gestión de bases de datos local, permitiendo una fácil configuración y mantenimiento de los datos sin necesidad de infraestructura adicional.
- **Node.js**: Como entorno de ejecución para JavaScript en el lado del servidor, facilitando la interacción con la base de datos y la lógica de la aplicación.
- **HTML/CSS**: Para la creación de interfaces de usuario atractivas y responsivas.

## Estructura del Proyecto
```
EduPayControl/
├── src/
│   ├── main/
│   │   ├── main.ts          # Punto de entrada principal de Electron (manejo de ventanas, sesión, etc.)
│   │   └── preload.ts       # Script de precarga para comunicarse de forma segura entre el frontend y el backend
│   ├── renderer/
│   │   ├── home/
│   │   │   ├── index.html   # HTML para la página inicial
│   │   │   └── home.ts      # Lógica específica de la página inicial
│   │   ├── payment/
│   │   │   ├── index.html   # HTML para la página de pagos
│   │   │   └── payment.ts   # Lógica específica de la página de pagos
│   │   └── styles/          # Carpeta para CSS
│   │       └── main.css     # Estilos generales
│   ├── db/
│   │   └── database.ts      # Lógica de acceso a datos SQLite
│   └── assets/              # Imágenes, íconos y otros recursos estáticos
├── node_modules/
│   └── ...
├── package.json
├── tsconfig.json
└── .gitignore
```

## Desarrollo

Para iniciar el desarrollo:

1. Clona el repositorio:
```bash
git clone https://github.com/tu-usuario/EduPayControl.git
```

2. Instala las dependencias:
```bash
cd EduPayControl
npm install
```

3. Ejecuta la aplicación:
```bash
npm start
```

## Contribuir

Si deseas contribuir al proyecto, por favor lee el archivo CONTRIBUTING.md para más información sobre cómo hacerlo.
```

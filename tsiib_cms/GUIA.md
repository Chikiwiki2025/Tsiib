# Ts'íib · Cómo activar y usar el panel editorial

El sitio ahora tiene un panel en **tu-sitio.netlify.app/admin**. Ahí las maestras y los maestros llenan
título, autor, sección, fecha, imagen opcional y texto, y presionan **Publicar**. En uno o dos minutos
el texto aparece en el sitio, con el diseño de Ts'íib.

Para que funcione, el sitio tiene que vivir en GitHub (un "cajón" gratuito donde se guardan los archivos)
y Netlify lo publica desde ahí. Se configura **una sola vez** (unos 20 minutos).

---

## Parte 1 · Configuración (solo una vez, la hace Jimena)

### 1. Cuenta de GitHub del laboratorio
1. Entra a **github.com** → *Sign up*. Te recomiendo una cuenta compartida, p. ej. `tsiib-editorial`,
   con un correo del laboratorio. Esta será la "llave" que usarán los dos maestros.

### 2. Subir el sitio a GitHub
1. Ya con sesión iniciada: botón **+** (arriba a la derecha) → **New repository**.
2. Nombre: `tsiib`. Puede ser **Private**. Presiona **Create repository**.
3. En la página que aparece, haz clic en **uploading an existing file**.
4. Descomprime `tsiib_cms.zip` en tu computadora y **arrastra todo el contenido** de la carpeta
   (archivos y carpetas `admin`, `content`, `images`) a la ventana. Presiona **Commit changes**.

### 3. Escribir el nombre del repositorio en el panel
1. En GitHub abre `admin` → `config.yml` → ícono de lápiz ✎.
2. Cambia la línea `repo: TU-USUARIO/tsiib` por tu usuario real, p. ej. `repo: tsiib-editorial/tsiib`.
3. **Commit changes**.

### 4. Conectar Netlify con GitHub
- **Si quieres conservar la dirección que ya tienes:** en Netlify abre tu sitio →
  **Site configuration → Build & deploy → Link repository** → GitHub → elige `tsiib`.
- **O sitio nuevo:** **Add new project → Import an existing project → GitHub** → elige `tsiib`.

No cambies nada en la configuración de build: Netlify la lee sola del archivo `netlify.toml`.
Presiona **Deploy**. Cuando termine, el sitio se verá igual que antes.

### 5. Activar el inicio de sesión del panel
1. En GitHub: foto de perfil → **Settings → Developer settings → OAuth Apps → New OAuth App**.
   - *Application name:* `Ts'íib panel`
   - *Homepage URL:* la dirección de tu sitio (p. ej. `https://tsiib.netlify.app`)
   - *Authorization callback URL:* `https://api.netlify.com/auth/done`
   - **Register application**. Copia el **Client ID** y presiona **Generate a new client secret**; copia el secreto.
2. En Netlify: tu sitio → **Site configuration → Access & security → OAuth → Install provider** →
   **GitHub** → pega Client ID y Secret → **Install**.

Listo. Entra a `tu-sitio.netlify.app/admin` → **Iniciar sesión con GitHub**.

### 6. Acceso para los dos maestros
- **Lo más sencillo:** les compartes el usuario y contraseña de la cuenta `tsiib-editorial`.
- **Si prefieren su propia cuenta:** en GitHub, repositorio `tsiib` → **Settings → Collaborators →
  Add people** e invitas a cada uno. Ellos aceptan la invitación por correo.

---

## Parte 2 · Publicar un texto (para los maestros)

1. Entra a **tu-sitio.netlify.app/admin** y presiona **Iniciar sesión con GitHub**
   (el navegador lo recuerda; normalmente solo se hace la primera vez).
2. Presiona **+ Texto**.
3. Llena: **Título · Autor o autora · Sección · Fecha**. Si quieres, sube una **Imagen** y escribe un **Pie de imagen**.
4. En **Texto**, pega el trabajo desde Word o Google Docs. A la derecha ves cómo quedará en el sitio.
   - Botón **"** = cita destacada (la línea roja).
   - Botón **H** = subtítulo.
5. Presiona **Publicar → Publicar ahora**. En 1 o 2 minutos aparece en el sitio.

**Guardar sin publicar:** apaga **Publicar en el sitio** antes de presionar Publicar. Queda guardado en el panel pero no aparece en el sitio.

**Corregir o borrar:** abre el texto en el panel, edítalo y vuelve a publicar; para borrarlo, menú
de **Publicar → Eliminar entrada**.

**Importante:** escribe el nombre de cada autora siempre igual (mismos acentos), porque el sitio agrupa
los textos por autor.

---

## Antes de abrir el sitio al público
- Borra desde el panel los **8 textos de ejemplo** (Carlos Hurtado, Valeria Reyes, etc.).
- El formulario **Proponer texto** todavía no envía nada: falta conectarlo a Formspree.

## Qué hay en la carpeta (por si alguien técnico lo revisa)
| Archivo | Para qué |
|---|---|
| `index.html` | El sitio. Lee la lista de textos de `articulos.json`. |
| `admin/` | El panel (Decap CMS 3.17.1): `config.yml` define los campos, `preview.css` la vista previa. |
| `content/articulos/*.md` | Un archivo por texto. Los crea el panel. |
| `images/uploads/` | Imágenes subidas desde el panel. |
| `build.js` | Netlify lo ejecuta en cada publicación y genera `articulos.json`. |
| `netlify.toml`, `package.json` | Configuración del build. |

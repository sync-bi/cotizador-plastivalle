# 📘 Manual de Usuario - Sistema de Cotizaciones Plastivalle

## Tabla de Contenidos
1. [Acceso al Sistema](#acceso-al-sistema)
2. [Usuarios y Contraseñas](#usuarios-y-contraseñas)
3. [Roles y Permisos](#roles-y-permisos)
4. [Funcionalidades por Rol](#funcionalidades-por-rol)
5. [Gestión de Cotizaciones](#gestión-de-cotizaciones)
6. [Gestión de Clientes](#gestión-de-clientes)
7. [Gestión de Productos](#gestión-de-productos)
8. [Generar y Enviar PDFs](#generar-y-enviar-pdfs)
9. [Preguntas Frecuentes](#preguntas-frecuentes)

---

## 🔐 Acceso al Sistema

### URL de Acceso
- **Desarrollo Local**: http://localhost:3000
- **Producción**: [URL de tu servidor Vercel]

### Pantalla de Login
Al acceder al sistema, verás una pantalla de login con:
- Logo de Plastivalle
- Campo de correo electrónico
- Campo de contraseña
- Botón "Iniciar Sesión"

---

## 👥 Usuarios y Contraseñas

### Contraseña Universal
**Todos los usuarios tienen la misma contraseña**: `plastivalle2025`

### Lista de Usuarios

| # | Nombre | Email | Cargo | Teléfono | Rol |
|---|--------|-------|-------|----------|-----|
| 1 | **Oscar Carrillo** | administracion@plastivalle.com | Administración | 3143607707 | **ADMIN** |
| 2 | Clemencia Basto | ventas2@plastivalle.com | Ventas 2 | 3134612909 | Vendedor |
| 3 | Mary Luz Hernandez | ventas3@plastivalle.com | Ventas 3 | 3104800912 | Vendedor |
| 4 | Angie Ramirez | ventas@plastivalle.com | Punto de Venta | 3208425008 | Vendedor |
| 5 | Juan Guillermo Ossa | losenvases@gmail.com | Free Lance | 3102131493 | Vendedor |
| 6 | Carlos Ossa | gerencia@plastivalle.com | Ventas Gerenciales | 3107861932 | Vendedor |
| 7 | Juan Manuel Cardozo | ventas4.plastivalle@gmail.com | Ventas 4 | 3126384818 | Vendedor |
| 8 | Jessica Sanchez | tesoreria@plastivalle.com | Tesorería | 3193211387 | Vendedor |

---

## 🎭 Roles y Permisos

### 👑 ADMINISTRADOR (Oscar Carrillo - administracion@plastivalle.com)

**Permisos Completos:**
- ✅ Ver TODAS las cotizaciones de todos los vendedores
- ✅ Crear, editar y eliminar cotizaciones
- ✅ Crear, editar y eliminar clientes
- ✅ Crear, editar y eliminar productos
- ✅ Generar PDFs de cualquier cotización
- ✅ Enviar cotizaciones por email
- ✅ Acceso total al sistema

**Características Especiales:**
- Único usuario con acceso a la gestión de clientes y productos
- Puede ver el trabajo de todos los vendedores
- Puede modificar o eliminar cualquier cotización

---

### 👤 VENDEDOR (Todos los demás usuarios)

**Permisos Limitados:**
- ✅ Ver solo SUS PROPIAS cotizaciones
- ✅ Crear nuevas cotizaciones
- ✅ Editar y eliminar sus propias cotizaciones
- ✅ Generar PDFs de sus cotizaciones
- ✅ Enviar sus cotizaciones por email
- ✅ Ver listado completo de clientes (solo lectura)
- ✅ Ver listado completo de productos (solo lectura)
- ❌ NO pueden crear, editar o eliminar clientes
- ❌ NO pueden crear, editar o eliminar productos
- ❌ NO pueden ver cotizaciones de otros vendedores

**Características Especiales:**
- Cada cotización creada queda registrada con el email del vendedor
- Los PDFs generados muestran automáticamente el nombre, cargo y teléfono del vendedor
- Solo pueden gestionar sus propias cotizaciones

---

## 📋 Funcionalidades por Rol

### Panel de Navegación

Al iniciar sesión, verás en la parte superior:
- **Barra naranja**: Logo de Plastivalle + Nombre del sistema
- **Buscador**: Para buscar en cualquier listado
- **Datos del usuario**: Tu nombre y cargo
- **Botón de salida**: Para cerrar sesión

### Pestañas Disponibles

#### Para TODOS los usuarios:
1. **Cotizaciones**: Gestionar cotizaciones
2. **Clientes**: Ver listado de clientes
3. **Productos**: Ver listado de productos

#### Diferencias según rol:

**VENDEDOR ve:**
- Pestaña Cotizaciones: Solo sus propias cotizaciones + botón "Nueva Cotización"
- Pestaña Clientes: Lista completa (sin botones de acción)
- Pestaña Productos: Lista completa (sin botones de acción)

**ADMINISTRADOR ve:**
- Pestaña Cotizaciones: TODAS las cotizaciones + botón "Nueva Cotización"
- Pestaña Clientes: Lista completa + botón "Nuevo Cliente" + botones editar/eliminar
- Pestaña Productos: Lista completa + botón "Nuevo Producto" + botones editar/eliminar

---

## 📝 Gestión de Cotizaciones

### Crear una Nueva Cotización

1. **Clic en "Nueva Cotización"** (botón verde con símbolo +)
2. **Llenar el formulario:**
   - **Cliente**: Seleccionar de la lista desplegable
   - **Fecha**: Se completa automáticamente (puedes cambiarla)
   - **Validez**: Días de validez (por defecto 30)
   - **Productos**: Agregar productos a la cotización

3. **Agregar Productos:**
   - Buscar producto por nombre o ID
   - Filtrar por proceso (Inyectado/Soplado)
   - Seleccionar producto
   - Indicar cantidad
   - Agregar descripción personalizada (opcional)
   - Clic en "Agregar"

4. **Configurar Términos Comerciales:**
   - Forma de pago
   - Tiempo de despacho
   - Transporte
   - Observaciones

5. **Revisar Totales:**
   - Subtotal
   - IVA (19%)
   - Total

6. **Guardar**: Clic en "Guardar Cotización"

### Ver Cotizaciones

**Columnas visibles:**
- Número de cotización
- Cliente
- Fecha
- Estado (Borrador/Enviada/Aprobada/Rechazada)
- Total
- Acciones

**Filtros disponibles:**
- Búsqueda general por cualquier campo
- Los vendedores solo ven sus propias cotizaciones
- El admin ve todas las cotizaciones

### Editar una Cotización

1. Clic en el botón de **lápiz** (editar) en la fila de la cotización
2. Modificar los campos necesarios
3. Clic en "Guardar Cotización"

**Nota**: Solo puedes editar tus propias cotizaciones (o todas si eres admin)

### Eliminar una Cotización

1. Clic en el botón de **papelera** (eliminar) en la fila
2. Confirmar la eliminación
3. La cotización se elimina permanentemente

**Advertencia**: Esta acción no se puede deshacer

### Estados de Cotización

- **Borrador**: Cotización en proceso
- **Enviada**: Cotización enviada al cliente
- **Aprobada**: Cliente aceptó la cotización
- **Rechazada**: Cliente rechazó la cotización

---

## 👥 Gestión de Clientes

### Ver Clientes (Todos los usuarios)

**Información visible:**
- Nombre del cliente
- Email
- Teléfono
- Empresa

**Funcionalidades:**
- Búsqueda por cualquier campo
- Ordenamiento por columnas
- Ver todos los clientes registrados

### Crear Cliente (Solo ADMIN)

1. Clic en "Nuevo Cliente"
2. Llenar formulario:
   - Nombre completo
   - Email
   - Teléfono
   - Empresa
   - Dirección
   - Ciudad
   - NIT
3. Clic en "Guardar"

### Editar/Eliminar Cliente (Solo ADMIN)

- **Editar**: Clic en botón de lápiz
- **Eliminar**: Clic en botón de papelera

---

## 📦 Gestión de Productos

### Ver Productos (Todos los usuarios)

**Información visible:**
- Imagen del producto
- ID del producto
- Nombre
- Categoría (Inyectados/Soplados)
- Proceso
- Material
- Peso
- Precio

**Funcionalidades:**
- Búsqueda por nombre o ID
- Ordenamiento por cualquier columna
- Ver imagen del producto

### Crear Producto (Solo ADMIN)

1. Clic en "Nuevo Producto"
2. Llenar formulario:
   - ID del producto
   - Nombre
   - Categoría
   - Proceso
   - Material
   - Peso (gramos)
   - Precio
   - Descripción
3. Clic en "Guardar"

### Editar/Eliminar Producto (Solo ADMIN)

- **Editar**: Clic en botón de lápiz
- **Eliminar**: Clic en botón de papelera

---

## 📄 Generar y Enviar PDFs

### Generar PDF de Cotización

1. En la lista de cotizaciones, busca la cotización deseada
2. Clic en el botón de **descarga** (⬇️)
3. Se abre una ventana de impresión con el PDF
4. Opciones:
   - Imprimir directamente
   - Guardar como PDF
   - Cancelar

### Contenido del PDF

El PDF incluye:
- **Encabezado**: Logo y datos de Plastivalle
- **Información del cliente**:
  - Nombre
  - Empresa
  - Email
  - Teléfono
- **Detalles de la cotización**:
  - Número de cotización
  - Fecha
  - Productos con imágenes y descripciones
  - Cantidades y precios
  - Subtotal, IVA y Total
- **Condiciones comerciales**:
  - Forma de pago
  - Tiempo de despacho
  - Transporte
  - Validez
  - Observaciones
- **Firma personalizada**:
  - Nombre del vendedor que creó la cotización
  - Cargo
  - Teléfono
  - Email

### Enviar Cotización por Email

1. En la lista de cotizaciones, busca la cotización deseada
2. Clic en el botón de **email** (✉️)
3. El sistema:
   - Genera automáticamente el PDF
   - Descarga el PDF en tu computador
   - Abre Gmail web con un correo preparado
4. En Gmail:
   - El destinatario ya está lleno (email del cliente)
   - El asunto está preparado
   - El cuerpo del email está redactado
   - **IMPORTANTE**: Adjunta manualmente el PDF descargado
5. Agrega cualquier comentario adicional
6. Clic en "Enviar"

**Nota**: Si el cliente no tiene email registrado, el sistema abre Gmail para que ingreses el destinatario manualmente.

---

## 🎨 Características Visuales

### Colores de Plastivalle

El sistema usa los colores corporativos:
- **Naranja Principal**: #ED5108
- **Naranja Secundario**: #C96A3B
- **Gris Oscuro**: #9C9B9B
- **Gris Claro**: #D0CCC9
- **Blanco**: #FCFCFB

### Badges de Estado

- **Borrador**: Gris
- **Enviada**: Azul
- **Aprobada**: Verde
- **Rechazada**: Rojo

---

## ❓ Preguntas Frecuentes

### ¿Cómo recupero mi contraseña?

Contacta al administrador (Oscar Carrillo - administracion@plastivalle.com) para que restablezca tu contraseña.

### ¿Por qué no veo los botones de editar/eliminar en clientes y productos?

Solo el administrador puede modificar clientes y productos. Los vendedores solo tienen acceso de lectura.

### ¿Por qué no veo las cotizaciones de mis compañeros?

El sistema está diseñado para que cada vendedor solo vea sus propias cotizaciones. Solo el administrador puede ver todas las cotizaciones.

### ¿Puedo cambiar el precio de un producto en una cotización?

Sí, al agregar un producto a una cotización, puedes modificar el precio unitario antes de agregarlo.

### ¿Cómo cambio el estado de una cotización?

Actualmente el estado se cambia automáticamente a "Enviada" cuando envías la cotización por email. Para cambiar a otros estados, edita la cotización.

### ¿El PDF se envía automáticamente por email?

No. El sistema genera el PDF, lo descarga en tu computador y abre Gmail con el correo preparado, pero DEBES adjuntar manualmente el PDF antes de enviar.

### ¿Puedo agregar varios productos a una cotización?

Sí, puedes agregar todos los productos que necesites. Cada uno se mostrará en el PDF con su imagen y descripción.

### ¿Qué pasa con las cotizaciones antiguas creadas antes del sistema de usuarios?

Las cotizaciones antiguas (sin creador asignado) pueden ser editadas por cualquier usuario que las vea. El administrador siempre puede verlas y editarlas.

### ¿Cómo busco una cotización específica?

Usa el buscador en la parte superior derecha. Puedes buscar por número de cotización, nombre del cliente, fecha, etc.

### ¿Puedo exportar la lista de cotizaciones?

Actualmente no hay función de exportación masiva, pero puedes generar el PDF de cada cotización individualmente.

---

## 🔒 Seguridad

### Cierre de Sesión

**IMPORTANTE**: Siempre cierra sesión cuando termines de usar el sistema:
1. Clic en el botón de salida (🚪) en la esquina superior derecha
2. Serás redirigido a la pantalla de login

### Recomendaciones de Seguridad

- No compartas tu contraseña con nadie
- Cierra sesión si te alejas de tu computador
- No dejes sesiones abiertas en computadores compartidos
- Reporta cualquier actividad sospechosa al administrador

---

## 📞 Soporte Técnico

### Contacto

Para soporte técnico o dudas sobre el sistema:

**Administrador del Sistema:**
- **Nombre**: Oscar Carrillo
- **Email**: administracion@plastivalle.com
- **Teléfono**: 3143607707

**Desarrollador:**
- Contacta al equipo de desarrollo para reportar errores o solicitar nuevas funcionalidades

---

## 📚 Actualizaciones del Manual

**Versión**: 1.0
**Fecha**: 29 de Octubre de 2025
**Última actualización**: Sistema de autenticación y permisos implementado

---

## 🎯 Resumen Rápido

### Para Vendedores:
1. Iniciar sesión con tu email corporativo
2. Contraseña: `plastivalle2025`
3. Crear cotizaciones para tus clientes
4. Generar PDFs con tu firma personalizada
5. Enviar por email a tus clientes
6. Solo verás tus propias cotizaciones

### Para Administrador:
1. Acceso completo al sistema
2. Gestionar todos los recursos (clientes, productos, cotizaciones)
3. Ver el trabajo de todos los vendedores
4. Modificar cualquier dato del sistema
5. Usuario: administracion@plastivalle.com
6. Contraseña: `plastivalle2025`

---

*Sistema de Cotizaciones Plastivalle - Todos los derechos reservados*

# Guía para Agregar Datos de Usuarios en Firestore

Como ya creaste los 8 usuarios en Firebase Authentication, ahora necesitas agregar sus datos en Firestore. Aquí está la guía paso a paso:

## Paso 1: Ir a Firestore Database

1. Ve a https://console.firebase.google.com/
2. Selecciona tu proyecto "plastivalle-cotizador"
3. En el menú lateral, haz clic en "Firestore Database"
4. Si no existe la colección "usuarios", créala haciendo clic en "Start collection"
   - Nombre de la colección: `usuarios`

## Paso 2: Agregar Documentos de Usuarios

Para cada usuario, crea un documento con el UID correspondiente:

---

### Usuario 1: Clemencia Basto
- **Document ID**: `Uj8Xm55yxaUGHbNWTIph0uLiFp72`
- **Campos**:
  - `email` (string): `ventas2@plastivalle.com`
  - `nombre` (string): `Clemencia Basto`
  - `cargo` (string): `Ventas 2`
  - `telefono` (string): `3134612909`
  - `role` (string): `vendedor`
  - `fechaCreacion` (timestamp): (fecha actual)

---

### Usuario 2: Mary Luz Hernandez
- **Document ID**: `r6JXwHAFtdWQTVo3VqFG6B8g3uq2`
- **Campos**:
  - `email` (string): `ventas3@plastivalle.com`
  - `nombre` (string): `Mary Luz Hernandez`
  - `cargo` (string): `Ventas 3`
  - `telefono` (string): `3104800912`
  - `role` (string): `vendedor`
  - `fechaCreacion` (timestamp): (fecha actual)

---

### Usuario 3: Angie Ramirez
- **Document ID**: `KITJArn140RNpXW6WAnCb9kVgZD3`
- **Campos**:
  - `email` (string): `ventas@plastivalle.com`
  - `nombre` (string): `Angie Ramirez`
  - `cargo` (string): `Punto de Venta`
  - `telefono` (string): `3208425008`
  - `role` (string): `vendedor`
  - `fechaCreacion` (timestamp): (fecha actual)

---

### Usuario 4: Juan Guillermo Ossa
- **Document ID**: `yWeOgOXXxaUSfysjWQejIrUCNMV2`
- **Campos**:
  - `email` (string): `losenvases@gmail.com`
  - `nombre` (string): `Juan Guillermo Ossa`
  - `cargo` (string): `Free Lance`
  - `telefono` (string): `3102131493`
  - `role` (string): `vendedor`
  - `fechaCreacion` (timestamp): (fecha actual)

---

### Usuario 5: Carlos Ossa
- **Document ID**: `DqDeyb44FAPDdr5iODTncHMCBlk1`
- **Campos**:
  - `email` (string): `gerencia@plastivalle.com`
  - `nombre` (string): `Carlos Ossa`
  - `cargo` (string): `Ventas Gerenciales`
  - `telefono` (string): `3107861932`
  - `role` (string): `vendedor`
  - `fechaCreacion` (timestamp): (fecha actual)

---

### Usuario 6: Juan Manuel Cardozo
- **Document ID**: `Qb5EAAcKkFYC6UajQorVuSooXGC2`
- **Campos**:
  - `email` (string): `ventas4.plastivalle@gmail.com`
  - `nombre` (string): `Juan Manuel Cardozo`
  - `cargo` (string): `Ventas 4`
  - `telefono` (string): `3126384818`
  - `role` (string): `vendedor`
  - `fechaCreacion` (timestamp): (fecha actual)

---

### Usuario 7: Oscar Carrillo (ADMINISTRADOR)
- **Document ID**: `jtTyOWO0uqgeEFLRkIpEK6UOaWH2`
- **Campos**:
  - `email` (string): `administracion@plastivalle.com`
  - `nombre` (string): `Oscar Carrillo`
  - `cargo` (string): `Administración`
  - `telefono` (string): `3143607707`
  - `role` (string): `admin` ⚠️ **IMPORTANTE: debe ser "admin"**
  - `fechaCreacion` (timestamp): (fecha actual)

---

### Usuario 8: Jessica Sanchez
- **Document ID**: `ycdHgIqzDRYOG5KCaUsrTD6AQGc2`
- **Campos**:
  - `email` (string): `tesoreria@plastivalle.com`
  - `nombre` (string): `Jessica Sanchez`
  - `cargo` (string): `Tesorería`
  - `telefono` (string): `3193211387`
  - `role` (string): `vendedor`
  - `fechaCreacion` (timestamp): (fecha actual)

---

## Cómo Agregar Cada Documento

1. En Firestore, haz clic en "Add document"
2. En "Document ID", pega el UID del usuario (exactamente como está arriba)
3. Haz clic en "Add field" para cada campo:
   - Escribe el nombre del campo
   - Selecciona el tipo (string o timestamp)
   - Escribe el valor
4. Haz clic en "Save"
5. Repite para cada uno de los 8 usuarios

## Verificar que Todo Está Correcto

Después de agregar los 8 documentos, deberías ver en Firestore Database:

```
usuarios (colección)
  ├─ Uj8Xm55yxaUGHbNWTIph0uLiFp72 (Clemencia Basto)
  ├─ r6JXwHAFtdWQTVo3VqFG6B8g3uq2 (Mary Luz Hernandez)
  ├─ KITJArn140RNpXW6WAnCb9kVgZD3 (Angie Ramirez)
  ├─ yWeOgOXXxaUSfysjWQejIrUCNMV2 (Juan Guillermo Ossa)
  ├─ DqDeyb44FAPDdr5iODTncHMCBlk1 (Carlos Ossa)
  ├─ Qb5EAAcKkFYC6UajQorVuSooXGC2 (Juan Manuel Cardozo)
  ├─ jtTyOWO0uqgeEFLRkIpEK6UOaWH2 (Oscar Carrillo - ADMIN)
  └─ ycdHgIqzDRYOG5KCaUsrTD6AQGc2 (Jessica Sanchez)
```

## Probar el Sistema

Una vez agregados todos los datos:

1. Inicia sesión con cualquier usuario:
   - Email: (cualquiera de los emails de arriba)
   - Contraseña: `plastivalle2025`

2. **Prueba con un vendedor** (ej: ventas2@plastivalle.com):
   - Deberías ver tu nombre en la esquina superior derecha
   - NO deberías ver botones de "Nuevo Cliente" o "Nuevo Producto"
   - SÍ puedes crear cotizaciones

3. **Prueba con el administrador** (administracion@plastivalle.com):
   - Deberías ver "Oscar Carrillo" en la esquina
   - SÍ deberías ver todos los botones de crear/editar/eliminar
   - Puedes gestionar clientes, productos y cotizaciones

## Notas Importantes

- Solo **administracion@plastivalle.com** tiene `role: "admin"`
- Todos los demás tienen `role: "vendedor"`
- Los UIDs deben coincidir EXACTAMENTE con los de Authentication
- Todos los campos deben ser tipo "string" excepto fechaCreacion que es "timestamp"

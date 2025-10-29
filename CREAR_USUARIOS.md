# Guía para Crear Usuarios en Firebase

## Opción 1: Desde la Consola de Firebase (MÁS FÁCIL)

1. Ve a la consola de Firebase: https://console.firebase.google.com/
2. Selecciona tu proyecto: "plastivalle-cotizador"
3. En el menú lateral, haz clic en "Authentication"
4. Ve a la pestaña "Users"
5. Haz clic en "Add user"
6. Crea cada usuario con estos datos:

### Usuarios a crear:

**Usuario 1:**
- Email: ventas2@plastivalle.com
- Contraseña: plastivalle2025
- Nombre: Clemencia Basto
- Cargo: Ventas 2
- Teléfono: 3134612909
- Role: vendedor

**Usuario 2:**
- Email: ventas3@plastivalle.com
- Contraseña: plastivalle2025
- Nombre: Mary Luz Hernandez
- Cargo: Ventas 3
- Teléfono: 3104800912
- Role: vendedor

**Usuario 3:**
- Email: ventas@plastivalle.com
- Contraseña: plastivalle2025
- Nombre: Angie Ramirez
- Cargo: Punto de Venta
- Teléfono: 3208425008
- Role: vendedor

**Usuario 4:**
- Email: losenvases@gmail.com
- Contraseña: plastivalle2025
- Nombre: Juan Guillermo Ossa
- Cargo: Free Lance
- Teléfono: 3102131493
- Role: vendedor

**Usuario 5:**
- Email: gerencia@plastivalle.com
- Contraseña: plastivalle2025
- Nombre: Carlos Ossa
- Cargo: Ventas Gerenciales
- Teléfono: 3107861932
- Role: vendedor

**Usuario 6:**
- Email: ventas4.plastivalle@gmail.com
- Contraseña: plastivalle2025
- Nombre: Juan Manuel Cardozo
- Cargo: Ventas 4
- Teléfono: 3126384818
- Role: vendedor

**Usuario 7 (ADMINISTRADOR):**
- Email: administracion@plastivalle.com
- Contraseña: plastivalle2025
- Nombre: Oscar Carrillo
- Cargo: Administración
- Teléfono: 3143607707
- Role: admin

**Usuario 8:**
- Email: tesoreria@plastivalle.com
- Contraseña: plastivalle2025
- Nombre: Jessica Sanchez
- Cargo: Tesorería
- Teléfono: 3193211387
- Role: vendedor

## Opción 2: Agregar datos adicionales en Firestore

Después de crear cada usuario en Authentication, debes agregar sus datos en Firestore:

1. Ve a "Firestore Database" en el menú lateral
2. Crea una colección llamada "usuarios" (si no existe)
3. Para cada usuario, crea un documento con el UID del usuario (que Firebase le asignó en Authentication)
4. Agrega estos campos al documento:
   - email: (el email del usuario)
   - nombre: (nombre completo)
   - cargo: (cargo del usuario)
   - telefono: (teléfono)
   - role: "vendedor" o "admin" (solo administracion@plastivalle.com debe ser "admin")
   - fechaCreacion: (fecha actual)

## Verificar usuarios creados

Después de crear todos los usuarios:
1. Ve a Authentication > Users
2. Deberías ver 8 usuarios listados
3. Cada uno debe tener su documento correspondiente en Firestore > usuarios

## Notas importantes

- Contraseña para TODOS los usuarios: **plastivalle2025**
- Solo **administracion@plastivalle.com** tiene role "admin"
- Los demás usuarios tienen role "vendedor"
- El administrador es el único que puede modificar productos y clientes

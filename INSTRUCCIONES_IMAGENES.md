# 📸 Instrucciones para Agregar Imágenes al Cotizador

## ✅ Cambios Implementados

Se han implementado todos los cambios solicitados:

1. ✅ **Logo de Plastivalle** - Agregado en header y PDFs
2. ✅ **Unidades de peso** - Campo con dropdown (g/kg/lb)
3. ✅ **Imágenes de productos** - Sistema completo implementado
4. ✅ **Campo de tapa** - Removido del formulario
5. ✅ **Nombre de PDFs** - Formato: `NombreCliente_Fecha_COT-XXX.pdf`
6. ✅ **Tiempo de Despacho** - Campo número + unidad
7. ✅ **Forma de Pago** - Campo de texto abierto
8. ✅ **Transporte** - Campo de texto abierto
9. ✅ **Observaciones** - Visible en PDF para el cliente
10. ✅ **Proceso "Otros"** - Agregado en filtros y productos

---

## 📂 Cómo Agregar el Logo de Plastivalle

1. Coloca tu archivo de logo JPG en:
   ```
   public/images/logo-plastivalle.jpg
   ```

2. El logo aparecerá automáticamente en:
   - Header de la aplicación (40px de alto)
   - PDFs generados (60px de alto)

---

## 📦 Cómo Agregar Imágenes de Productos

### Ubicación de las imágenes:
```
public/images/productos/
```

### Nomenclatura de archivos:

#### Opción 1: Por ID de Producto
```
producto_1.jpg    → Para idProducto: 1
producto_2.jpg    → Para idProducto: 2
producto_3.jpg    → Para idProducto: 3
...
```

#### Opción 2: Por Nombre de Producto
Reemplaza espacios y caracteres especiales por guiones bajos:
```
GALON_No_1_3785_CC.jpg
GALON_No_2_4000_CC.jpg
TAPA_GALON_1.jpg
```

### Formatos soportados:
- ✅ JPG / JPEG
- ✅ PNG
- ✅ WebP

### Recomendaciones:
- **Tamaño**: 800x800 píxeles
- **Peso**: Máximo 500KB por imagen
- **Fondo**: Blanco o transparente
- **Orientación**: Cuadrada (1:1)

### Ejemplo de estructura:
```
public/
└── images/
    ├── logo-plastivalle.jpg
    └── productos/
        ├── producto_1.jpg
        ├── producto_2.jpg
        ├── producto_3.jpg
        ├── ...
        └── placeholder.svg (ya incluido)
```

---

## 🎨 Placeholder Automático

Si una imagen no se encuentra, se mostrará automáticamente un placeholder gris con el texto "Sin imagen".

---

## 🚀 Nuevas Funcionalidades

### 1. Campo de Peso con Unidades
- Ahora puedes ingresar el peso en **gramos (g)**, **kilogramos (kg)** o **libras (lb)**
- El sistema convierte automáticamente a gramos para los cálculos
- Solo disponible para productos **Soplado**

### 2. Campos Comerciales Personalizados
- **Tiempo de Despacho**: Número + unidad (días/horas/semanas)
- **Forma de Pago**: Texto libre (con valor predeterminado)
- **Transporte**: Texto libre
- **Observaciones de Negociación**: Aparecen destacadas en el PDF

### 3. Proceso "Otros"
- Nuevo tipo de proceso además de Inyectado y Soplado
- Mantiene las mismas opciones de personalización

### 4. PDFs Mejorados
- Nombre descriptivo: `NombreCliente_2025-10-27_COT-123.pdf`
- Logo de Plastivalle en el header
- Campos comerciales dinámicos
- Observaciones destacadas con fondo amarillo

---

## 🔧 Para Desarrolladores

### Agregar el logo programáticamente:
El logo se carga desde `/images/logo-plastivalle.jpg` y tiene fallback automático si no existe.

### Función helper para imágenes:
```javascript
import { obtenerImagenProducto } from './data/productos';

const imagenUrl = obtenerImagenProducto(producto);
```

### Estructura de rutas:
- Logo: `/images/logo-plastivalle.jpg`
- Productos: `/images/productos/producto_{idProducto}.jpg`
- Placeholder: `/images/productos/placeholder.svg`

---

## 📝 Notas Importantes

1. **Todas las imágenes deben estar en la carpeta `public/images/`** para que sean accesibles desde el navegador.

2. **Los nombres de archivo distinguen mayúsculas y minúsculas** en algunos sistemas operativos.

3. **Recomendación**: Usa el sistema por ID (producto_1.jpg, producto_2.jpg) ya que es más fácil de mantener.

4. **Optimiza las imágenes** antes de subirlas para mejorar el rendimiento de la aplicación.

---

## ✨ ¿Necesitas Ayuda?

Si tienes problemas con las imágenes:
1. Verifica que el archivo esté en la carpeta correcta
2. Revisa que el nombre coincida con el ID del producto
3. Asegúrate de que el formato sea JPG, PNG o WebP
4. Reinicia el servidor de desarrollo después de agregar imágenes

---

**¡Listo para usar! 🎉**

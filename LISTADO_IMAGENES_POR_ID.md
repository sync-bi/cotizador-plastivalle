# 📋 Listado de Imágenes por ID de Producto

Este archivo te ayuda a saber qué nombre debe tener cada imagen según el ID del producto.

## 📸 Nomenclatura de Archivos

Las imágenes deben nombrarse como: **`producto_[ID].jpg`**

Por ejemplo:
- `producto_1.jpg` → GALÓN No. 1 3785 CC
- `producto_2.jpg` → GALÓN No. 2 4000 CC
- `producto_3.jpg` → GALÓN No. 2 (PP) 4000 CC

---

## 📝 Cómo Obtener el Listado Completo

Para ver todos los productos y sus IDs, ejecuta este comando en la terminal:

```bash
npm start
```

Luego abre la aplicación, ve a la pestaña **"Productos"** y verás todos los productos con sus nombres.

---

## 🔧 Opción Alternativa: Renombrar Archivos Automáticamente

Si ya tienes las imágenes con el nombre del producto, puedes:

### Windows PowerShell:
```powershell
# Ejemplo: Renombrar "GALÓN No. 1 3785 CC.jpg" a "producto_1.jpg"
Rename-Item "GALÓN No. 1 3785 CC.jpg" "producto_1.jpg"
```

---

## 📊 IDs de Productos Comunes

Aquí algunos ejemplos basados en los datos:

| ID | Nombre del Producto |
|----|---------------------|
| 1  | GALÓN No. 1 3785 CC |
| 2  | GALÓN No. 2 4000 CC |
| 3  | GALÓN No. 2 (PP) 4000 CC |
| 4  | GALÓN No. 3 5000 CC |
| 5  | GALÓN No. 4 20000 CC |
| ... | ... |

Para ver la lista completa, revisa el archivo `src/data/productos.js` y busca el campo `idProducto`.

---

## ✅ Verificar que las Imágenes Funcionan

1. Coloca las imágenes en: `public/images/productos/`
2. Nombra los archivos como: `producto_1.jpg`, `producto_2.jpg`, etc.
3. Reinicia el servidor (`npm start`)
4. Refresca el navegador con `Ctrl + Shift + R`
5. Ve a la pestaña "Productos" y verás las imágenes

---

## 🚨 Importante

- El sistema busca las imágenes por **idProducto**, NO por nombre
- Si un producto tiene múltiples desgloses (ej: galón + tapa + manija), todos comparten el mismo **idProducto**
- Por lo tanto, solo necesitas **UNA imagen por producto completo**

---

## 📞 ¿Necesitas Ayuda?

Si tienes problemas para identificar los IDs, puedo crear un script que te genere el listado completo.

import React, { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, Eye, FileText, Users, Package, Calculator, Search, Download } from 'lucide-react';

const CotizadorApp = () => {
  const [activeTab, setActiveTab] = useState('cotizaciones');
  const [clientes, setClientes] = useState([]);
  const [productos, setProductos] = useState([]);
  const [cotizaciones, setCotizaciones] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState('');
  const [editingItem, setEditingItem] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  // Configuración de la empresa
  const empresaConfig = {
    nombre: 'PLASTIVALLE',
    direccion: 'Calle 21 Bis No.39 – 37',
    telefono: 'PBX: (0571) 745-05-45- 572 45 45 – 3 35 00 88',
    email: 'ventas2@plastivalle.com',
    web: 'www.plastivalle.com',
    ciudad: 'Bogotá D.C.- Colombia'
  };

  // Datos iniciales de ejemplo
  useEffect(() => {
    const clientesIniciales = [
      { id: 1, nombre: 'Juan Pérez', email: 'juan@email.com', telefono: '123-456-7890', empresa: 'Empresa ABC' },
      { id: 2, nombre: 'María García', email: 'maria@email.com', telefono: '098-765-4321', empresa: 'Corporación XYZ' }
    ];
    
    // PRODUCTOS - Ahora cada registro es un desglose individual
    const productosIniciales = [
      // GALÓN No. 1 - Producto ID 1 (INYECTADO)
      {
        id: 1,
        idDesglose: 1,
        categoria: 'INYECTADOS',
        idProducto: 1,
        producto: 'GALÓN No. 1 3785 CC',
        nombre: 'GALÓN No. 1 3785 CC',
        peso: 123,
        material: 'PEAD',
        precioLiquidado: 2765,
        precio: 2931,
        descripcion: 'Producto: GALÓN No. 1 3785 CC\nPeso: 123g\nMaterial: PEAD',
        proceso: 'Inyectado'
      },
      {
        id: 2,
        idDesglose: 2,
        categoria: 'INYECTADOS',
        idProducto: 1,
        producto: 'GALÓN No. 1 3785 CC',
        nombre: 'TAPA GALÓN 1',
        peso: 56,
        material: 'PEAD',
        precioLiquidado: 1042,
        precio: 1101,
        descripcion: 'Producto: GALÓN No. 1 3785 CC\nPeso: 56g\nMaterial: PEAD',
        proceso: 'Inyectado'
      },
      {
        id: 3,
        idDesglose: 3,
        categoria: 'INYECTADOS',
        idProducto: 1,
        producto: 'GALÓN No. 1 3785 CC',
        nombre: 'MANIJA',
        peso: 9,
        material: 'PP',
        precioLiquidado: 189,
        precio: 200,
        descripcion: 'Producto: GALÓN No. 1 3785 CC\nPeso: 9g\nMaterial: PP',
        proceso: 'Inyectado'
      },

      // GALÓN No. 2 - Producto ID 2 (INYECTADO)
      {
        id: 4,
        idDesglose: 4,
        categoria: 'INYECTADOS',
        idProducto: 2,
        producto: 'GALÓN No. 2 4000 CC',
        nombre: 'GALÓN No. 2 4000 CC',
        peso: 185,
        material: 'PEAD',
        precioLiquidado: 3171,
        precio: 3362,
        descripcion: 'Producto: GALÓN No. 2 4000 CC\nPeso: 185g\nMaterial: PEAD',
        proceso: 'Inyectado'
      },
      {
        id: 5,
        idDesglose: 5,
        categoria: 'INYECTADOS',
        idProducto: 2,
        producto: 'GALÓN No. 2 4000 CC',
        nombre: 'TAPA GALÓN 2',
        peso: 54,
        material: 'PEAD',
        precioLiquidado: 1042,
        precio: 1101,
        descripcion: 'Producto: GALÓN No. 2 4000 CC\nPeso: 54g\nMaterial: PEAD',
        proceso: 'Inyectado'
      },
      {
        id: 6,
        idDesglose: 6,
        categoria: 'INYECTADOS',
        idProducto: 2,
        producto: 'GALÓN No. 2 4000 CC',
        nombre: 'MANIJA',
        peso: 9,
        material: 'PP',
        precioLiquidado: 189,
        precio: 200,
        descripcion: 'Producto: GALÓN No. 2 4000 CC\nPeso: 9g\nMaterial: PP',
        proceso: 'Inyectado'
      },

      // Agregar algunos productos SOPLADOS para prueba
      {
        id: 40,
        idDesglose: 59,
        categoria: 'SOPLADOS',
        idProducto: 24,
        producto: 'GARRAFA RECTANGULAR DE 250 cc',
        nombre: 'GARRAFA RECTANGULAR DE 250 cc',
        peso: 20,
        material: 'PEAD',
        precioLiquidado: 650,
        precio: 693,
        descripcion: 'Producto: GARRAFA RECTANGULAR DE 250 cc\nPeso: 20g\nMaterial: PEAD',
        proceso: 'Soplado'
      },
      {
        id: 41,
        idDesglose: 60,
        categoria: 'SOPLADOS',
        idProducto: 24,
        producto: 'GARRAFA RECTANGULAR DE 250 cc',
        nombre: 'TAPA ROSCA 28 BS LAINER',
        peso: 3,
        material: 'PEAD',
        precioLiquidado: 70,
        precio: 75,
        descripcion: 'Producto: GARRAFA RECTANGULAR DE 250 cc\nPeso: 3g\nMaterial: PEAD',
        proceso: 'Soplado'
      },
      {
        id: 42,
        idDesglose: 61,
        categoria: 'SOPLADOS',
        idProducto: 25,
        producto: 'GARRAFA RECTANGULAR DE 500 cc',
        nombre: 'GARRAFA RECTANGULAR DE 500 cc',
        peso: 40,
        material: 'PEAD',
        precioLiquidado: 850,
        precio: 913,
        descripcion: 'Producto: GARRAFA RECTANGULAR DE 500 cc\nPeso: 40g\nMaterial: PEAD',
        proceso: 'Soplado'
      }
    ];

    // ===== NUEVA LÓGICA PARA PRODUCTOS AGRUPADOS =====
    // Función para obtener productos únicos (agrupados por idProducto)
    const obtenerProductosUnicos = () => {
      const productosAgrupados = {};
      
      productosIniciales.forEach(item => {
        if (!productosAgrupados[item.idProducto]) {
          productosAgrupados[item.idProducto] = {
            id: item.idProducto,
            nombre: item.producto,
            categoria: item.categoria,
            proceso: item.proceso,
            desgloses: [],
            precioTotal: 0
          };
        }
        
        productosAgrupados[item.idProducto].desgloses.push({
          id: item.id,
          idDesglose: item.idDesglose,
          nombre: item.nombre,
          peso: item.peso,
          material: item.material,
          precio: item.precio,
          descripcion: item.descripcion
        });
        
        productosAgrupados[item.idProducto].precioTotal += item.precio;
      });
      
      return Object.values(productosAgrupados);
    };

    setClientes(clientesIniciales);
    setProductos(productosIniciales); // Mantenemos todos los desgloses individuales
    
    // Guardamos también los productos agrupados en window para uso en formularios
    window.productosAgrupados = obtenerProductosUnicos();
  }, []);

  // Función para generar PDF
  const generarPDF = async (cotizacion) => {
    const cliente = clientes.find(c => c.id === parseInt(cotizacion.clienteId));
    
    const htmlContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8">
        <style>
          body { 
            font-family: Arial, sans-serif; 
            margin: 0; 
            padding: 20px; 
            font-size: 12px;
            line-height: 1.4;
          }
          .header { 
            border-bottom: 3px solid #FF6B35; 
            padding-bottom: 15px; 
            margin-bottom: 20px;
            display: flex;
            justify-content: space-between;
            align-items: center;
          }
          .company-name { 
            font-size: 28px; 
            font-weight: bold; 
            color: #333; 
            margin: 0;
            letter-spacing: 2px;
          }
          .company-info { 
            color: #666; 
            margin: 5px 0;
            font-size: 11px;
          }
          .products-table { 
            width: 100%; 
            border-collapse: collapse; 
            margin: 20px 0;
            border: 1px solid #ddd;
          }
          .products-table th { 
            background-color: #FF6B35; 
            color: white; 
            padding: 12px 8px; 
            text-align: center;
            font-weight: bold;
          }
          .products-table td { 
            padding: 10px 8px; 
            border: 1px solid #ddd;
            vertical-align: top;
          }
          .total-section {
            margin: 20px 0;
            text-align: right;
          }
          .total-table {
            margin-left: auto;
            width: 300px;
          }
          .terms {
            margin: 30px 0;
            font-size: 11px;
            line-height: 1.6;
          }
        </style>
      </head>
      <body>
        <div class="header">
          <div>
            <h1 class="company-name">${empresaConfig.nombre}</h1>
            <div class="company-info">${empresaConfig.telefono}</div>
            <div class="company-info">${empresaConfig.direccion}</div>
            <div class="company-info">e-mail: ${empresaConfig.email} ${empresaConfig.web}</div>
            <div class="company-info">${empresaConfig.ciudad}</div>
          </div>
        </div>

        <div style="margin: 20px 0;">
          <strong>${empresaConfig.ciudad.replace('- Colombia', '')}, ${new Date(cotizacion.fecha).toLocaleDateString('es-ES', { 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
          })}</strong>
        </div>

        <div style="font-weight: bold; margin: 10px 0; font-size: 14px;">
          <strong>Asunto: Cotización ${cotizacion.numero}</strong>
        </div>

        <div style="background-color: #f8f9fa; padding: 15px; border-radius: 5px; margin: 20px 0;">
          <strong>Cliente:</strong> ${cliente ? cliente.nombre : 'N/A'}<br>
          <strong>Empresa:</strong> ${cliente ? cliente.empresa : 'N/A'}<br>
          <strong>Email:</strong> ${cliente ? cliente.email : 'N/A'}<br>
          <strong>Teléfono:</strong> ${cliente ? cliente.telefono : 'N/A'}
        </div>

        <table class="products-table">
          <thead>
            <tr>
              <th>Descripción</th>
              <th style="width: 80px;">Cantidad</th>
              <th style="width: 120px;">Precio Unidad</th>
              <th style="width: 120px;">Subtotal</th>
            </tr>
          </thead>
          <tbody>
            ${cotizacion.items.map(item => `
              <tr>
                <td>
                  <strong>${item.nombre}</strong><br>
                  ${item.descripcionPersonalizada || item.descripcion || ''}
                </td>
                <td style="text-align: center;">${item.cantidad}</td>
                <td style="text-align: right; font-weight: bold;">${item.precio.toLocaleString('es-CO')} + IVA</td>
                <td style="text-align: right; font-weight: bold;">${item.subtotal.toLocaleString('es-CO')} + IVA</td>
              </tr>
            `).join('')}
          </tbody>
        </table>

        <div class="total-section">
          <table class="total-table">
            <tr>
              <td><strong>Subtotal:</strong></td>
              <td style="text-align: right; font-weight: bold;">${cotizacion.subtotal.toLocaleString('es-CO')}</td>
            </tr>
            <tr>
              <td><strong>IVA (${cotizacion.impuesto}%):</strong></td>
              <td style="text-align: right; font-weight: bold;">${cotizacion.impuestoMonto.toLocaleString('es-CO')}</td>
            </tr>
            <tr style="border-top: 2px solid #333; font-size: 14px;">
              <td><strong>TOTAL:</strong></td>
              <td style="text-align: right; font-weight: bold;">${cotizacion.total.toLocaleString('es-CO')}</td>
            </tr>
          </table>
        </div>

        <div class="terms">
          <h4 style="color: #FF6B35;">CONDICIONES COMERCIALES:</h4>
          <ul>
            <li>El pedido se formalizará mediante una orden de compra</li>
            <li>Forma de pago: Contado, anticipo del 50% con la orden de compra y el restante antes de su entrega</li>
            <li>Para productos sin impresión su entrega es dentro de 10 días hábiles y con impresión son 15 días hábiles</li>
            <li>Validez de la cotización: ${cotizacion.validez} días</li>
          </ul>
        </div>

        <div style="margin-top: 40px;">
          <p><strong>Cordial saludo,</strong></p>
          <p><strong>Carlos Montero</strong><br>
          Teléfono: 3208425008<br>
          E-mail: ventas@plastivalle.com</p>
        </div>
      </body>
      </html>
    `;

    const printWindow = window.open('', '_blank');
    printWindow.document.write(htmlContent);
    printWindow.document.close();
    
    printWindow.onload = () => {
      setTimeout(() => {
        printWindow.print();
      }, 500);
    };
  };

  // Componente Modal
  const Modal = ({ children, onClose, title }) => (
    <div className="modal show d-block" tabIndex="-1" style={{backgroundColor: 'rgba(0,0,0,0.5)'}}>
      <div className="modal-dialog modal-xl modal-dialog-scrollable">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">{title}</h5>
            <button type="button" className="btn-close" onClick={onClose}></button>
          </div>
          <div className="modal-body">
            {children}
          </div>
        </div>
      </div>
    </div>
  );

  // Formulario de Cliente
  const ClienteForm = () => {
    const [formData, setFormData] = useState(
      editingItem || { nombre: '', email: '', telefono: '', empresa: '' }
    );

    const handleSubmit = (e) => {
      e.preventDefault();
      if (editingItem) {
        setClientes(clientes.map(c => c.id === editingItem.id ? { ...formData, id: editingItem.id } : c));
      } else {
        setClientes([...clientes, { ...formData, id: Date.now() }]);
      }
      setShowModal(false);
      setEditingItem(null);
    };

    return (
      <form onSubmit={handleSubmit}>
        <div className="row g-3">
          <div className="col-md-6">
            <label className="form-label">Nombre completo</label>
            <input
              type="text"
              className="form-control"
              value={formData.nombre}
              onChange={(e) => setFormData({...formData, nombre: e.target.value})}
              required
            />
          </div>
          <div className="col-md-6">
            <label className="form-label">Email</label>
            <input
              type="email"
              className="form-control"
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              required
            />
          </div>
          <div className="col-md-6">
            <label className="form-label">Teléfono</label>
            <input
              type="tel"
              className="form-control"
              value={formData.telefono}
              onChange={(e) => setFormData({...formData, telefono: e.target.value})}
              required
            />
          </div>
          <div className="col-md-6">
            <label className="form-label">Empresa</label>
            <input
              type="text"
              className="form-control"
              value={formData.empresa}
              onChange={(e) => setFormData({...formData, empresa: e.target.value})}
              required
            />
          </div>
        </div>
        <div className="mt-4">
          <button type="submit" className="btn btn-primary me-2">
            {editingItem ? 'Actualizar' : 'Crear'} Cliente
          </button>
          <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>
            Cancelar
          </button>
        </div>
      </form>
    );
  };

  // Formulario de Producto
  const ProductoForm = () => {
    const [formData, setFormData] = useState(
      editingItem || { 
        nombre: '', 
        precio: '', 
        descripcion: '', 
        categoria: '', 
        proceso: '',
        material: '',
        peso: ''
      }
    );

    const handleSubmit = (e) => {
      e.preventDefault();
      const productoData = { 
        ...formData, 
        precio: parseFloat(formData.precio),
        peso: parseFloat(formData.peso) || 0
      };
      if (editingItem) {
        setProductos(productos.map(p => p.id === editingItem.id ? { ...productoData, id: editingItem.id } : p));
      } else {
        setProductos([...productos, { ...productoData, id: Date.now() }]);
      }
      setShowModal(false);
      setEditingItem(null);
    };

    return (
      <form onSubmit={handleSubmit}>
        <div className="row g-3">
          <div className="col-md-6">
            <label className="form-label">Nombre del producto</label>
            <input
              type="text"
              className="form-control"
              value={formData.nombre}
              onChange={(e) => setFormData({...formData, nombre: e.target.value})}
              required
            />
          </div>
          <div className="col-md-6">
            <label className="form-label">Precio</label>
            <input
              type="number"
              step="0.01"
              className="form-control"
              value={formData.precio}
              onChange={(e) => setFormData({...formData, precio: e.target.value})}
              required
            />
          </div>
          <div className="col-md-4">
            <label className="form-label">Categoría</label>
            <input
              type="text"
              className="form-control"
              value={formData.categoria}
              onChange={(e) => setFormData({...formData, categoria: e.target.value})}
              required
            />
          </div>
          <div className="col-md-4">
            <label className="form-label">Proceso</label>
            <select
              className="form-select"
              value={formData.proceso}
              onChange={(e) => setFormData({...formData, proceso: e.target.value})}
              required
            >
              <option value="">Seleccionar Proceso</option>
              <option value="Soplado">Soplado</option>
              <option value="Inyectado">Inyectado</option>
            </select>
          </div>
          <div className="col-md-4">
            <label className="form-label">Material</label>
            <input
              type="text"
              className="form-control"
              value={formData.material}
              onChange={(e) => setFormData({...formData, material: e.target.value})}
            />
          </div>
          <div className="col-md-6">
            <label className="form-label">Peso (gramos)</label>
            <input
              type="number"
              className="form-control"
              value={formData.peso}
              onChange={(e) => setFormData({...formData, peso: e.target.value})}
            />
          </div>
          <div className="col-md-6">
            <label className="form-label">Descripción</label>
            <textarea
              className="form-control"
              rows="3"
              value={formData.descripcion}
              onChange={(e) => setFormData({...formData, descripcion: e.target.value})}
            />
          </div>
        </div>
        <div className="mt-4">
          <button type="submit" className="btn btn-success me-2">
            {editingItem ? 'Actualizar' : 'Crear'} Producto
          </button>
          <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>
            Cancelar
          </button>
        </div>
      </form>
    );
  };

  // ===== FORMULARIO DE COTIZACIÓN ACTUALIZADO =====
  const CotizacionForm = () => {
    const [formData, setFormData] = useState(
      editingItem || {
        numero: `COT-${Date.now()}`,
        clienteId: '',
        fecha: new Date().toISOString().split('T')[0],
        validez: '30',
        estado: 'borrador',
        items: [],
        descuento: 0,
        impuesto: 19
      }
    );

    const [selectedProducto, setSelectedProducto] = useState('');
    const [selectedDesgloses, setSelectedDesgloses] = useState([]);
    const [cantidad, setCantidad] = useState(1);
    const [procesoFiltro, setProcesoFiltro] = useState('');
    
    // Estados para opciones personalizables
    const [opcionesSoplado, setOpcionesSoplado] = useState({
      peso: '',
      color: '',
      tapa: '',
      material: ''
    });

    const [opcionesInyeccion, setOpcionesInyeccion] = useState({
      color: '',
      material: ''
    });

    // Obtener productos únicos filtrados por proceso
    const getProductosUnicos = () => {
      if (!window.productosAgrupados) return [];
      
      return window.productosAgrupados.filter(producto => 
        !procesoFiltro || producto.proceso === procesoFiltro
      );
    };

    // Obtener desgloses del producto seleccionado
    const getDesglosesProducto = () => {
      if (!selectedProducto || !window.productosAgrupados) return [];
      
      const producto = window.productosAgrupados.find(p => p.id === parseInt(selectedProducto));
      return producto ? producto.desgloses : [];
    };

    // Manejar cambio de producto seleccionado
    const handleProductoChange = (productoId) => {
      setSelectedProducto(productoId);
      setSelectedDesgloses([]); // Limpiar desgloses seleccionados
    };

    // Manejar selección de desgloses
    const handleDesgloseChange = (desgloseId, isChecked) => {
      if (isChecked) {
        setSelectedDesgloses([...selectedDesgloses, desgloseId]);
      } else {
        setSelectedDesgloses(selectedDesgloses.filter(id => id !== desgloseId));
      }
    };

    // Agregar items seleccionados
    const agregarItem = () => {
      if (!selectedProducto || selectedDesgloses.length === 0) return;
      
      const producto = window.productosAgrupados.find(p => p.id === parseInt(selectedProducto));
      const desglosesSeleccionados = producto.desgloses.filter(d => 
        selectedDesgloses.includes(d.id)
      );
      
      // Crear descripción personalizada
      let descripcionPersonalizada = `${producto.nombre}\nComponentes seleccionados:\n`;
      desglosesSeleccionados.forEach(desglose => {
        descripcionPersonalizada += `- ${desglose.nombre} (${desglose.peso}g ${desglose.material})\n`;
      });
      
      // Agregar personalizaciones
      const observaciones = document.getElementById('observaciones-temp')?.value || '';
      
      if (procesoFiltro === 'Soplado') {
        const opciones = [];
        if (opcionesSoplado.peso) opciones.push(`Peso: ${opcionesSoplado.peso}`);
        if (opcionesSoplado.color) opciones.push(`Color: ${opcionesSoplado.color}`);
        if (opcionesSoplado.tapa) opciones.push(`Tapa: ${opcionesSoplado.tapa}`);
        if (opcionesSoplado.material) opciones.push(`Material: ${opcionesSoplado.material}`);
        if (opciones.length > 0) {
          descripcionPersonalizada += '\nPersonalizado: ' + opciones.join(', ');
        }
      } else if (procesoFiltro === 'Inyectado') {
        const opciones = [];
        if (opcionesInyeccion.color) opciones.push(`Color: ${opcionesInyeccion.color}`);
        if (opcionesInyeccion.material) opciones.push(`Material: ${opcionesInyeccion.material}`);
        if (opciones.length > 0) {
          descripcionPersonalizada += '\nPersonalizado: ' + opciones.join(', ');
        }
      }
      
      if (observaciones) {
        descripcionPersonalizada += `\nObservaciones: ${observaciones}`;
      }

      // Calcular precio total de los desgloses seleccionados
      const precioTotal = desglosesSeleccionados.reduce((sum, desglose) => sum + desglose.precio, 0);

      const nuevoItem = {
        id: Date.now(),
        productoId: producto.id,
        nombre: `${producto.nombre} (${desglosesSeleccionados.length} componentes)`,
        precio: precioTotal,
        cantidad: cantidad,
        subtotal: precioTotal * cantidad,
        descripcionPersonalizada: descripcionPersonalizada,
        desglosesSeleccionados: desglosesSeleccionados,
        opcionesPersonalizadas: procesoFiltro === 'Soplado' ? opcionesSoplado : opcionesInyeccion,
        observaciones: observaciones
      };
      
      setFormData({
        ...formData,
        items: [...formData.items, nuevoItem]
      });
      
      // Limpiar formulario
      setSelectedProducto('');
      setSelectedDesgloses([]);
      setCantidad(1);
      const obsField = document.getElementById('observaciones-temp');
      if (obsField) obsField.value = '';
    };

    const eliminarItem = (itemId) => {
      setFormData({
        ...formData,
        items: formData.items.filter(item => item.id !== itemId)
      });
    };

    const calcularTotales = () => {
      const subtotal = formData.items.reduce((sum, item) => sum + item.subtotal, 0);
      const descuentoMonto = subtotal * (formData.descuento / 100);
      const baseImponible = subtotal - descuentoMonto;
      const impuestoMonto = baseImponible * (formData.impuesto / 100);
      const total = baseImponible + impuestoMonto;
      return { subtotal, descuentoMonto, baseImponible, impuestoMonto, total };
    };

    const totales = calcularTotales();

    const handleSubmit = (e) => {
      e.preventDefault();
      const cotizacionData = { ...formData, ...totales };
      if (editingItem) {
        setCotizaciones(cotizaciones.map(c => c.id === editingItem.id ? { ...cotizacionData, id: editingItem.id } : c));
      } else {
        setCotizaciones([...cotizaciones, { ...cotizacionData, id: Date.now() }]);
      }
      setShowModal(false);
      setEditingItem(null);
    };

    return (
      <form onSubmit={handleSubmit}>
        <div className="row g-3 mb-4">
          <div className="col-md-4">
            <label className="form-label">Número de cotización</label>
            <input
              type="text"
              className="form-control"
              value={formData.numero}
              onChange={(e) => setFormData({...formData, numero: e.target.value})}
              required
            />
          </div>
          <div className="col-md-4">
            <label className="form-label">Cliente</label>
            <select
              className="form-select"
              value={formData.clienteId}
              onChange={(e) => setFormData({...formData, clienteId: e.target.value})}
              required
            >
              <option value="">Seleccionar Cliente</option>
              {clientes.map(cliente => (
                <option key={cliente.id} value={cliente.id}>{cliente.nombre}</option>
              ))}
            </select>
          </div>
          <div className="col-md-4">
            <label className="form-label">Fecha</label>
            <input
              type="date"
              className="form-control"
              value={formData.fecha}
              onChange={(e) => setFormData({...formData, fecha: e.target.value})}
              required
            />
          </div>
        </div>

        {/* ===== SECCIÓN DE AGREGAR PRODUCTOS MEJORADA ===== */}
        <div className="border-top pt-4 mb-4">
          <h6 className="mb-3">Agregar Productos</h6>
          
          {/* Filtro por proceso */}
          <div className="row g-2 mb-3">
            <div className="col-md-3">
              <label className="form-label">Proceso</label>
              <select
                className="form-select"
                value={procesoFiltro}
                onChange={(e) => {
                  setProcesoFiltro(e.target.value);
                  setSelectedProducto('');
                  setSelectedDesgloses([]);
                  setOpcionesSoplado({ peso: '', color: '', tapa: '', material: '' });
                  setOpcionesInyeccion({ color: '', material: '' });
                }}
              >
                <option value="">Seleccionar Proceso</option>
                <option value="Soplado">Soplado</option>
                <option value="Inyectado">Inyectado</option>
              </select>
            </div>
          </div>

          {/* Opciones personalizables para SOPLADO */}
          {procesoFiltro === 'Soplado' && (
            <div className="row g-2 mb-3">
              <div className="col-md-3">
                <label className="form-label">Peso (opcional)</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Ej: 500g"
                  value={opcionesSoplado.peso}
                  onChange={(e) => setOpcionesSoplado({...opcionesSoplado, peso: e.target.value})}
                />
              </div>
              <div className="col-md-3">
                <label className="form-label">Color (opcional)</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Ej: Azul, Transparente"
                  value={opcionesSoplado.color}
                  onChange={(e) => setOpcionesSoplado({...opcionesSoplado, color: e.target.value})}
                />
              </div>
              <div className="col-md-3">
                <label className="form-label">Tapa (opcional)</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Ej: Rosca 28mm"
                  value={opcionesSoplado.tapa}
                  onChange={(e) => setOpcionesSoplado({...opcionesSoplado, tapa: e.target.value})}
                />
              </div>
              <div className="col-md-3">
                <label className="form-label">Material (opcional)</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Ej: PEAD, PP"
                  value={opcionesSoplado.material}
                  onChange={(e) => setOpcionesSoplado({...opcionesSoplado, material: e.target.value})}
                />
              </div>
            </div>
          )}

          {/* Opciones personalizables para INYECCIÓN */}
          {procesoFiltro === 'Inyectado' && (
            <div className="row g-2 mb-3">
              <div className="col-md-6">
                <label className="form-label">Color (opcional)</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Ej: Blanco, Negro, Transparente"
                  value={opcionesInyeccion.color}
                  onChange={(e) => setOpcionesInyeccion({...opcionesInyeccion, color: e.target.value})}
                />
              </div>
              <div className="col-md-6">
                <label className="form-label">Material (opcional)</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Ej: PEAD, PP, TPE"
                  value={opcionesInyeccion.material}
                  onChange={(e) => setOpcionesInyeccion({...opcionesInyeccion, material: e.target.value})}
                />
              </div>
            </div>
          )}

          {/* Selección de producto */}
          <div className="row g-2 mb-3">
            <div className="col-md-6">
              <label className="form-label">Producto</label>
              <select
                className="form-select"
                value={selectedProducto}
                onChange={(e) => handleProductoChange(e.target.value)}
              >
                <option value="">Seleccionar Producto</option>
                {getProductosUnicos().map(producto => (
                  <option key={producto.id} value={producto.id}>
                    [{producto.proceso}] {producto.nombre} - ${producto.precioTotal.toLocaleString('es-CO')} total
                  </option>
                ))}
              </select>
            </div>
            <div className="col-md-2">
              <label className="form-label">Cantidad</label>
              <input
                type="number"
                min="1"
                className="form-control"
                value={cantidad}
                onChange={(e) => setCantidad(parseInt(e.target.value))}
              />
            </div>
            <div className="col-md-4">
              <label className="form-label">Observaciones</label>
              <input
                type="text"
                className="form-control"
                placeholder="Notas adicionales"
                id="observaciones-temp"
              />
            </div>
          </div>

          {/* Selección de desgloses/componentes */}
          {selectedProducto && getDesglosesProducto().length > 0 && (
            <div className="card mb-3">
              <div className="card-header">
                <h6 className="mb-0">Seleccionar Componentes</h6>
              </div>
              <div className="card-body">
                <div className="row">
                  {getDesglosesProducto().map(desglose => (
                    <div key={desglose.id} className="col-md-6 mb-2">
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          id={`desglose-${desglose.id}`}
                          checked={selectedDesgloses.includes(desglose.id)}
                          onChange={(e) => handleDesgloseChange(desglose.id, e.target.checked)}
                        />
                        <label className="form-check-label" htmlFor={`desglose-${desglose.id}`}>
                          <strong>{desglose.nombre}</strong><br/>
                          <small className="text-muted">
                            ${desglose.precio.toLocaleString('es-CO')} | {desglose.peso}g | {desglose.material}
                          </small>
                        </label>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-3">
                  <button
                    type="button"
                    className="btn btn-success"
                    onClick={agregarItem}
                    disabled={selectedDesgloses.length === 0}
                  >
                    <Plus size={20} /> Agregar Seleccionados ({selectedDesgloses.length})
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Tabla de items agregados */}
        {formData.items.length > 0 && (
          <div className="table-responsive mb-4">
            <table className="table table-striped">
              <thead className="table-dark">
                <tr>
                  <th>Producto</th>
                  <th className="text-center">Cantidad</th>
                  <th className="text-end">Precio Unit.</th>
                  <th className="text-end">Subtotal</th>
                  <th className="text-center">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {formData.items.map(item => (
                  <tr key={item.id}>
                    <td>
                      <strong>{item.nombre}</strong>
                      {item.observaciones && (
                        <><br/><small className="text-muted">Obs: {item.observaciones}</small></>
                      )}
                      {item.desglosesSeleccionados && (
                        <><br/><small className="text-info">
                          Componentes: {item.desglosesSeleccionados.map(d => d.nombre).join(', ')}
                        </small></>
                      )}
                    </td>
                    <td className="text-center">{item.cantidad}</td>
                    <td className="text-end">${item.precio.toLocaleString('es-CO')}</td>
                    <td className="text-end">${item.subtotal.toLocaleString('es-CO')}</td>
                    <td className="text-center">
                      <button
                        type="button"
                        className="btn btn-sm btn-outline-danger"
                        onClick={() => eliminarItem(item.id)}
                      >
                        <Trash2 size={16} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Totales */}
        {formData.items.length > 0 && (
          <div className="card bg-light mb-4">
            <div className="card-body">
              <div className="row">
                <div className="col-6">
                  <div className="d-flex justify-content-between mb-2">
                    <span>Subtotal:</span>
                    <span>${totales.subtotal.toLocaleString('es-CO')}</span>
                  </div>
                  <div className="d-flex justify-content-between mb-2">
                    <span>IVA ({formData.impuesto}%):</span>
                    <span>${totales.impuestoMonto.toLocaleString('es-CO')}</span>
                  </div>
                  <div className="d-flex justify-content-between fw-bold fs-5 border-top pt-2">
                    <span>Total:</span>
                    <span>${totales.total.toLocaleString('es-CO')}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="mt-4">
          <button type="submit" className="btn btn-primary me-2">
            {editingItem ? 'Actualizar' : 'Crear'} Cotización
          </button>
          <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>
            Cancelar
          </button>
        </div>
      </form>
    );
  };

  // Funciones de utilidad
  const eliminarElemento = (tipo, id) => {
    if (window.confirm('¿Estás seguro de que quieres eliminar este elemento?')) {
      if (tipo === 'cliente') {
        setClientes(clientes.filter(c => c.id !== id));
      } else if (tipo === 'producto') {
        setProductos(productos.filter(p => p.id !== id));
      } else if (tipo === 'cotizacion') {
        setCotizaciones(cotizaciones.filter(c => c.id !== id));
      }
    }
  };

  const editarElemento = (tipo, elemento) => {
    setEditingItem(elemento);
    setModalType(tipo);
    setShowModal(true);
  };

  const filtrarElementos = (elementos, termino) => {
    if (!termino) return elementos;
    return elementos.filter(elemento =>
      Object.values(elemento).some(valor =>
        valor.toString().toLowerCase().includes(termino.toLowerCase())
      )
    );
  };

  const getEstadoBadge = (estado) => {
    const badges = {
      'aprobada': 'bg-success',
      'enviada': 'bg-primary',
      'rechazada': 'bg-danger',
      'borrador': 'bg-warning'
    };
    return badges[estado] || 'bg-secondary';
  };

  return (
    <div className="min-vh-100" style={{backgroundColor: '#f8f9fa'}}>
      {/* Header */}
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary shadow-sm">
        <div className="container-fluid">
          <div className="d-flex align-items-center">
            <Calculator className="me-2" size={32} />
            <span className="navbar-brand mb-0 h1">Sistema de Cotizaciones</span>
          </div>
          <div className="d-flex align-items-center">
            <div className="position-relative">
              <Search className="position-absolute top-50 start-0 translate-middle-y ms-2 text-muted" size={20} />
              <input
                type="text"
                className="form-control ps-5"
                placeholder="Buscar..."
                style={{width: '300px'}}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
        </div>
      </nav>

      {/* Navigation Tabs */}
      <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm">
        <div className="container-fluid">
          <ul className="nav nav-pills">
            {[
              { id: 'cotizaciones', name: 'Cotizaciones', icon: FileText },
              { id: 'clientes', name: 'Clientes', icon: Users },
              { id: 'productos', name: 'Productos', icon: Package }
            ].map(tab => {
              const Icon = tab.icon;
              return (
                <li className="nav-item" key={tab.id}>
                  <button
                    className={`nav-link ${activeTab === tab.id ? 'active' : ''}`}
                    onClick={() => setActiveTab(tab.id)}
                  >
                    <Icon className="me-2" size={20} />
                    {tab.name}
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      </nav>

      {/* Main Content */}
      <div className="container-fluid py-4">
        
        {/* Cotizaciones Tab */}
        {activeTab === 'cotizaciones' && (
          <div>
            <div className="d-flex justify-content-between align-items-center mb-4">
              <h2 className="mb-0">Cotizaciones</h2>
              <button
                className="btn btn-primary"
                onClick={() => {
                  setModalType('cotizacion');
                  setEditingItem(null);
                  setShowModal(true);
                }}
              >
                <Plus className="me-2" size={20} />
                Nueva Cotización
              </button>
            </div>

            <div className="card shadow-sm">
              <div className="card-body p-0">
                <div className="table-responsive">
                  <table className="table table-hover mb-0">
                    <thead className="table-dark">
                      <tr>
                        <th>Número</th>
                        <th>Cliente</th>
                        <th>Fecha</th>
                        <th>Estado</th>
                        <th className="text-end">Total</th>
                        <th className="text-center">Acciones</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filtrarElementos(cotizaciones, searchTerm).map(cotizacion => {
                        const cliente = clientes.find(c => c.id === parseInt(cotizacion.clienteId));
                        return (
                          <tr key={cotizacion.id}>
                            <td className="fw-bold">{cotizacion.numero}</td>
                            <td>{cliente ? cliente.nombre : 'Cliente no encontrado'}</td>
                            <td>{cotizacion.fecha}</td>
                            <td>
                              <span className={`badge ${getEstadoBadge(cotizacion.estado)}`}>
                                {cotizacion.estado}
                              </span>
                            </td>
                            <td className="text-end fw-bold">
                              ${cotizacion.total?.toLocaleString('es-CO') || '0'}
                            </td>
                            <td className="text-center">
                              <div className="btn-group">
                                <button
                                  className="btn btn-sm btn-outline-success"
                                  onClick={() => generarPDF(cotizacion)}
                                  title="Generar PDF"
                                >
                                  <Download size={16} />
                                </button>
                                <button
                                  className="btn btn-sm btn-outline-primary"
                                  onClick={() => editarElemento('cotizacion', cotizacion)}
                                >
                                  <Edit size={16} />
                                </button>
                                <button
                                  className="btn btn-sm btn-outline-danger"
                                  onClick={() => eliminarElemento('cotizacion', cotizacion.id)}
                                >
                                  <Trash2 size={16} />
                                </button>
                              </div>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
                {filtrarElementos(cotizaciones, searchTerm).length === 0 && (
                  <div className="text-center py-5">
                    <FileText className="mb-3 text-muted" size={48} />
                    <h5 className="text-muted">Sin cotizaciones</h5>
                    <p className="text-muted">Comienza creando una nueva cotización.</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Clientes Tab */}
        {activeTab === 'clientes' && (
          <div>
            <div className="d-flex justify-content-between align-items-center mb-4">
              <h2 className="mb-0">Clientes</h2>
              <button
                className="btn btn-primary"
                onClick={() => {
                  setModalType('cliente');
                  setEditingItem(null);
                  setShowModal(true);
                }}
              >
                <Plus className="me-2" size={20} />
                Nuevo Cliente
              </button>
            </div>

            <div className="card shadow-sm">
              <div className="card-body p-0">
                <div className="table-responsive">
                  <table className="table table-hover mb-0">
                    <thead className="table-dark">
                      <tr>
                        <th>Nombre</th>
                        <th>Email</th>
                        <th>Teléfono</th>
                        <th>Empresa</th>
                        <th className="text-center">Acciones</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filtrarElementos(clientes, searchTerm).map(cliente => (
                        <tr key={cliente.id}>
                          <td className="fw-bold">{cliente.nombre}</td>
                          <td>{cliente.email}</td>
                          <td>{cliente.telefono}</td>
                          <td>{cliente.empresa}</td>
                          <td className="text-center">
                            <div className="btn-group">
                              <button
                                className="btn btn-sm btn-outline-primary"
                                onClick={() => editarElemento('cliente', cliente)}
                              >
                                <Edit size={16} />
                              </button>
                              <button
                                className="btn btn-sm btn-outline-danger"
                                onClick={() => eliminarElemento('cliente', cliente.id)}
                              >
                                <Trash2 size={16} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                {filtrarElementos(clientes, searchTerm).length === 0 && (
                  <div className="text-center py-5">
                    <Users className="mb-3 text-muted" size={48} />
                    <h5 className="text-muted">Sin clientes</h5>
                    <p className="text-muted">Comienza agregando un nuevo cliente.</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Productos Tab */}
        {activeTab === 'productos' && (
          <div>
            <div className="d-flex justify-content-between align-items-center mb-4">
              <h2 className="mb-0">Productos</h2>
              <button
                className="btn btn-success"
                onClick={() => {
                  setModalType('producto');
                  setEditingItem(null);
                  setShowModal(true);
                }}
              >
                <Plus className="me-2" size={20} />
                Nuevo Producto
              </button>
            </div>

            <div className="card shadow-sm">
              <div className="card-body p-0">
                <div className="table-responsive">
                  <table className="table table-hover mb-0">
                    <thead className="table-dark">
                      <tr>
                        <th>Nombre</th>
                        <th>Categoría</th>
                        <th>Proceso</th>
                        <th>Material</th>
                        <th>Peso</th>
                        <th className="text-end">Precio</th>
                        <th className="text-center">Acciones</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filtrarElementos(productos, searchTerm).map(producto => (
                        <tr key={producto.id}>
                          <td className="fw-bold">{producto.nombre}</td>
                          <td>
                            <span className={`badge ${producto.categoria === 'INYECTADOS' ? 'bg-warning' : 'bg-info'}`}>
                              {producto.categoria}
                            </span>
                          </td>
                          <td>
                            <span className={`badge ${producto.proceso === 'Soplado' ? 'bg-info' : 'bg-warning'}`}>
                              {producto.proceso}
                            </span>
                          </td>
                          <td>{producto.material}</td>
                          <td>{producto.peso}g</td>
                          <td className="text-end fw-bold">${producto.precio.toLocaleString('es-CO')}</td>
                          <td className="text-center">
                            <div className="btn-group">
                              <button
                                className="btn btn-sm btn-outline-primary"
                                onClick={() => editarElemento('producto', producto)}
                              >
                                <Edit size={16} />
                              </button>
                              <button
                                className="btn btn-sm btn-outline-danger"
                                onClick={() => eliminarElemento('producto', producto.id)}
                              >
                                <Trash2 size={16} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                {filtrarElementos(productos, searchTerm).length === 0 && (
                  <div className="text-center py-5">
                    <Package className="mb-3 text-muted" size={48} />
                    <h5 className="text-muted">Sin productos</h5>
                    <p className="text-muted">Comienza agregando un nuevo producto.</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Modal */}
      {showModal && (
        <Modal 
          onClose={() => setShowModal(false)}
          title={
            modalType === 'cliente' ? (editingItem ? 'Editar Cliente' : 'Nuevo Cliente') :
            modalType === 'producto' ? (editingItem ? 'Editar Producto' : 'Nuevo Producto') :
            modalType === 'cotizacion' ? (editingItem ? 'Editar Cotización' : 'Nueva Cotización') : ''
          }
        >
          {modalType === 'cliente' && <ClienteForm />}
          {modalType === 'producto' && <ProductoForm />}
          {modalType === 'cotizacion' && <CotizacionForm />}
        </Modal>
      )}
    </div>
  );
};

export default CotizadorApp;
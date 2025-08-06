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
    
    const productosIniciales = [
      { 
        id: 1, 
        nombre: 'ENVASE GALON 2 M-03', 
        precio: 5446, 
        descripcion: 'Unidad de empaque: x 28 o x15\nCapacidad: 4000cc\nMaterial: Polietileno alta densidad\nColores: blanco/traslucido/amarillo', 
        categoria: 'Envases',
        proceso: 'Soplado'
      },
      { 
        id: 2, 
        nombre: 'TAPA GALON CON ORING', 
        precio: 850, 
        descripcion: 'Tapa para galón con sello hermético\nMaterial: Polietileno\nColores disponibles', 
        categoria: 'Tapas',
        proceso: 'Inyectado'
      },
      { 
        id: 3, 
        nombre: 'MANIJA GALON', 
        precio: 450, 
        descripcion: 'Manija ergonómica para galón\nMaterial: Polietileno resistente', 
        categoria: 'Accesorios',
        proceso: 'Inyectado'
      },
      { 
        id: 4, 
        nombre: 'ENVASE REDONDO 1L', 
        precio: 3200, 
        descripcion: 'Envase redondo 1 litro\nMaterial: Polietileno\nColores varios', 
        categoria: 'Envases',
        proceso: 'Soplado'
      },
      { 
        id: 5, 
        nombre: 'TAPA ROSCA 28MM', 
        precio: 320, 
        descripcion: 'Tapa con rosca estándar\nMaterial: Polipropileno\nColores disponibles', 
        categoria: 'Tapas',
        proceso: 'Inyectado'
      }
    ];

    setClientes(clientesIniciales);
    setProductos(productosIniciales);
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
                  ${productos.find(p => p.id === item.productoId)?.descripcion?.replace(/\n/g, '<br>') || ''}
                </td>
                <td style="text-align: center;">${item.cantidad}</td>
                <td style="text-align: right; font-weight: bold;">$${item.precio.toLocaleString('es-CO')} + IVA</td>
                <td style="text-align: right; font-weight: bold;">$${item.subtotal.toLocaleString('es-CO')} + IVA</td>
              </tr>
            `).join('')}
          </tbody>
        </table>

        <div class="total-section">
          <table class="total-table">
            <tr>
              <td><strong>Subtotal:</strong></td>
              <td style="text-align: right; font-weight: bold;">$${cotizacion.subtotal.toLocaleString('es-CO')}</td>
            </tr>
            <tr>
              <td><strong>IVA (${cotizacion.impuesto}%):</strong></td>
              <td style="text-align: right; font-weight: bold;">$${cotizacion.impuestoMonto.toLocaleString('es-CO')}</td>
            </tr>
            <tr style="border-top: 2px solid #333; font-size: 14px;">
              <td><strong>TOTAL:</strong></td>
              <td style="text-align: right; font-weight: bold;">$${cotizacion.total.toLocaleString('es-CO')}</td>
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
      editingItem || { nombre: '', precio: '', descripcion: '', categoria: '', proceso: '' }
    );

    const handleSubmit = (e) => {
      e.preventDefault();
      const productoData = { ...formData, precio: parseFloat(formData.precio) };
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

  // Formulario de Cotización
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
    const [cantidad, setCantidad] = useState(1);
    const [procesoFiltro, setProcesoFiltro] = useState('');

    const agregarItem = () => {
      if (!selectedProducto) return;
      const producto = productos.find(p => p.id === parseInt(selectedProducto));
      const nuevoItem = {
        id: Date.now(),
        productoId: producto.id,
        nombre: producto.nombre,
        precio: producto.precio,
        cantidad: cantidad,
        subtotal: producto.precio * cantidad
      };
      setFormData({
        ...formData,
        items: [...formData.items, nuevoItem]
      });
      setSelectedProducto('');
      setCantidad(1);
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

        <div className="border-top pt-4 mb-4">
          <h6 className="mb-3">Agregar Productos</h6>
          <div className="row g-2 mb-3">
            <div className="col-md-3">
              <label className="form-label">Proceso</label>
              <select
                className="form-select"
                value={procesoFiltro}
                onChange={(e) => setProcesoFiltro(e.target.value)}
              >
                <option value="">Todos los procesos</option>
                <option value="Soplado">Soplado</option>
                <option value="Inyectado">Inyectado</option>
              </select>
            </div>
            <div className="col-md-5">
              <label className="form-label">Producto</label>
              <select
                className="form-select"
                value={selectedProducto}
                onChange={(e) => setSelectedProducto(e.target.value)}
              >
                <option value="">Seleccionar Producto</option>
                {productos
                  .filter(producto => !procesoFiltro || producto.proceso === procesoFiltro)
                  .map(producto => (
                    <option key={producto.id} value={producto.id}>
                      [{producto.proceso}] {producto.nombre} - ${producto.precio}
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
                placeholder="Cantidad"
                value={cantidad}
                onChange={(e) => setCantidad(parseInt(e.target.value))}
              />
            </div>
            <div className="col-md-2">
              <label className="form-label">&nbsp;</label>
              <button
                type="button"
                className="btn btn-success w-100"
                onClick={agregarItem}
              >
                <Plus size={20} /> Agregar
              </button>
            </div>
          </div>
        </div>

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
                    <td>{item.nombre}</td>
                    <td className="text-center">{item.cantidad}</td>
                    <td className="text-end">${item.precio.toFixed(2)}</td>
                    <td className="text-end">${item.subtotal.toFixed(2)}</td>
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

        {formData.items.length > 0 && (
          <div className="card bg-light mb-4">
            <div className="card-body">
              <div className="row">
                <div className="col-6">
                  <div className="d-flex justify-content-between mb-2">
                    <span>Subtotal:</span>
                    <span>${totales.subtotal.toFixed(2)}</span>
                  </div>
                  <div className="d-flex justify-content-between mb-2">
                    <span>IVA ({formData.impuesto}%):</span>
                    <span>${totales.impuestoMonto.toFixed(2)}</span>
                  </div>
                  <div className="d-flex justify-content-between fw-bold fs-5 border-top pt-2">
                    <span>Total:</span>
                    <span>${totales.total.toFixed(2)}</span>
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
                       <th className="text-end">Precio</th>
                       <th>Descripción</th>
                       <th className="text-center">Acciones</th>
                     </tr>
                   </thead>
                   <tbody>
                     {filtrarElementos(productos, searchTerm).map(producto => (
                       <tr key={producto.id}>
                         <td className="fw-bold">{producto.nombre}</td>
                         <td>{producto.categoria}</td>
                         <td>
                           <span className={`badge ${producto.proceso === 'Soplado' ? 'bg-info' : 'bg-warning'}`}>
                             {producto.proceso}
                           </span>
                         </td>
                         <td className="text-end fw-bold">${producto.precio.toLocaleString('es-CO')}</td>
                         <td style={{maxWidth: '200px'}} className="text-truncate">
                           {producto.descripcion}
                         </td>
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
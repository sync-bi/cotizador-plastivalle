import React, { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, FileText, Users, Package, Calculator, Search, Download } from 'lucide-react';
import CotizacionForm from './components/CotizacionForm';
import { productosIniciales, obtenerProductosUnicos, obtenerImagenProducto } from './data/productos';
import { clientesIniciales } from './data/clientes';
import { Mail } from 'lucide-react';
import { useEmailCotizacion } from './hooks/useEmailCotizacion';

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
    ciudad: 'Bogotá D.C.- Colombia',
    emailEnvio: 'ventas2@plastivalle.com' // Correo desde el cual enviar
  };

  const { enviarCotizacion, isLoading } = useEmailCotizacion(empresaConfig);

  // Función para cambiar estado de cotización
const cambiarEstadoCotizacion = (cotizacionId, nuevoEstado) => {
  setCotizaciones(cotizaciones.map(c => 
    c.id === cotizacionId 
      ? { ...c, estado: nuevoEstado }
      : c
  ));
};

// Función para enviar por correo
const handleEnviarCorreo = async (cotizacion) => {
  const cliente = clientes.find(c => c.id === parseInt(cotizacion.clienteId));
  await enviarCotizacion(cotizacion, cliente, cambiarEstadoCotizacion);
};

  // Datos iniciales de ejemplo
  useEffect(() => {

    
    // PRODUCTOS - Ahora cada registro es un desglose individual
    
    // ===== NUEVA LÓGICA PARA PRODUCTOS AGRUPADOS =====
    // Función para obtener productos únicos (agrupados por idProducto)
    
    setClientes(clientesIniciales);
    setProductos(productosIniciales); // Mantenemos todos los desgloses individuales
    
    // Guardamos también los productos agrupados en window para uso en formularios
    window.productosAgrupados = obtenerProductosUnicos(productosIniciales);
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
          <div style="display: flex; align-items: center; gap: 20px;">
            <img src="/images/logo-plastivalle.jpg" alt="Logo Plastivalle" style="height: 60px; border-radius: 4px;" onerror="this.style.display='none'">
            <div>
              <h1 class="company-name">${empresaConfig.nombre}</h1>
              <div class="company-info">${empresaConfig.telefono}</div>
              <div class="company-info">${empresaConfig.direccion}</div>
              <div class="company-info">e-mail: ${empresaConfig.email} ${empresaConfig.web}</div>
              <div class="company-info">${empresaConfig.ciudad}</div>
            </div>
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
          // Busca la sección de la tabla de productos y reemplázala con:
<tbody>
  ${cotizacion.items.map((item, index) => {
    let filas = '';
    
    // Encabezado del producto
    filas += `
      <tr style="background-color: #f8f9fa;">
        <td colspan="4" style="font-weight: bold; padding: 10px; border: 2px solid #dee2e6;">
          PRODUCTO ${index + 1}: ${item.nombre.replace(/ \(\d+ componentes\)/, '')}
          ${item.descripcionPersonalizada ? `<br><em style="font-size: 11px;">${item.descripcionPersonalizada}</em>` : ''}
        </td>
      </tr>
    `;
    
    // Desgloses individuales
    if (item.desglosesSeleccionados && item.desglosesSeleccionados.length > 0) {
      item.desglosesSeleccionados.forEach(desglose => {
        filas += `
          <tr>
            <td style="padding-left: 20px;">
              • <strong>${desglose.nombre}</strong><br>
              <small>${desglose.peso}g - ${desglose.material}</small>
            </td>
            <td style="text-align: center;">${item.cantidad}</td>
            <td style="text-align: right; font-weight: bold;">$${desglose.precio.toLocaleString('es-CO')}</td>
            <td style="text-align: right; font-weight: bold;">$${(desglose.precio * item.cantidad).toLocaleString('es-CO')}</td>
          </tr>
        `;
      });
    } else {
      // Fallback para items sin desgloses
      filas += `
        <tr>
          <td style="padding-left: 20px;">
            • <strong>${item.nombre}</strong>
          </td>
          <td style="text-align: center;">${item.cantidad}</td>
          <td style="text-align: right; font-weight: bold;">$${item.precio.toLocaleString('es-CO')}</td>
          <td style="text-align: right; font-weight: bold;">$${item.subtotal.toLocaleString('es-CO')}</td>
        </tr>
      `;
    }
    
    return filas;
  }).join('')}
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
            <li><strong>Forma de pago:</strong> ${cotizacion.formaPago || 'Contado, anticipo del 50% con la orden de compra y el restante antes de su entrega'}</li>
            ${cotizacion.tiempoDespacho ? `<li><strong>Tiempo de despacho:</strong> ${cotizacion.tiempoDespacho} ${cotizacion.unidadTiempoDespacho || 'días'}</li>` : '<li>Para productos sin impresión su entrega es dentro de 10 días hábiles y con impresión son 15 días hábiles</li>'}
            ${cotizacion.transporte ? `<li><strong>Transporte:</strong> ${cotizacion.transporte}</li>` : ''}
            <li><strong>Validez de la cotización:</strong> ${cotizacion.validez} días</li>
          </ul>
          ${cotizacion.observacionesNegociacion ? `
            <div style="margin-top: 15px; padding: 10px; background-color: #fff3cd; border-left: 4px solid #FF6B35;">
              <strong>Observaciones:</strong><br>
              ${cotizacion.observacionesNegociacion}
            </div>
          ` : ''}
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
              <option value="Otros">Otros</option>
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
            <img
              src="/images/logo-plastivalle.jpg"
              alt="Plastivalle Logo"
              style={{height: '40px', marginRight: '15px', borderRadius: '4px'}}
              onError={(e) => {
                e.target.style.display = 'none';
                e.target.nextElementSibling.style.display = 'inline';
              }}
            />
            <Calculator className="me-2" size={32} style={{display: 'none'}} />
            <span className="navbar-brand mb-0 h1">PLASTIVALLE - Sistema de Cotizaciones</span>
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
                                  className="btn btn-sm btn-outline-info" 
                                  onClick={() => handleEnviarCorreo(cotizacion)}
                                  disabled={isLoading}
                                  title="Enviar por Correo"
                                >
                                  <Mail size={16} />
                                  {isLoading && <small>...</small>}
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
                        <th style={{width: '60px'}}>Imagen</th>
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
                          <td>
                            <img
                              src={obtenerImagenProducto(producto)}
                              alt={producto.nombre}
                              style={{width: '50px', height: '50px', objectFit: 'cover', borderRadius: '4px'}}
                              onError={(e) => {
                                e.target.onerror = null;
                                e.target.src = '/images/productos/placeholder.svg';
                              }}
                            />
                          </td>
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
          {modalType === 'cotizacion' && (
            <CotizacionForm 
              editingItem={editingItem}
              clientes={clientes}
              onSubmit={(cotizacionData) => {
                if (editingItem) {
                  setCotizaciones(cotizaciones.map(c => c.id === editingItem.id ? { ...cotizacionData, id: editingItem.id } : c));
                } else {
                  setCotizaciones([...cotizaciones, { ...cotizacionData, id: Date.now() }]);
                }
                setShowModal(false);
                setEditingItem(null);
              }}
              onCancel={() => setShowModal(false)}
            />
          )}
        </Modal>
      )}
    </div>
  );
};

export default CotizadorApp;
import React, { useState } from 'react';
import { Trash2 } from 'lucide-react';
import { recalcularDesglosesConPesos } from '../utils/calculosProductos';

const CotizacionForm = ({ 
  editingItem, 
  clientes, 
  onSubmit, 
  onCancel 
}) => {
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
    color: 'blanco',  // Siempre empieza en blanco
    tapa: '',
    material: ''
  });

  const [opcionesInyeccion, setOpcionesInyeccion] = useState({
    color: 'blanco',  // Siempre empieza en blanco
    material: ''
  });

  // Estado para pesos personalizados de desgloses
  const [pesosPersonalizados, setPesosPersonalizados] = useState({});

  // Obtener productos únicos filtrados por proceso
  const getProductosUnicos = () => {
    if (!window.productosAgrupados) return [];
    
    return window.productosAgrupados.filter(producto => 
      !procesoFiltro || producto.proceso === procesoFiltro
    );
  };

  // Obtener desgloses del producto seleccionado con cálculos dinámicos
  const getDesglosesProducto = () => {
    if (!selectedProducto || !window.productosAgrupados) return [];
    
    const producto = window.productosAgrupados.find(p => p.id === parseInt(selectedProducto));
    if (!producto) return [];
    
    // Aplicar cálculos dinámicos si hay pesos personalizados
    const desglosesRecalculados = recalcularDesglosesConPesos(producto.desgloses, pesosPersonalizados);
    
    return desglosesRecalculados;
  };

  // Manejar cambio de peso personalizado
  const handlePesoChange = (desgloseId, nuevoPeso) => {
    setPesosPersonalizados(prev => ({
      ...prev,
      [desgloseId]: parseFloat(nuevoPeso) || 0
    }));
  };

  // Manejar selección de desgloses
  const handleDesgloseChange = (desgloseId, isChecked) => {
    if (isChecked) {
      setSelectedDesgloses([...selectedDesgloses, desgloseId]);
    } else {
      setSelectedDesgloses(selectedDesgloses.filter(id => id !== desgloseId));
    }
  };

  // Manejar cambio de producto
  const handleProductoChange = (productoId) => {
    setSelectedProducto(productoId);
    setSelectedDesgloses([]);
    
    if (productoId && window.productosAgrupados) {
      const producto = window.productosAgrupados.find(p => p.id === parseInt(productoId));
      if (producto) {
        setProcesoFiltro(producto.proceso);
        
        // Prellenar opciones con datos del primer desglose del producto
        const primerDesglose = producto.desgloses[0];
        if (primerDesglose) {
          if (producto.proceso === 'Soplado') {
            setOpcionesSoplado({
              color: 'blanco',  // Siempre blanco por defecto
              tapa: '',
              material: primerDesglose.material || ''
            });
          } else if (producto.proceso === 'Inyectado') {
            setOpcionesInyeccion({
              color: 'blanco',  // Siempre blanco por defecto
              material: primerDesglose.material || ''
            });
          }
        }
      }
    } else {
      // Resetear opciones manteniendo color en blanco
      setOpcionesSoplado({
        color: 'blanco',
        tapa: '',
        material: ''
      });
      setOpcionesInyeccion({
        color: 'blanco',
        material: ''
      });
    }
  };

  // Agregar item a la cotización
  const agregarItem = () => {
    if (!selectedProducto || selectedDesgloses.length === 0) return;

    const producto = window.productosAgrupados.find(p => p.id === parseInt(selectedProducto));
    const desglosesSeleccionados = producto.desgloses.filter(d => selectedDesgloses.includes(d.id));
    
    const observaciones = document.getElementById('observaciones-temp')?.value || '';
    
    // Crear descripción personalizada
    let descripcionPersonalizada = `${producto.nombre}`;
    
    if (procesoFiltro === 'Soplado') {
      const opciones = [];
      if (opcionesSoplado.color && opcionesSoplado.color !== 'blanco') opciones.push(`Color: ${opcionesSoplado.color}`);
      if (opcionesSoplado.tapa) opciones.push(`Tapa: ${opcionesSoplado.tapa}`);
      if (opcionesSoplado.material) opciones.push(`Material: ${opcionesSoplado.material}`);
      if (opciones.length > 0) {
        descripcionPersonalizada += '\nPersonalizado: ' + opciones.join(', ');
      }
    }
    
    if (procesoFiltro === 'Inyectado') {
      const opciones = [];
      if (opcionesInyeccion.color && opcionesInyeccion.color !== 'blanco') opciones.push(`Color: ${opcionesInyeccion.color}`);
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
    setProcesoFiltro('');
    setPesosPersonalizados({}); // Limpiar pesos personalizados
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
    onSubmit(cotizacionData);
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Datos básicos de la cotización */}
      <div className="row g-3 mb-4">
        <div className="col-md-6">
          <label className="form-label">Número de Cotización</label>
          <input
            type="text"
            className="form-control"
            value={formData.numero}
            onChange={(e) => setFormData({...formData, numero: e.target.value})}
            required
          />
        </div>
        <div className="col-md-6">
          <label className="form-label">Cliente</label>
          <select
            className="form-select"
            value={formData.clienteId}
            onChange={(e) => setFormData({...formData, clienteId: e.target.value})}
            required
          >
            <option value="">Seleccionar Cliente</option>
            {clientes.map(cliente => (
              <option key={cliente.id} value={cliente.id}>
                {cliente.nombre}
              </option>
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
        <div className="col-md-4">
          <label className="form-label">Validez (días)</label>
          <input
            type="number"
            className="form-control"
            value={formData.validez}
            onChange={(e) => setFormData({...formData, validez: e.target.value})}
            required
          />
        </div>
        <div className="col-md-4">
          <label className="form-label">Estado</label>
          <select
            className="form-select"
            value={formData.estado}
            onChange={(e) => setFormData({...formData, estado: e.target.value})}
          >
            <option value="borrador">Borrador</option>
            <option value="enviada">Enviada</option>
            <option value="aprobada">Aprobada</option>
            <option value="rechazada">Rechazada</option>
          </select>
        </div>
      </div>

      {/* Agregar productos */}
      <div className="card mb-4">
        <div className="card-header">
          <h6 className="mb-0">Agregar Productos</h6>
        </div>
        <div className="card-body">
          {/* Filtro por proceso */}
          <div className="row g-2 mb-3">
            <div className="col-md-3">
              <label className="form-label">Filtrar por Proceso</label>
              <select
                className="form-select"
                value={procesoFiltro}
                onChange={(e) => {
                  setProcesoFiltro(e.target.value);
                  setSelectedProducto('');
                  setSelectedDesgloses([]);
                }}
              >
                <option value="">Todos los procesos</option>
                <option value="Inyectado">Inyectado</option>
                <option value="Soplado">Soplado</option>
              </select>
            </div>
          </div>

          {/* Opciones personalizables para SOPLADO - ELIMINADO */}
          {/* Las opciones ahora están dentro de la tabla de desgloses */}

          {/* Opciones personalizables para INYECCIÓN - ELIMINADO */}
          {/* Las opciones ahora están dentro de la tabla de desgloses */}

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

          {/* Selección de desgloses/componentes con opciones integradas */}
          {selectedProducto && getDesglosesProducto().length > 0 && (
            <div className="card mb-3">
              <div className="card-header">
                <h6 className="mb-0">Seleccionar y Personalizar Componentes</h6>
              </div>
              <div className="card-body">
                {/* Opciones generales del producto */}
                <div className="alert alert-light mb-3">
                  <h6 className="mb-2">Opciones Generales del Producto:</h6>
                  <div className="row g-2">
                    <div className="col-md-3">
                      <label className="form-label">Color</label>
                      <select
                        className="form-control form-control-sm"
                        value={procesoFiltro === 'Soplado' ? opcionesSoplado.color : opcionesInyeccion.color}
                        onChange={(e) => {
                          if (procesoFiltro === 'Soplado') {
                            setOpcionesSoplado({...opcionesSoplado, color: e.target.value});
                          } else {
                            setOpcionesInyeccion({...opcionesInyeccion, color: e.target.value});
                          }
                        }}
                      >
                        <option value="blanco">Blanco</option>
                        <option value="transparente">Transparente</option>
                        <option value="rosado">Rosado</option>
                      </select>
                    </div>
                    {procesoFiltro === 'Soplado' && (
                      <div className="col-md-3">
                        <label className="form-label">Tapa (opcional)</label>
                        <input
                          type="text"
                          className="form-control form-control-sm"
                          placeholder="Tipo de tapa"
                          value={opcionesSoplado.tapa}
                          onChange={(e) => setOpcionesSoplado({...opcionesSoplado, tapa: e.target.value})}
                        />
                      </div>
                    )}
                    <div className="col-md-3">
                      <label className="form-label">Material Personalizado (opcional)</label>
                      <input
                        type="text"
                        className="form-control form-control-sm"
                        placeholder="Ej: PEAD, PP, TPE"
                        value={procesoFiltro === 'Soplado' ? opcionesSoplado.material : opcionesInyeccion.material}
                        onChange={(e) => {
                          if (procesoFiltro === 'Soplado') {
                            setOpcionesSoplado({...opcionesSoplado, material: e.target.value});
                          } else {
                            setOpcionesInyeccion({...opcionesInyeccion, material: e.target.value});
                          }
                        }}
                      />
                    </div>
                  </div>
                </div>

                {/* Tabla de componentes */}
                <div className="table-responsive">
                  <table className="table table-sm">
                    <thead>
                      <tr>
                        <th>Seleccionar</th>
                        <th>Componente</th>
                        <th>Peso Original</th>
                        <th>Peso Personalizado</th>
                        <th>Material</th>
                        <th>Precio Original</th>
                        <th>Precio Recalculado</th>
                      </tr>
                    </thead>
                    <tbody>
                      {getDesglosesProducto().map(desglose => {
                        const pesoPersonalizado = pesosPersonalizados[desglose.id] || desglose.peso;
                        const precioMostrar = desglose.recalculado ? desglose.precio : desglose.precio;
                        const producto = window.productosAgrupados.find(p => p.id === parseInt(selectedProducto));
                        const esSoplado = producto && producto.proceso === 'Soplado';
                        
                        return (
                          <tr key={desglose.id}>
                            <td>
                              <div className="form-check">
                                <input
                                  className="form-check-input"
                                  type="checkbox"
                                  id={`desglose-${desglose.id}`}
                                  checked={selectedDesgloses.includes(desglose.id)}
                                  onChange={(e) => handleDesgloseChange(desglose.id, e.target.checked)}
                                />
                              </div>
                            </td>
                            <td>
                              <strong>{desglose.nombre}</strong>
                            </td>
                            <td>
                              <span className="badge bg-secondary">{desglose.pesoOriginal || desglose.peso}g</span>
                            </td>
                            <td>
                              {esSoplado ? (
                                <input
                                  type="number"
                                  className="form-control form-control-sm"
                                  style={{width: '80px'}}
                                  value={pesoPersonalizado}
                                  onChange={(e) => handlePesoChange(desglose.id, e.target.value)}
                                  min="1"
                                />
                              ) : (
                                <span className="badge bg-warning">
                                  {pesoPersonalizado}g (Fijo)
                                </span>
                              )}
                            </td>
                            <td>
                              {(() => {
                                const materialPersonalizado = procesoFiltro === 'Soplado' ? opcionesSoplado.material : opcionesInyeccion.material;
                                const materialMostrar = materialPersonalizado || desglose.material;
                                const esPersonalizado = materialPersonalizado && materialPersonalizado !== desglose.material;
                                
                                return (
                                  <span className={`badge ${esPersonalizado ? 'bg-success' : 'bg-info'}`}>
                                    {materialMostrar}
                                    {esPersonalizado && <small className="d-block">Personalizado</small>}
                                  </span>
                                );
                              })()}
                            </td>
                            <td>
                              <small className="text-muted">
                                ${(desglose.precioOriginal || desglose.precio).toLocaleString('es-CO')}
                              </small>
                            </td>
                            <td>
                              <strong className={desglose.recalculado ? 'text-success' : ''}>
                                ${precioMostrar.toLocaleString('es-CO')}
                                {desglose.recalculado && <small className="text-success d-block">Recalculado</small>}
                              </strong>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          <button 
            type="button" 
            className="btn btn-primary" 
            onClick={agregarItem}
            disabled={!selectedProducto || selectedDesgloses.length === 0}
          >
            Agregar Producto
          </button>
        </div>
      </div>

      {/* Lista de items agregados */}
      {formData.items.length > 0 && (
        <div className="card mb-4">
          <div className="card-header">
            <h6 className="mb-0">Productos en la Cotización</h6>
          </div>
          <div className="card-body p-0">
            <div className="table-responsive">
              <table className="table table-sm mb-0">
                <thead className="table-light">
                  <tr>
                    <th>Producto</th>
                    <th>Cantidad</th>
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
                        <br />
                        <small className="text-muted">
                          {item.descripcionPersonalizada}
                        </small>
                      </td>
                      <td>{item.cantidad}</td>
                      <td className="text-end">${item.precio.toLocaleString('es-CO')}</td>
                      <td className="text-end fw-bold">${item.subtotal.toLocaleString('es-CO')}</td>
                      <td className="text-center">
                        <button
                          type="button"
                          className="btn btn-sm btn-outline-danger"
                          onClick={() => eliminarItem(item.id)}
                        >
                          <Trash2 size={14} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Descuentos e impuestos */}
      <div className="row g-3 mb-4">
        <div className="col-md-6">
          <label className="form-label">Descuento (%)</label>
          <input
            type="number"
            min="0"
            max="100"
            className="form-control"
            value={formData.descuento}
            onChange={(e) => setFormData({...formData, descuento: parseFloat(e.target.value) || 0})}
          />
        </div>
        <div className="col-md-6">
          <label className="form-label">IVA (%)</label>
          <input
            type="number"
            min="0"
            className="form-control"
            value={formData.impuesto}
            onChange={(e) => setFormData({...formData, impuesto: parseFloat(e.target.value) || 0})}
          />
        </div>
      </div>

      {/* Totales */}
      {formData.items.length > 0 && (
        <div className="card mb-4">
          <div className="card-body">
            <div className="row">
              <div className="col-md-8"></div>
              <div className="col-md-4">
                <table className="table table-sm">
                  <tbody>
                    <tr>
                      <td><strong>Subtotal:</strong></td>
                      <td className="text-end">${totales.subtotal.toLocaleString('es-CO')}</td>
                    </tr>
                    <tr>
                      <td><strong>Descuento ({formData.descuento}%):</strong></td>
                      <td className="text-end">-${totales.descuentoMonto.toLocaleString('es-CO')}</td>
                    </tr>
                    <tr>
                      <td><strong>Base Imponible:</strong></td>
                      <td className="text-end">${totales.baseImponible.toLocaleString('es-CO')}</td>
                    </tr>
                    <tr>
                      <td><strong>IVA ({formData.impuesto}%):</strong></td>
                      <td className="text-end">${totales.impuestoMonto.toLocaleString('es-CO')}</td>
                    </tr>
                    <tr className="table-active">
                      <td><strong>TOTAL:</strong></td>
                      <td className="text-end"><strong>${totales.total.toLocaleString('es-CO')}</strong></td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Botones */}
      <div className="d-flex gap-2">
        <button type="submit" className="btn btn-primary">
          {editingItem ? 'Actualizar' : 'Crear'} Cotización
        </button>
        <button type="button" className="btn btn-secondary" onClick={onCancel}>
          Cancelar
        </button>
      </div>
    </form>
  );
};

export default CotizacionForm;
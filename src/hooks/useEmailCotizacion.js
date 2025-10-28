// src/hooks/useEmailCotizacion.js
import { useState } from 'react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

export const useEmailCotizacion = (empresaConfig) => {
  const [isLoading, setIsLoading] = useState(false);

  // Función para generar PDF de la cotización
  const generarPDFParaEmail = async (cotizacion, cliente) => {
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
          <tbody>
            ${cotizacion.items.map((item, index) => {
              let filas = '';
              
              // Encabezado del producto
              filas += `
                <tr style="background-color: #f8f9fa;">
                  <td colspan="4" style="font-weight: bold; padding: 10px; border: 2px solid #dee2e6;">
                    PRODUCTO ${index + 1}: ${item.nombre.replace(/ \\(\\d+ componentes\\)/, '')}
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
                      • <strong>${item.nombre}</strong><br>
                      ${item.descripcionPersonalizada || item.descripcion || ''}
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

    // Crear una ventana temporal para generar el PDF
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = htmlContent;
    tempDiv.style.position = 'absolute';
    tempDiv.style.left = '-9999px';
    tempDiv.style.width = '800px';
    document.body.appendChild(tempDiv);

    try {
      // Generar canvas del HTML
      const canvas = await html2canvas(tempDiv, {
        scale: 2,
        useCORS: true,
        logging: false
      });

      // Crear PDF
      const pdf = new jsPDF('p', 'mm', 'a4');
      const imgData = canvas.toDataURL('image/png');
      const imgWidth = 210; // A4 width in mm
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
      
      // Guardar PDF como blob
      const pdfBlob = pdf.output('blob');
      
      // Limpiar el div temporal
      document.body.removeChild(tempDiv);
      
      return pdfBlob;
    } catch (error) {
      document.body.removeChild(tempDiv);
      throw error;
    }
  };

  const enviarCotizacion = async (cotizacion, cliente, cambiarEstadoCotizacion) => {
    setIsLoading(true);
    
    try {
      // Determinar email destino
      let emailDestino = '';
      let mensajeConfirmacion = '';
      
      if (cliente && cliente.email) {
        // Cliente tiene email registrado
        emailDestino = cliente.email;
        mensajeConfirmacion = `¿Enviar cotización ${cotizacion.numero} a: ${cliente.email}?`;
      } else {
        // Cliente sin email - abrir Gmail para que el vendedor ingrese el destino
        mensajeConfirmacion = `El cliente no tiene email registrado.\n¿Abrir Gmail para enviar cotización ${cotizacion.numero} manualmente?`;
      }

      // Mostrar confirmación
      const confirmar = window.confirm(mensajeConfirmacion);
      if (!confirmar) {
        setIsLoading(false);
        return;
      }

      // Generar PDF
      const pdfBlob = await generarPDFParaEmail(cotizacion, cliente);
      
      // Crear archivo temporal para descarga con nombre descriptivo
      const clienteNombreArchivo = cliente ? cliente.nombre.replace(/[^a-zA-Z0-9]/g, '_') : 'Cliente';
      const fecha = new Date(cotizacion.fecha).toISOString().split('T')[0];
      const nombreArchivo = `${clienteNombreArchivo}_${fecha}_${cotizacion.numero}.pdf`;

      const url = URL.createObjectURL(pdfBlob);
      const link = document.createElement('a');
      link.href = url;
      link.download = nombreArchivo;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);

      // Preparar datos para el email
      const asunto = `Cotización ${cotizacion.numero} - ${empresaConfig.nombre}`;
      const clienteNombre = cliente ? cliente.nombre : 'Cliente';
      const cuerpo = `Estimado/a ${clienteNombre},

Adjunto encontrará la cotización ${cotizacion.numero} solicitada.

Detalles de la cotización:
- Fecha: ${new Date(cotizacion.fecha).toLocaleDateString('es-ES')}
- Total: ${cotizacion.total.toLocaleString('es-CO')}
- Validez: ${cotizacion.validez} días

Para cualquier consulta, no dude en contactarnos.

Atentamente,
Carlos Montero
${empresaConfig.nombre}
Teléfono: 3208425008
Email: ventas@plastivalle.com`;

      // Abrir Gmail Web directamente
      const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(emailDestino)}&su=${encodeURIComponent(asunto)}&body=${encodeURIComponent(cuerpo)}`;
      
      // Abrir Gmail en nueva pestaña
      const gmailWindow = window.open(gmailUrl, '_blank', 'width=1024,height=768');
      
      if (!gmailWindow || gmailWindow.closed || typeof gmailWindow.closed === 'undefined') {
        // Si está bloqueado el popup, mostrar enlace manual
        alert(`Popup bloqueado. Haga clic en "OK" y luego en el enlace que aparecerá para abrir Gmail.`);
        
        // Crear enlace visible para el usuario
        const linkDiv = document.createElement('div');
        linkDiv.innerHTML = `
          <div style="position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%); 
                      background: white; padding: 20px; border: 2px solid #007bff; border-radius: 8px; 
                      box-shadow: 0 4px 12px rgba(0,0,0,0.3); z-index: 10000; text-align: center;">
            <h3>📧 Abrir Gmail</h3>
            <p>Haz clic en el enlace para componer el correo:</p>
            <a href="${gmailUrl}" target="_blank" style="display: inline-block; padding: 10px 20px; 
               background: #007bff; color: white; text-decoration: none; border-radius: 4px; margin: 10px;">
              🌐 Abrir Gmail Web
            </a>
            <br><br>
            <button onclick="this.parentElement.parentElement.remove()" 
                    style="padding: 5px 15px; background: #6c757d; color: white; border: none; border-radius: 4px;">
              Cerrar
            </button>
          </div>
        `;
        document.body.appendChild(linkDiv);
        
        // Auto-remover después de 30 segundos
        setTimeout(() => {
          if (document.body.contains(linkDiv)) {
            document.body.removeChild(linkDiv);
          }
        }, 30000);
      }

      // Cambiar estado de la cotización
      cambiarEstadoCotizacion(cotizacion.id, 'enviada');
      
      // Mostrar mensaje de éxito
      setTimeout(() => {
        if (emailDestino) {
          alert(`✅ PDF descargado exitosamente!\n🌐 Gmail abierto con el correo preparado para: ${emailDestino}\n\n📎 No olvides adjuntar el PDF descargado antes de enviar.`);
        } else {
          alert(`✅ PDF descargado exitosamente!\n🌐 Gmail abierto para enviar cotización\n\n📝 Ingresa el email del cliente en el campo "Para"\n📎 No olvides adjuntar el PDF descargado antes de enviar.`);
        }
      }, 1000);

    } catch (error) {
      console.error('Error al enviar cotización:', error);
      alert('Error al generar el PDF. Por favor, inténtelo de nuevo.');
    } finally {
      setIsLoading(false);
    }
  };

  return {
    enviarCotizacion,
    isLoading
  };
};
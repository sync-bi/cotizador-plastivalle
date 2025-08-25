// Servicio de envío de emails para cotizaciones

/**
 * Valida que un cliente tenga email válido
 * @param {Object} cliente - Objeto cliente
 * @returns {boolean} True si tiene email válido
 */
export const validarEmailCliente = (cliente) => {
  if (!cliente) {
    throw new Error('Cliente no encontrado');
  }
  
  if (!cliente.email || cliente.email.trim() === '') {
    throw new Error('El cliente no tiene email registrado');
  }
  
  // Validación básica de formato email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(cliente.email)) {
    throw new Error('El email del cliente no tiene un formato válido');
  }
  
  return true;
};

/**
 * Genera el contenido HTML del email para la cotización
 * @param {Object} cotizacion - Datos de la cotización
 * @param {Object} cliente - Datos del cliente
 * @param {Object} empresa - Datos de la empresa
 * @returns {string} HTML del email
 */
export const generarContenidoEmail = (cotizacion, cliente, empresa) => {
  const fechaFormateada = new Date(cotizacion.fecha).toLocaleDateString('es-CO', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <style>
        body { font-family: Arial, sans-serif; margin: 0; padding: 20px; background-color: #f5f5f5; }
        .container { max-width: 600px; margin: 0 auto; background-color: white; padding: 30px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); }
        .header { text-align: center; border-bottom: 3px solid #FF6B35; padding-bottom: 20px; margin-bottom: 30px; }
        .company-name { font-size: 24px; font-weight: bold; color: #333; margin: 0; }
        .content { line-height: 1.6; color: #333; }
        .cotizacion-info { background-color: #f8f9fa; padding: 15px; border-radius: 5px; margin: 20px 0; }
        .footer { text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #ddd; color: #666; font-size: 14px; }
        .btn { display: inline-block; padding: 12px 24px; background-color: #FF6B35; color: white; text-decoration: none; border-radius: 5px; font-weight: bold; margin: 10px 0; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1 class="company-name">${empresa.nombre}</h1>
          <p>${empresa.direccion}</p>
          <p>${empresa.telefono}</p>
          <p>${empresa.email}</p>
        </div>
        
        <div class="content">
          <h2>Estimado/a ${cliente.nombre},</h2>
          
          <p>Nos complace enviarle la cotización solicitada. A continuación encontrará los detalles:</p>
          
          <div class="cotizacion-info">
            <h3>Información de la Cotización</h3>
            <p><strong>Número:</strong> ${cotizacion.numero}</p>
            <p><strong>Fecha:</strong> ${fechaFormateada}</p>
            <p><strong>Validez:</strong> ${cotizacion.validez} días</p>
            <p><strong>Total:</strong> $${cotizacion.total ? cotizacion.total.toLocaleString('es-CO') : '0'}</p>
          </div>
          
          <p>Para revisar los detalles completos de los productos cotizados, por favor descargue el PDF adjunto.</p>
          
          <p>Si tiene alguna pregunta o necesita aclaraciones adicionales, no dude en contactarnos.</p>
          
          <p>Quedamos atentos a su respuesta.</p>
        </div>
        
        <div class="footer">
          <p><strong>Cordial saludo,</strong></p>
          <p><strong>Equipo Comercial</strong></p>
          <p>${empresa.nombre}</p>
          <p>${empresa.web}</p>
        </div>
      </div>
    </body>
    </html>
  `;
};

/**
 * Simula el envío de email (para reemplazar con servicio real)
 * @param {Object} datosEmail - Datos del email a enviar
 * @returns {Promise} Promesa que resuelve si el envío es exitoso
 */
export const simularEnvioEmail = async (datosEmail) => {
  // Simular tiempo de envío
  await new Promise(resolve => setTimeout(resolve, 1500));
  
  // Simular éxito/fallo aleatorio (90% éxito)
  if (Math.random() > 0.1) {
    return {
      success: true,
      messageId: `email-${Date.now()}`,
      timestamp: new Date().toISOString()
    };
  } else {
    throw new Error('Error simulado en el envío del email');
  }
};

/**
 * Función principal para enviar cotización por email
 * @param {Object} cotizacion - Datos de la cotización
 * @param {Object} cliente - Datos del cliente
 * @param {Object} empresa - Datos de la empresa
 * @returns {Promise} Resultado del envío
 */
export const enviarCotizacionPorEmail = async (cotizacion, cliente, empresa) => {
  try {
    // 1. Validar cliente y email
    validarEmailCliente(cliente);
    
    // 2. Generar contenido del email
    const contenidoHTML = generarContenidoEmail(cotizacion, cliente, empresa);
    
    // 3. Preparar datos del email
    const datosEmail = {
      to: cliente.email,
      subject: `Cotización ${cotizacion.numero} - ${empresa.nombre}`,
      html: contenidoHTML,
      from: empresa.email,
      cotizacion: cotizacion
    };
    
    // 4. Enviar email (por ahora simulado)
    const resultado = await simularEnvioEmail(datosEmail);
    
    return {
      success: true,
      message: `Cotización enviada exitosamente a ${cliente.email}`,
      data: resultado
    };
    
  } catch (error) {
    return {
      success: false,
      message: error.message,
      error: error
    };
  }
};

/**
 * Integración con EmailJS (comentado para implementar cuando sea necesario)
 */
/*
import emailjs from 'emailjs-com';

export const enviarConEmailJS = async (cotizacion, cliente, empresa) => {
  try {
    const templateParams = {
      to_email: cliente.email,
      to_name: cliente.nombre,
      company_name: empresa.nombre,
      cotizacion_numero: cotizacion.numero,
      cotizacion_total: cotizacion.total.toLocaleString('es-CO'),
      fecha: new Date(cotizacion.fecha).toLocaleDateString('es-CO'),
      validez: cotizacion.validez
    };

    const result = await emailjs.send(
      'YOUR_SERVICE_ID',
      'YOUR_TEMPLATE_ID', 
      templateParams,
      'YOUR_PUBLIC_KEY'
    );

    return { success: true, data: result };
  } catch (error) {
    return { success: false, error: error };
  }
};
*/
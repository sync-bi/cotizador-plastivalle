// Hook personalizado para manejo de envío de cotizaciones por email

import { useState } from 'react';
import { enviarCotizacionPorEmail } from '../services/emailService';

export const useEmailCotizacion = (empresaConfig) => {
  const [isLoading, setIsLoading] = useState(false);
  const [lastEmailSent, setLastEmailSent] = useState(null);

  /**
   * Envía una cotización por email y actualiza el estado
   * @param {Object} cotizacion - Datos de la cotización
   * @param {Object} cliente - Datos del cliente
   * @param {Function} onEstadoCambiado - Callback para cambiar estado
   * @returns {Promise<boolean>} True si se envió correctamente
   */
  const enviarCotizacion = async (cotizacion, cliente, onEstadoCambiado) => {
    setIsLoading(true);
    
    try {
      // Mostrar confirmación al usuario
      const confirmacion = window.confirm(
        `¿Enviar cotización ${cotizacion.numero} a:\n${cliente.email || 'Email no registrado'}?`
      );

      if (!confirmacion) {
        setIsLoading(false);
        return false;
      }

      // Intentar enviar el email
      const resultado = await enviarCotizacionPorEmail(cotizacion, cliente, empresaConfig);

      if (resultado.success) {
        // Cambiar estado a "enviada"
        if (onEstadoCambiado) {
          onEstadoCambiado(cotizacion.id, 'enviada');
        }

        // Guardar información del último envío
        setLastEmailSent({
          cotizacionId: cotizacion.id,
          email: cliente.email,
          timestamp: new Date(),
          resultado: resultado.data
        });

        // Mostrar mensaje de éxito
        alert(`✅ ${resultado.message}`);
        
        return true;
      } else {
        // Mostrar error
        alert(`❌ Error: ${resultado.message}`);
        return false;
      }

    } catch (error) {
      alert(`❌ Error inesperado: ${error.message}`);
      console.error('Error en envío de email:', error);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Verifica si una cotización ya fue enviada recientemente
   * @param {number} cotizacionId - ID de la cotización
   * @returns {boolean} True si fue enviada en los últimos 30 minutos
   */
  const fueEnviadaRecientemente = (cotizacionId) => {
    if (!lastEmailSent || lastEmailSent.cotizacionId !== cotizacionId) {
      return false;
    }

    const tiempoTranscurrido = Date.now() - lastEmailSent.timestamp.getTime();
    const treintaMinutos = 30 * 60 * 1000;

    return tiempoTranscurrido < treintaMinutos;
  };

  /**
   * Resetea el estado de envío
   */
  const resetearEstado = () => {
    setLastEmailSent(null);
    setIsLoading(false);
  };

  return {
    enviarCotizacion,
    isLoading,
    lastEmailSent,
    fueEnviadaRecientemente,
    resetearEstado
  };
};
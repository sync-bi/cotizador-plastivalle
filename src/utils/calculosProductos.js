// Sistema de cálculo dinámico basado en el Excel de PLASTIVALLE

// Valores fijos del Excel
export const MATERIALES = {
  PEAD: 'PEAD',
  PP: 'PP',
  TPE: 'TPE',
  'M/B': 'M/B',
  'CAR DE C': 'CAR DE C',
  PELD: 'PELD',
  'MODIFICADOR DE IMPACTO': 'MODIFICADOR DE IMPACTO'
};

export const COSTOS_MATERIALES = {
  PEAD: 8.5,      // L6
  PP: 10.2,       // M6
  TPE: 19.25,     // N6
  'M/B': 15,      // O6
  'CAR DE C': 5,  // P6
  PELD: 8.5,      // Q6
  'MODIFICADOR DE IMPACTO': 29.2  // R6
};

export const VALORES_FIJOS = {
  U6: 6.900962211903085,
  V6: 9.934435548668505,
  K6: 0.025
};

/**
 * Calcula el costo de material para un desglose específico
 * @param {number} gramos - Peso en gramos
 * @param {string} material - Material del desglose
 * @returns {Object} Costos calculados por material
 */
export const calcularCostosMateriales = (gramos, material) => {
  const costos = {
    PEAD: 0,    // L
    PP: 0,      // M
    TPE: 0,     // N
    'M/B': 0,   // O - Siempre se calcula
    'CAR DE C': 0,  // P
    PELD: 0,    // Q
    'MODIFICADOR DE IMPACTO': 0  // R
  };

  // M/B siempre se aplica independientemente del material
  costos['M/B'] = (gramos * 2.5 / 100) * COSTOS_MATERIALES['M/B'];

  // Cálculo por material específico
  if (material === MATERIALES.PEAD) {
    costos.PEAD = (gramos * 97.5 / 100) * COSTOS_MATERIALES.PEAD;
  } else if (material === MATERIALES.PP) {
    costos.PP = (gramos * 97.5 / 100) * COSTOS_MATERIALES.PP;
  } else if (material === MATERIALES.TPE) {
    costos.TPE = (gramos * 97.5 / 100) * COSTOS_MATERIALES.TPE;
  } else if (material === MATERIALES['CAR DE C']) {
    costos['CAR DE C'] = (gramos * 97.5 / 100) * COSTOS_MATERIALES['CAR DE C'];
  } else if (material === MATERIALES.PELD) {
    // PELD usa 100% en lugar de 97.5%
    costos.PELD = (gramos * 100 / 100) * COSTOS_MATERIALES.PELD;
  } else if (material === MATERIALES['MODIFICADOR DE IMPACTO']) {
    costos['MODIFICADOR DE IMPACTO'] = (gramos * 97.5 / 100) * COSTOS_MATERIALES['MODIFICADOR DE IMPACTO'];
  }

  return costos;
};

/**
 * Calcula K7 basado en ciclos (fórmula: (ciclos * 0.025) + ciclos)
 * @param {number} ciclos - Número de ciclos
 * @returns {number} Valor K7 calculado
 */
export const calcularK7 = (ciclos) => {
  return (ciclos * VALORES_FIJOS.K6) + ciclos;
};

/**
 * Calcula los costos adicionales U y V
 * @param {number} k7 - Valor K7 calculado
 * @returns {Object} Costos U y V
 */
export const calcularCostosAdicionales = (k7) => {
  return {
    U: VALORES_FIJOS.U6 * k7,
    V: VALORES_FIJOS.V6 * k7
  };
};

/**
 * Calcula el precio total de un desglose con peso personalizado
 * @param {Object} desglose - Desglose original
 * @param {number} nuevoPeso - Nuevo peso en gramos
 * @param {number} ciclos - Ciclos (por defecto 22)
 * @returns {Object} Precio recalculado y detalles
 */
export const calcularPrecioConPesoPersonalizado = (desglose, nuevoPeso, ciclos = 22) => {
  const gramos = nuevoPeso || desglose.peso;
  const material = desglose.material;
  
  // Calcular costos por material
  const costosMateriales = calcularCostosMateriales(gramos, material);
  
  // Calcular K7
  const k7 = calcularK7(ciclos);
  
  // Calcular costos adicionales
  const costosAdicionales = calcularCostosAdicionales(k7);
  
  // Sumar todos los costos (equivalente a columna W)
  const costoTotal = 
    costosMateriales.PEAD +
    costosMateriales.PP +
    costosMateriales.TPE +
    costosMateriales['M/B'] +
    costosMateriales['CAR DE C'] +
    costosMateriales.PELD +
    costosMateriales['MODIFICADOR DE IMPACTO'] +
    costosAdicionales.U +
    costosAdicionales.V;
  
  // El precio final incluye márgenes (aproximadamente el precio original ajustado proporcionalmente)
  const factorCambio = gramos / desglose.peso;
  const precioFinal = desglose.precio * factorCambio;
  
  return {
    pesoOriginal: desglose.peso,
    pesoNuevo: gramos,
    precioOriginal: desglose.precio,
    precioNuevo: precioFinal,
    factorCambio: factorCambio,
    detalleCalculo: {
      costosMateriales,
      costosAdicionales,
      costoTotal,
      k7
    }
  };
};

/**
 * Recalcula todos los desgloses de un producto con pesos personalizados
 * @param {Array} desgloses - Array de desgloses
 * @param {Object} pesosPersonalizados - Objeto con pesos personalizados {id: peso}
 * @returns {Array} Desgloses con precios recalculados
 */
export const recalcularDesglosesConPesos = (desgloses, pesosPersonalizados) => {
  return desgloses.map(desglose => {
    const pesoPersonalizado = pesosPersonalizados[desglose.id];
    
    if (pesoPersonalizado && pesoPersonalizado !== desglose.peso) {
      const calculoNuevo = calcularPrecioConPesoPersonalizado(desglose, pesoPersonalizado);
      
      return {
        ...desglose,
        peso: calculoNuevo.pesoNuevo,
        precio: calculoNuevo.precioNuevo,
        precioOriginal: calculoNuevo.precioOriginal,
        pesoOriginal: calculoNuevo.pesoOriginal,
        recalculado: true,
        detalleCalculo: calculoNuevo.detalleCalculo
      };
    }
    
    return {
      ...desglose,
      recalculado: false
    };
  });
};
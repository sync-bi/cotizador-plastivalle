// Script para agregar datos de usuarios a Firestore
const { initializeApp } = require('firebase/app');
const { getFirestore, doc, setDoc } = require('firebase/firestore');

// Configuración de Firebase
const firebaseConfig = {
  apiKey: "AIzaSyD9uTLCNIHiK2xmqr0kqSILPgQFZP5cXro",
  authDomain: "plastivalle-cotizador.firebaseapp.com",
  projectId: "plastivalle-cotizador",
  storageBucket: "plastivalle-cotizador.firebasestorage.app",
  messagingSenderId: "103552632896",
  appId: "1:103552632896:web:dd20348c0c5c3baf64b925"
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Mapeo de UID con datos de usuarios
const usuariosData = [
  {
    uid: 'Uj8Xm55yxaUGHbNWTIph0uLiFp72',
    email: 'ventas2@plastivalle.com',
    nombre: 'Clemencia Basto',
    cargo: 'Ventas 2',
    telefono: '3134612909',
    role: 'vendedor'
  },
  {
    uid: 'r6JXwHAFtdWQTVo3VqFG6B8g3uq2',
    email: 'ventas3@plastivalle.com',
    nombre: 'Mary Luz Hernandez',
    cargo: 'Ventas 3',
    telefono: '3104800912',
    role: 'vendedor'
  },
  {
    uid: 'KITJArn140RNpXW6WAnCb9kVgZD3',
    email: 'ventas@plastivalle.com',
    nombre: 'Angie Ramirez',
    cargo: 'Punto de Venta',
    telefono: '3208425008',
    role: 'vendedor'
  },
  {
    uid: 'yWeOgOXXxaUSfysjWQejIrUCNMV2',
    email: 'losenvases@gmail.com',
    nombre: 'Juan Guillermo Ossa',
    cargo: 'Free Lance',
    telefono: '3102131493',
    role: 'vendedor'
  },
  {
    uid: 'DqDeyb44FAPDdr5iODTncHMCBlk1',
    email: 'gerencia@plastivalle.com',
    nombre: 'Carlos Ossa',
    cargo: 'Ventas Gerenciales',
    telefono: '3107861932',
    role: 'vendedor'
  },
  {
    uid: 'Qb5EAAcKkFYC6UajQorVuSooXGC2',
    email: 'ventas4.plastivalle@gmail.com',
    nombre: 'Juan Manuel Cardozo',
    cargo: 'Ventas 4',
    telefono: '3126384818',
    role: 'vendedor'
  },
  {
    uid: 'jtTyOWO0uqgeEFLRkIpEK6UOaWH2',
    email: 'administracion@plastivalle.com',
    nombre: 'Oscar Carrillo',
    cargo: 'Administración',
    telefono: '3143607707',
    role: 'admin'
  },
  {
    uid: 'ycdHgIqzDRYOG5KCaUsrTD6AQGc2',
    email: 'tesoreria@plastivalle.com',
    nombre: 'Jessica Sanchez',
    cargo: 'Tesorería',
    telefono: '3193211387',
    role: 'vendedor'
  }
];

async function agregarDatosUsuarios() {
  console.log('Iniciando proceso de agregar datos a Firestore...\n');

  for (const usuario of usuariosData) {
    try {
      await setDoc(doc(db, 'usuarios', usuario.uid), {
        email: usuario.email,
        nombre: usuario.nombre,
        cargo: usuario.cargo,
        telefono: usuario.telefono,
        role: usuario.role,
        fechaCreacion: new Date().toISOString()
      });

      console.log(`✅ Datos guardados para: ${usuario.nombre} (${usuario.email})`);
      console.log(`   Role: ${usuario.role}`);
      console.log(`   UID: ${usuario.uid}\n`);

    } catch (error) {
      console.error(`❌ Error al guardar datos de ${usuario.email}:`, error.message, '\n');
    }
  }

  console.log('=== PROCESO COMPLETADO ===');
  console.log(`Total usuarios procesados: ${usuariosData.length}`);
  console.log('\nAhora puedes iniciar sesión con:');
  console.log('- Email: cualquiera de los emails listados arriba');
  console.log('- Contraseña: plastivalle2025');
  console.log('\nUsuario administrador: administracion@plastivalle.com');

  process.exit(0);
}

agregarDatosUsuarios();

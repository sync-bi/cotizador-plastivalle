// Script para crear usuarios en Firebase
const { initializeApp } = require('firebase/app');
const { getAuth, createUserWithEmailAndPassword } = require('firebase/auth');
const { getFirestore, doc, setDoc } = require('firebase/firestore');

// Configuración de Firebase (la misma que en tu archivo firebase.js)
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
const auth = getAuth(app);
const db = getFirestore(app);

// Lista de usuarios a crear
const usuarios = [
  {
    email: 'ventas2@plastivalle.com',
    nombre: 'Clemencia Basto',
    cargo: 'Ventas 2',
    telefono: '3134612909',
    role: 'vendedor'
  },
  {
    email: 'ventas3@plastivalle.com',
    nombre: 'Mary Luz Hernandez',
    cargo: 'Ventas 3',
    telefono: '3104800912',
    role: 'vendedor'
  },
  {
    email: 'ventas@plastivalle.com',
    nombre: 'Angie Ramirez',
    cargo: 'Punto de Venta',
    telefono: '3208425008',
    role: 'vendedor'
  },
  {
    email: 'losenvases@gmail.com',
    nombre: 'Juan Guillermo Ossa',
    cargo: 'Free Lance',
    telefono: '3102131493',
    role: 'vendedor'
  },
  {
    email: 'gerencia@plastivalle.com',
    nombre: 'Carlos Ossa',
    cargo: 'Ventas Gerenciales',
    telefono: '3107861932',
    role: 'vendedor'
  },
  {
    email: 'ventas4.plastivalle@gmail.com',
    nombre: 'Juan Manuel Cardozo',
    cargo: 'Ventas 4',
    telefono: '3126384818',
    role: 'vendedor'
  },
  {
    email: 'administracion@plastivalle.com',
    nombre: 'Oscar Carrillo',
    cargo: 'Administración',
    telefono: '3143607707',
    role: 'admin'
  },
  {
    email: 'tesoreria@plastivalle.com',
    nombre: 'Jessica Sanchez',
    cargo: 'Tesorería',
    telefono: '3193211387',
    role: 'vendedor'
  }
];

const PASSWORD = 'plastivalle2025';

async function crearUsuarios() {
  console.log('Iniciando creación de usuarios...\n');

  for (const usuario of usuarios) {
    try {
      // Crear usuario en Firebase Authentication
      const userCredential = await createUserWithEmailAndPassword(auth, usuario.email, PASSWORD);
      const uid = userCredential.user.uid;

      console.log(`✅ Usuario de autenticación creado: ${usuario.email}`);

      // Guardar datos adicionales en Firestore
      await setDoc(doc(db, 'usuarios', uid), {
        email: usuario.email,
        nombre: usuario.nombre,
        cargo: usuario.cargo,
        telefono: usuario.telefono,
        role: usuario.role,
        fechaCreacion: new Date().toISOString()
      });

      console.log(`✅ Datos guardados en Firestore para: ${usuario.nombre}`);
      console.log(`   Role: ${usuario.role}\n`);

    } catch (error) {
      if (error.code === 'auth/email-already-in-use') {
        console.log(`⚠️  El usuario ${usuario.email} ya existe, omitiendo...\n`);
      } else {
        console.error(`❌ Error al crear usuario ${usuario.email}:`, error.message, '\n');
      }
    }
  }

  console.log('Proceso completado!');
  console.log('\n=== RESUMEN ===');
  console.log(`Total usuarios: ${usuarios.length}`);
  console.log('Contraseña genérica para todos: plastivalle2025');
  console.log(`Usuario administrador: administracion@plastivalle.com`);

  process.exit(0);
}

crearUsuarios();

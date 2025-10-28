// Configuración y servicios de Firebase
import { initializeApp } from 'firebase/app';
import {
  getFirestore,
  collection,
  getDocs,
  getDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  doc
} from 'firebase/firestore';

// Configuración de Firebase
const firebaseConfig = {
  apiKey: "AIzaSyDSn00AzU7a3W_fc1mpblhkp5TkQP0ddCM",
  authDomain: "cotizador-plastivalle.firebaseapp.com",
  projectId: "cotizador-plastivalle",
  storageBucket: "cotizador-plastivalle.firebasestorage.app",
  messagingSenderId: "38769542651",
  appId: "1:38769542651:web:fbf19300e33b3628cd775e",
  measurementId: "G-YJCKVE16KL"
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Helper para convertir documentos de Firestore a objetos con id
const docToObject = (doc) => ({
  id: doc.id,
  ...doc.data()
});

// ===== CLIENTES =====
export const clientesAPI = {
  // Obtener todos los clientes
  getAll: async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'clientes'));
      return querySnapshot.docs.map(docToObject);
    } catch (error) {
      console.error('Error al obtener clientes:', error);
      throw new Error('Error al cargar clientes: ' + error.message);
    }
  },

  // Obtener un cliente por ID
  getById: async (id) => {
    try {
      const docRef = doc(db, 'clientes', id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        return docToObject(docSnap);
      } else {
        throw new Error('Cliente no encontrado');
      }
    } catch (error) {
      console.error('Error al obtener cliente:', error);
      throw new Error('Error al cargar cliente: ' + error.message);
    }
  },

  // Crear un nuevo cliente
  create: async (cliente) => {
    try {
      const docRef = await addDoc(collection(db, 'clientes'), cliente);
      return { id: docRef.id, ...cliente };
    } catch (error) {
      console.error('Error al crear cliente:', error);
      throw new Error('Error al crear cliente: ' + error.message);
    }
  },

  // Actualizar un cliente
  update: async (id, cliente) => {
    try {
      const docRef = doc(db, 'clientes', id);
      // Remover el id del objeto antes de actualizar
      const { id: _, ...clienteData } = cliente;
      await updateDoc(docRef, clienteData);
      return { id, ...clienteData };
    } catch (error) {
      console.error('Error al actualizar cliente:', error);
      throw new Error('Error al actualizar cliente: ' + error.message);
    }
  },

  // Eliminar un cliente
  delete: async (id) => {
    try {
      await deleteDoc(doc(db, 'clientes', id));
      return { success: true };
    } catch (error) {
      console.error('Error al eliminar cliente:', error);
      throw new Error('Error al eliminar cliente: ' + error.message);
    }
  }
};

// ===== PRODUCTOS =====
export const productosAPI = {
  // Obtener todos los productos
  getAll: async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'productos'));
      return querySnapshot.docs.map(docToObject);
    } catch (error) {
      console.error('Error al obtener productos:', error);
      throw new Error('Error al cargar productos: ' + error.message);
    }
  },

  // Obtener un producto por ID
  getById: async (id) => {
    try {
      const docRef = doc(db, 'productos', id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        return docToObject(docSnap);
      } else {
        throw new Error('Producto no encontrado');
      }
    } catch (error) {
      console.error('Error al obtener producto:', error);
      throw new Error('Error al cargar producto: ' + error.message);
    }
  },

  // Crear un nuevo producto
  create: async (producto) => {
    try {
      const docRef = await addDoc(collection(db, 'productos'), producto);
      return { id: docRef.id, ...producto };
    } catch (error) {
      console.error('Error al crear producto:', error);
      throw new Error('Error al crear producto: ' + error.message);
    }
  },

  // Actualizar un producto
  update: async (id, producto) => {
    try {
      const docRef = doc(db, 'productos', id);
      // Remover el id del objeto antes de actualizar
      const { id: _, ...productoData } = producto;
      await updateDoc(docRef, productoData);
      return { id, ...productoData };
    } catch (error) {
      console.error('Error al actualizar producto:', error);
      throw new Error('Error al actualizar producto: ' + error.message);
    }
  },

  // Eliminar un producto
  delete: async (id) => {
    try {
      await deleteDoc(doc(db, 'productos', id));
      return { success: true };
    } catch (error) {
      console.error('Error al eliminar producto:', error);
      throw new Error('Error al eliminar producto: ' + error.message);
    }
  }
};

// ===== COTIZACIONES =====
export const cotizacionesAPI = {
  // Obtener todas las cotizaciones
  getAll: async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'cotizaciones'));
      return querySnapshot.docs.map(docToObject);
    } catch (error) {
      console.error('Error al obtener cotizaciones:', error);
      throw new Error('Error al cargar cotizaciones: ' + error.message);
    }
  },

  // Obtener una cotización por ID
  getById: async (id) => {
    try {
      const docRef = doc(db, 'cotizaciones', id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        return docToObject(docSnap);
      } else {
        throw new Error('Cotización no encontrada');
      }
    } catch (error) {
      console.error('Error al obtener cotización:', error);
      throw new Error('Error al cargar cotización: ' + error.message);
    }
  },

  // Crear una nueva cotización
  create: async (cotizacion) => {
    try {
      const docRef = await addDoc(collection(db, 'cotizaciones'), cotizacion);
      return { id: docRef.id, ...cotizacion };
    } catch (error) {
      console.error('Error al crear cotización:', error);
      throw new Error('Error al crear cotización: ' + error.message);
    }
  },

  // Actualizar una cotización
  update: async (id, cotizacion) => {
    try {
      const docRef = doc(db, 'cotizaciones', id);
      // Remover el id del objeto antes de actualizar
      const { id: _, ...cotizacionData } = cotizacion;
      await updateDoc(docRef, cotizacionData);
      return { id, ...cotizacionData };
    } catch (error) {
      console.error('Error al actualizar cotización:', error);
      throw new Error('Error al actualizar cotización: ' + error.message);
    }
  },

  // Eliminar una cotización
  delete: async (id) => {
    try {
      await deleteDoc(doc(db, 'cotizaciones', id));
      return { success: true };
    } catch (error) {
      console.error('Error al eliminar cotización:', error);
      throw new Error('Error al eliminar cotización: ' + error.message);
    }
  }
};

export { db };

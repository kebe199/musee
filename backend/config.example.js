// Configuration du Musée des Civilisations Noires
module.exports = {
  // Configuration du serveur
  PORT: process.env.PORT || 4000,
  FRONTEND_BASE: process.env.FRONTEND_BASE || 'http://localhost:3000',
  
  // Configuration CORS
  CORS_ORIGIN: process.env.CORS_ORIGIN || 'http://localhost:3000',
  
  // Configuration de la base de données (pour extension future)
  DATABASE: {
    HOST: process.env.DB_HOST || 'localhost',
    PORT: process.env.DB_PORT || 3306,
    NAME: process.env.DB_NAME || 'musee_civilisations_noires',
    USER: process.env.DB_USER || 'root',
    PASSWORD: process.env.DB_PASSWORD || ''
  },
  
  // Configuration JWT (pour authentification future)
  JWT: {
    SECRET: process.env.JWT_SECRET || 'your-secret-key-here',
    EXPIRES_IN: '24h'
  },
  
  // Configuration des médias
  MEDIA: {
    UPLOAD_PATH: './public/media',
    QRCODE_PATH: './public/qrcodes',
    MAX_FILE_SIZE: '10MB'
  }
};

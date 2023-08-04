import  jwt from'jsonwebtoken';
import bcrypt from'bcryptjs';
const secretKey = 'tu_clave_secreta'; // Reemplaza esto con una clave secreta segura





export async function login( data){
   const username= data.username;
    const password=data.password; 

    // Aquí debes verificar el usuario y la contraseña en tu base de datos o donde sea que los almacenes
    // Por ejemplo, podrías tener un modelo de usuarios en Mongoose y buscar el usuario por su nombre de usuario
  
    // Supongamos que el usuario y la contraseña son válidos
    // Aquí deberías obtener el ID del usuario o cualquier otra información relevante para incluir en el JWT
    const userId = 'usuario_id';
    const userData = { id: userId, username: username }; // Puedes agregar más información aquí si es necesario
  
    // Genera el JWT
    jwt.sign(userData, secretKey, { expiresIn: '1h' }, (err, token) => {
      if (err) {
        console.error('Error al generar el JWT:', err);
        return {error: 'Error interno del servidor'};
      }
      // Envía el JWT como respuesta al cliente
      return token ;
    });

}

import Mongoose from 'mongoose';
import fs from 'fs';

Mongoose.connect('mongodb://127.0.0.1/nueva');
const schema = new Mongoose.Schema({
  nombre: { type: String, required: true },
  dirrecion: { type: String, required: true },
  fecha: { type: String, required: true },
  mimetype: { type: String, required: true}
});

let imagen=Mongoose.model('imagenes',schema);

export function addMongo(_imagen){

// Paso 1: Definir el esquema

  imagen= Mongoose.model('imagenes', schema);
const Nuevaimagen = new imagen({
  nombre: _imagen.nombre,
  dirrecion: _imagen.dirrecion,
  fecha: _imagen.fecha,
  mimetype:_imagen.mimetype
});

// Paso 4: Guardar la instancia en la base de datos
Nuevaimagen.save()
  .then(resultado => {
    console.log('Registro insertado:', resultado);
  })
  .catch(error => {
    console.error('Error al insertar el registro:', error);
  });
}
async function getImagenesMongo(page){return await imagen.find({}).limit(page*5);}
  

export async function getImagenes( page) {
  try {
    const data = await getImagenesMongo(page);
    let dataReturn = [];

    for (const element of data) {
      const item = {
        nombre: element.nombre,
        fecha: element.fecha,
        mimetype: element.mimetype
      };

      try {
        // Leer el archivo como un buffer usando fs.readFile
        const archivoBuffer =fs.readFileSync('./images/'+element.dirrecion);

        // Convertir el buffer en una cadena base64
        const archivoBase64 = archivoBuffer.toString('base64');

        // Asignar el archivo en base64 al objeto item
        item.archivo = archivoBase64;
      } catch (err) {
        console.error('Error al leer el archivo:', err);
        item.error = 'Error al leer el archivo';
      }

      dataReturn.push(item);
    }

    return dataReturn;
  } catch (error) {
    console.error('Error al obtener las imágenes:', error);
    throw error;
  }
}



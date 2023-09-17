import  multer from 'multer' ;
import imagen from '../models/mongoImagenes.js';
import db from '../db/mongoose.js';
import fs from 'fs';
import {getShare} from '../controllers/Cshare.js';
let _imagen={};
export const path=`C:/Users/luis.carretero_bluet/Desktop/procts/gestor-archivos/gestor-archivos/server/src/`;

  const storage = multer.diskStorage(
    {
        destination:path+`temp/`,
        filename: function (req, file, cb ) {
          console.log('En la imagen:',req.body);
          let dir=Date.now();
            cb( null,dir+ file.originalname );

            _imagen={
                dirrecion:dir+ file.originalname,
              fecha: new Date().toJSON().slice(0, 10),
              mimetype:file.mimetype
            };
        }
    }
  );
export const upload= multer({storage:storage});

export async function addMongo(user){
    console.log(user);
    mvFile(user.userId)
    const Nuevaimagen = new imagen({
        nombre:String(user.nombre),
        dirrecion: _imagen.dirrecion,
        fecha: _imagen.fecha,
        mimetype:_imagen.mimetype,
        idusuario:user.userId,
        rol:1
      });
    Nuevaimagen.save().then((respuesta)=>{
    console.log(respuesta)
    });
}
function  mvFile(folder){

    if (!fs.existsSync(path+folder)) {
       createFolder(path+'files/'+folder);
      }
      const sourcePath=path+'temp/'+_imagen.dirrecion;
      const targetPath=path+'files/'+folder+'/'+_imagen.dirrecion;
      fs.rename(sourcePath,targetPath, (err) => {
          if (err) {
            console.error('Error al mover el archivo:', err);
          } else {
            console.log('Archivo movido exitosamente');
          }
        });
}

function createFolder(folderPath){
    fs.mkdir(folderPath, (err) => {
        if (err) {
          console.error('Error al crear la carpeta:', err);
        } else {
          console.log('Carpeta creada exitosamente');
        }
      });
}

export async function findUser(idusuario){
    try {
        const filtro = { idusuario:idusuario,rol:1 }; 
        const data = await imagen.find(filtro,).then((respuesta)=>
            {
              console.error(respuesta);
              return respuesta;
                });
        let dataReturn = [];
    
        for (const element of data) {
          const item = {
            nombre: element.nombre,
            fecha: element.fecha,
            mimetype: element.mimetype,
            id:element.dirrecion
          };
    
          try {
            // Leer el archivo como un buffer usando fs.readFile
            const archivoBuffer =fs.readFileSync(path+"files"+'/'+idusuario+'/'+element.dirrecion);
    
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
        console.error('Error al obtener los archivos:', error);
        throw error;
      }


}
export async function _getShare(idusuario){
    return await getShare(idusuario);
}


export async function rmFile(idusuario,idFile){
    console.log(idFile)
    const filePath=path+'files/'+idusuario+'/'+idFile;
    fs.unlink(filePath, (err) => {
        if (err) {
          console.error('Error al eliminar el archivo:', err);
        } else {
          console.log('Archivo eliminado exitosamente');
        }
    });
    imagen.deleteOne({dirrecion:idFile,idusuario:idusuario}).then(()=>{
        console.log("Eliminado Correctamente");
    });
    return {Response:'Archivo Eliminado exitosamente'};
}
export async function rmAllFiles(idusuario,res){
  const filtro = { idusuario:idusuario }; 

  const data = await imagen.find(filtro,).then((respuesta)=>
  {
    console.error(respuesta);
    return respuesta;
      });

    data.forEach((item)=>{
      const filePath=path+'files/'+idusuario+'/'+item.dirrecion;
      fs.unlink(filePath, (err) => {
          if (err) {
            console.error('Error al eliminar el archivo:', err);
          } else {
            console.log('Archivo eliminado exitosamente');
          }
      });
    })
    return imagen.deleteMany({idusuario:idusuario}).then(()=>{
    //res.status(200);
    return {response:"eliminados todos los archivos"};
});
}
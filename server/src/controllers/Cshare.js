import imagen  from "../models/mongoImagenes.js";
import notificaicon from "../models/notificaciones.js";
import fs from "fs-extra";
import {path} from "../controllers/Cfiles.js";



export async function notify(idFile,idusuario){

  const notify = new notificaicon({
    idusuario:idusuario,
    dirrecion:idFile,
    message:"Solicitud De compartir"
  });

  return await notify.save();
}
export  async  function share(idFile,idusuario){

    return imagen.findOne({dirrecion:idFile}).then(
        (fileToShare)=>{
        const fileShare= new imagen({
        nombre:fileToShare.nombre,
        dirrecion: fileToShare.dirrecion,
        fecha: fileToShare.fecha,
        mimetype:fileToShare.mimetype,
        idusuario:idusuario,
        rol:2})
       return fileShare.save();
    }).catch((error)=>{return {response:error}})    

}

export async function rmShare(idFile,idusuario){

    const filter={idusuario:idusuario,rol:2,dirrecion:idFile};
    return imagen.deleteMany(filter).then(()=>{return {response:"Eliminado Correctamente"}});

}
export async function getShare(idusuario){
    try {
        const filtro = { idusuario:idusuario,rol:2}; 
        const data = await imagen.find(filtro,).then((respuesta)=>
            {
            return respuesta;
            });
        let dataReturn = [];
    
        for (const element of data) {
        dataReturn.push(await imagen.findOne({dirrecion:element.dirrecion,rol:1}).then((proFile)=>{
            const item = {
            nombre: element.nombre,
            fecha: element.fecha,
            mimetype: element.mimetype,
            id:element.dirrecion
          };
    
          try {
            const archivoBuffer =fs.readFileSync(path+"files"+'/'+proFile.idusuario+'/'+element.dirrecion);
    
            // Convertir el buffer en una cadena base64
            const archivoBase64 = archivoBuffer.toString('base64');
    
            // Asignar el archivo en base64 al objeto item
            item.archivo = archivoBase64;
          } catch (err) {
            console.error('Error al leer el archivo:', err);
            item.error = 'Error al leer el archivo';
          }
          return item;
        }
        )
        )
        }
        return dataReturn;
      } catch (error) {
        console.error('Error al obtener los archivos:', error);
        return error;
      };
    }


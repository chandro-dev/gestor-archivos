import { addMongo , getImagenes} from './Imagenes.js';
import express from 'express';

import  multer from 'multer' ;
import cors from'cors' ;
import bodyParser from'body-parser';
import { login } from './auth.js';

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
const PORT = 3000; // Puedes cambiar el puerto según tus necesidades
app.use(cors());
var storage = multer.diskStorage(
  {
      destination: './images/',
      filename: function ( req, file, cb ) {
        let dir=Date.now();
          cb( null,dir+ file.originalname );
          let imagen={
            nombre:req.body.nombre,
            fecha: new Date().toJSON().slice(0, 10),
            dirrecion:dir+ file.originalname,
            mimetype:file.mimetype
          };
          addMongo(imagen);
      }
  }
);
export const upload= multer({storage:storage});


app.post('/subir-imagen',upload.single('imagen'), (req, res) => {

  console.log(req.file);
  if (req.file) {
    console.log('Archivo subido correctamente:', req.file.filename);
    // Aquí puedes realizar cualquier otra acción que necesites con el archivo subido
    res.send({respuesta:'Archivo subido correctamente'});
  } else {
    console.log('Error al subir el archivo');
    res.status(400).send({respuesta:'Error al subir el archivo'});
  }

});

app.post('/imagenes', async(req, res)=> {
 const imagenes =await getImagenes(req.body.page);
  return res.json( imagenes);
});

app.post('/login', async(req, res) => {

  const token=await login(req.body);
  console.log(token);
  const _res=res.json({token});
  return _res;

});

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});



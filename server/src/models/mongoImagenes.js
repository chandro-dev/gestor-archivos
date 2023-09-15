import  mongoose from'mongoose';

const schema = new mongoose.Schema({
  nombre: { type: String, required: true },
  idusuario: {type :Number, require:true},
  dirrecion: { type: String, required: true },
  fecha: { type: String, required: true },
  mimetype: { type: String, required: true},
  rol :{type:Number,required:true}
});

const imagen=mongoose.model('imagenes',schema);

export default imagen;
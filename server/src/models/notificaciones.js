import  mongoose from'mongoose';

const schema = new mongoose.Schema({
  idusuario: {type :Number, require:true},
  dirrecion: { type: String, required: true },
  message:{type:String,required:true}
});

const imagen=mongoose.model('notificaciones',schema);

export default imagen;
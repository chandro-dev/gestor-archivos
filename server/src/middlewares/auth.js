import  jwt, { decode } from'jsonwebtoken';
const secretKey ='CLAVE';

export  function validacion(req, res, next){
  console.log(req.body)
  let token=req.header('Authorization');

  try{
    token = ((req.header('Authorization')).replace('Bearer','')).replace(' ','' );
  }catch{
  }
  if (!token) {
    return res.status(401).json({ error: 'Acceso no autorizado.' });
  }
  try {
    const decoded = jwt.verify(token, secretKey);
    console.log(req.body);
    req.body= {...decoded,...req.body};
    console.log(req.body);
    next();
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      return res.status(401).json({error:'El token ha expirado'});
    } else {
      return res.status(401).json({ error: 'Token inválido.' });
    }
  }
}

export  function decoded(token){
try{
    const decoded = jwt.verify(token, secretKey);
    return decoded;
  } catch (error) {
    // Si hay un error al validar el JWT, devuelve null o lanza una excepción según tus necesidades
    if (error instanceof jwt.TokenExpiredError) {
      // El token ha expirado
      return {error:'El token ha expirado'};
    } else {
      return { error: 'Token inválido.' };
    }
  }
}




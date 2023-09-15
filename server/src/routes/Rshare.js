import {share,rmShare, notify} from '../controllers/Cshare.js';

// routes/users.js
import express from 'express';
import { validacion } from '../middlewares/auth.js';
const router = express.Router();

// Ruta para el perfil del usuario (requiere autenticación)
router.post('/share', validacion,async (req, res) => {

    res.send(await notify(req.body.idFile,req.body.userId));
});
router.delete('/rmShare', validacion,async (req, res) => {
    res.send(await rmShare(req.body.idFile,req.body.userId));
});
router.post('/shareAcept',validacion,async(req,res)=>
{
    res.send(await share(req.body.idFile,req.body.userId));
})
router.delete('/shareDeny',validacion,async(req,res)=>{
    res.send(await share(req.body.idFile,req.body.userId));

});

export default router;

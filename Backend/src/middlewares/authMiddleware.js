import jwt from 'jsonwebtoken';
import sql from '../database/db.js';

export const authMiddleware = async(req, res, next)=>{
    const authHeader = req.headers.authorization;
    if(!authHeader|| !authHeader.startsWith('Bearer ')){
        return res.status(401).json({error:'Token no proporcionado'});
    }

    const token = authHeader.split(' ')[1];

    try {
        const payload = jwt.verify(token,process.env.JWT_SECRET);

        const resultado = await sql`SELECT * FROM tokens_invalidados WHERE token = ${token}`;

        if(resultado.length>0){
            return res.status(401).json({mensaje:'Token invalido'});
        }

        req.usuario = payload;
        req.token = token;
        next();


    } catch (error) {
        return res.status(401).json({mensaje:'Token invalido o expirado'})
    }


}
export const findAll = async () =>{
    try {
        return await sql`SELECT * FROM usuarios`;
    } catch (error) {
        console.error(error);
    }
}


export const findPersonaByEmail = async (email) =>{
    try {
        return await sql`SELECT * FROM usuarios WHERE email = ${email}`;
    } catch (error) {
        console.log(error);
    }
}
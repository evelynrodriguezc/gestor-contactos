let contactos = []

function agregarContacto(nombre, telefono){
    const contacto = {nombre, telefono}
    contactos.push(contacto)
    return contacto;
}

function listarContactos(){
    return contactos

}

function buscarContacto(nombre){
    return contactos.filter((contacto) => contacto.nombre.toLowerCase() === nombre.toLowerCase());
};

module.exports = {
    agregarContacto,
    listarContactos,
    buscarContacto
}
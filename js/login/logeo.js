/* La función ObtenerUsuarios obtiene la informacion del servidor , la convierte en json y la devuelve.
    Esto me permite saber los usuarios de mi propio json server
*/

const ObtenerUsuarios = async () =>{
    const usuarios = await fetch("http://localhost:3000/user")
    const datosUsuarios = await usuarios.json()
    return datosUsuarios
}

/* La función valodarUser comprueba si los usuarios que se introducen estan en mi json server , que saco gracias a la funcion obtenerusuarios */

export const validarUser = async (user, pass) => {
    const usuarios = await ObtenerUsuarios()
    /* Se recorren los usuarios con find buscando un elemento que tenga el nombre y la contraseña igual al que se pasaron */
    const usuarioEncontrado = usuarios.find(
        (elemento) => elemento.username === user && elemento.password === pass
    );
    // dependiendo si usuarioEncontrado es true o false mostraremos una alerta o una redirección a otra pagina
    if (usuarioEncontrado) {
        alert(`Bienvenido ${usuarioEncontrado.username}, has iniciado sesión con éxito.`);
        window.location.href = "captcha.html";
    } else {
        alert("Revisa tus credenciales");
    }
};

/* Cuando se presione el boton para el logeo entonces usando un evento guardaremos la información de los label y llamaremos a la 
funció que valida los usuarios, anteriormente creada*/

document.getElementById("botonLogin").addEventListener("click", () => {
    const user = document.getElementById("loginUsuario").value;
    const pass = document.getElementById("loginPassword").value;
    validarUser(user, pass);
    console.log(user,pass);
});
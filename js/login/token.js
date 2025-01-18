// Genera un token para el usuario con sus datos, btoa lo codifica en base 64
export const generarToken = (data) => {
    const token = btoa(JSON.stringify({ ...data, exp: Date.now() + 2 * 60 * 60 * 1000 }));
    return token;
};



// Elimina del localstorage los token del usuario y del carrito y redirige al login
export const cerrarSesion = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("carrito");
    alert("Has cerrado sesión.");
    window.location.href = "../login/login.html";
};

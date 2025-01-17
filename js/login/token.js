// Genera un token para el usuario con sus datos, btoa lo codifica en base 64
export const generarToken = (data) => {
    const token = btoa(JSON.stringify({ ...data, exp: Date.now() + 2 * 60 * 60 * 1000 }));
    return token;
};

// Valida si el token ha expirado o si no existe con atob decodifico el codigo , si este expiro se borra y redirige al login
export const validarJWT = () => {
    const token = localStorage.getItem("token");
    if (!token) {
        alert("Sesión no válida. Inicia sesión nuevamente.");
        window.location.href = "../login/login.html";
        return null;
    }

    const payload = JSON.parse(atob(token));
    if (Date.now() > payload.exp) {
        localStorage.removeItem("token");
        alert("Token expirado. Inicia sesión nuevamente.");
        window.location.href = "../login/login.html";
        return null;
    }

    return payload;
};

// Elimina del localstorage los token del usuario y del carrito y redirige al login
export const cerrarSesion = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("carrito");
    alert("Has cerrado sesión.");
    window.location.href = "../login/login.html";
};

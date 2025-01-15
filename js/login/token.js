const secretKey = "mi_secreto";

export const generarToken = (data) => {
    const token = btoa(JSON.stringify({ ...data, exp: Date.now() + 2 * 60 * 60 * 1000 }));
    return token;
};

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

export const cerrarSesion = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("carrito");
    alert("Has cerrado sesión.");
    window.location.href = "../login/login.html";
};

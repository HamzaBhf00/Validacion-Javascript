window.addEventListener("load", function () {
    //Capturamos los elementos del formulario
    const formulario = document.querySelector("#formulario");
    const usuario = document.querySelector("#user");
    const email = document.querySelector("#email")
    const passwd = document.querySelector("#passwd");
    const newPasswd = document.querySelector("#newpasswd");
    const fechaNac = document.querySelector("#fechaNac");
    const condiciones = document.querySelector("#condiciones");


    //función de validación del formulario asociada al evento submit
    formulario.addEventListener("submit", evento => {
        // lo primero es prevenir el comportamiento por defecto del submit
        evento.preventDefault();
        evento.stopPropagation();

        //la variable valido comienza valiendo true. si encontramos un fallo cambiamos a false
        let valido = true;

        if (!validoUser(usuario)) {
            valido = false;
        }
        if (!validoEmail(email)) {
            valido = false;
        }
        if (!validoPass(passwd)) {
            valido = false;
        }
        if (!validoPass2(newPasswd, passwd)) {
            valido = false;
        }
        if (!validoFecha(fechaNac)) {
            valido = false;
        }
        if (!validoCheck(condiciones)) {
            valido = false;
        }

        //si no hemos encontrado ningún campo incorrecto forzamos ahora sí el envío del formulario
        if (valido) {
            formulario.submit();
        }
    });

    ///////////////////////////////////////////////////////////////
    // a partir de aquí pondremos funciones de validación
    ///////////////////////////////////////////////////////////////

    //valida que el user es correcto. devolverá true si correcto y false si no
    //la función recibe el elemento input usuario, no su valor!!!!!
    function validoUser(el) {
        const regUser = /^[a-zA-Z0-9\_\-]{4,16}$/;
        if (!el.value) {
            marcaError(el, "El usuario debe contener algo")
        } else if (!regUser.test(el.value)) {
            marcaError(el, "El usuario no es valido")
        } else {
            marcaValido(el, "El usuario es valido")
        }
    }

    function validoEmail(el) {
        if (!el.value) {
            marcaError(el, "Debe introducir el correo");
        } else if (!regEmail(el.value)) {
            marcaError(el, "Correo no es valido");
        } else {
            marcaValido(el, "Correo es valido");
        }
    }

    function validoPass(el) {
        if (el.value.length < 7) {
            marcaError(el, "La contraseña debe tener al menos 7 caracteres");
        } else {
            marcaValido(el, "La contraseña es valida");
        }
    }

    function validoPass2(newPass, oldPass) {
        if (newPass.value === "") {
            marcaError(newPass, "Debe rellenar")
        } else if (newPass.value !== oldPass.value) {
            marcaError(newPass, "La contraseña no coincide")
        } else {
            marcaValido(newPass, "Coincide")
        }
    }

    function validoFecha(el) {
        if (el.value) {
            const fechaNac = new Date(el.value);
            const fechaActual = new Date();
            const fechaMinima = new Date(fechaActual.setFullYear(fechaActual.getFullYear() - 18));
            //console.log(el.value);
            //console.log(fechaNac);
            //console.log(fechaMinima);
            if (fechaNac < fechaMinima) {
                el.parentNode.querySelector(".error-feedback").textContent = "";
                return true;
            } else {
                el.parentNode.querySelector(".error-feedback").textContent = "Debe ser mayor de edad";
                return false;
            }

        } else {
            el.parentNode.querySelector(".error-feedback").textContent = "Tiene que seleccionar una fecha";
            return false;
        }
    }

    function validoCheck(el) {
        if (el.checked) {
            el.parentNode.querySelector(".error-feedback").textContent = "";
            return true;
        } else {
            el.parentNode.querySelector(".error-feedback").textContent = "Tiene que marcar la casilla";
            return false;
        }
    }
    ///////////////////////////////////////////////////////////////
    // funciones de utilidad:
    ///////////////////////////////////////////////////////////////

    //pone un mensaje pasado al parrafo de error asociado al elemento pasado 
    //y pone la clase de error al padre
    function marcaError(elemento, mensaje) {
        elemento.parentNode.querySelector(".error-feedback").textContent = mensaje;
        elemento.parentNode.querySelector(".valid-feedback").textContent = "";
        elemento.parentNode.classList.add("error");
        elemento.parentNode.classList.remove("valid");
    }
    //quita el mensaje de error al .error-feedback del elemento pasado 
    //y quita la clase de error al padre 
    function marcaValido(elemento, mensaje) {
        elemento.parentNode.querySelector(".error-feedback").textContent = "";
        elemento.parentNode.querySelector(".valid-feedback").textContent = mensaje;
        elemento.parentNode.classList.remove("error");
        elemento.parentNode.classList.add("valid");

    }

    //Regex básico de email
    function regEmail(input) {
        return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(input);
    }


});
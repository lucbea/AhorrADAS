// ________________________________
// crearCategoria con id encriptado
// --------------------------------
const crearIdDato = (nombre) => {
    return { id: uuidv4(), nombre };
}


// ______________________________
// constante Categorias iniciales (para restaurar)
// ------------------------------
const categoriasInicio = [
    crearIdDato('COMIDA'),
    crearIdDato('EDUCACION'),
    crearIdDato('SALIDAS'),
    crearIdDato('SERVICIOS'),
    crearIdDato('TRANSPORTE'),
    crearIdDato('TRABAJO'),
];


// ___________________
// Variables generales
// -------------------
let categoriasLS = [];
let nombNuevaCateg = '';
let idNuevaCateg = '';
let idAEditar = '';
let nombreAEditar = '';
let idCatDuplicada = '';
let indice;
let nuevaCategAux;
let categoriaAEditar = '';


// ________________________
// Guardar en Local Storage
// ------------------------
const grabar = (locacion, dato) => localStorage.setItem(locacion, JSON.stringify(dato));


// ___________________________
// Recuperar del Local Storage
// ---------------------------
const recuperar = (locacion) => {
    let datosLS;
    datosLS = JSON.parse(localStorage.getItem(locacion));
    return datosLS;
}


// // _______________________________
// // Funcion Mostrar las categorias
// // -------------------------------
let $muestraCategorias = document.getElementById("muestra-categorias");
const mostrarDato = () => {
    $muestraCategorias.innerHTML = "";
    categoriasLS = recuperar("categorias");
    categoriasLS.forEach(categoria => {
        if ($muestraCategorias !== null) {
            let divContenCat = document.createElement("div");
            divContenCat.id = "conten-cat";
            let div1 = document.createElement("div");
            div1.id = "nombre-cat";
            let div2 = document.createElement("div");
            div2.id = "bot-editar-borrar"
            divContenCat.classList.add("flex", "justify-between", "my-1", "w-full", "gap-2");
            div1.classList.add("flex", "items-center", "text-xs", "sm:text-sm", "font-bold");
            let spanCategoria = document.createElement("span");
            spanCategoria.classList.add("span-categoria");
            spanCategoria.innerHTML = categoria.nombre.trim();

            let btnEditarCat = document.createElement("button");
            btnEditarCat.innerHTML = '<i class="fa-regular fa-pen-to-square"></i>';
            btnEditarCat.id = `btn-editar-${categoria.id}`;
            btnEditarCat.classList.add("flex-shrink-0", "h-8", "px-2", "md:px-4", "lg:px-6", "rounded-lg", "bg-blue-100", "mr-2", "md:mx-4", "lg:mx-4", "shadow-[0_0px_2px_1px_rgba(0,0,0,0.2)]", "border-2", "hover:bg-cyan-800/25", "focus:bg-blue-200", "hover:dark:bg-cyan-700/25", "focus:dark:bg-gray-400", "hover:shadow-[0_0px_2px_1px_rgba(0,0,0,0.2)]", "focus:shadow-md");
            btnEditarCat.addEventListener("click", () => {
                editarCategoria(categoria.id)
            });

            let btnBorrar = document.createElement("button");
            btnBorrar.innerHTML = '<i class="fa-regular fa-trash-can"></i>';
            btnBorrar.id = `btn-borrar-${categoria.id}`;
            btnBorrar.classList.add("flex-shrink-0", "h-8", "px-2", "md:px-4", "lg:px-6", "rounded-lg", "bg-blue-100", "shadow-[0_0px_2px_1px_rgba(0,0,0,0.2)]", "border-2", "hover:bg-cyan-800/25", "focus:bg-blue-200", "hover:dark:bg-cyan-700/25", "focus:dark:bg-gray-400", "hover:shadow-[0_0px_2px_1px_rgba(0,0,0,0.2)]", "focus:shadow-md");
            btnBorrar.addEventListener("click", () => borrarCategoria(categoria.id));

            div1.appendChild(spanCategoria);
            div2.appendChild(btnEditarCat);
            div2.appendChild(btnBorrar);
            divContenCat.appendChild(div1);
            divContenCat.appendChild(div2);
            $muestraCategorias.appendChild(divContenCat);
        }
    });
};


// _________________________
// Funcion inicia categorias
// -------------------------
let valorGuardado;
let categorias;
let iniciaCategorias = () => {
    valorGuardado = recuperar("categorias");
    if (valorGuardado === null) {
        categorias = categoriasInicio;
        grabar("categorias", categorias);
        mostrarDato();
    } else {
        mostrarDato();
    }
}


//______________________________________________________________________________
// Función que  evita minúsculas y acentos --> para evitar categorías duplicadas
//------------------------------------------------------------------------------
const sinAcentosMayus = (texto) => {
    if (typeof texto === 'string') {
        texto = texto.replace(/[áäâà]/g, 'a');
        texto = texto.replace(/[éëêè]/g, 'e');
        texto = texto.replace(/[íïîì]/g, 'i');
        texto = texto.replace(/[óöôò]/g, 'o');
        texto = texto.replace(/[úüûù]/g, 'u');
        texto = texto.toUpperCase();
    }
    return texto;
}


// _____________________________________________
// funcion armado del array para guardarlo en LS
// ---------------------------------------------
const armadoArrayGuardar = (id, nombre, funcion) => {
    const nuevoObj = { id, nombre };
    let arrayListoParaGuardar = [];
    if (categoriasLS) {
        if (funcion === "nuevaCateg") {
            categoriasLS.push(nuevoObj);
            return categoriasLS;
        }
        if (funcion === "edicion") {
            let nombre = nombre;
            arrayListoParaGuardar = categoriasLS.map(categoria => {
                if (categoria.id === id) {
                    return { ...categoria, nombre: nombre };
                } else {
                    return categoria;
                }
            });
            return arrayListoParaGuardar;
        }
    }
};


//_______________________________________
// Función ingreso categoría en el input (transformación en mayúscula, sin acento)
// --------------------------------------
let $inpCategoria = document.getElementById("categoria");
const ingresarCategoria = (inputTextCateg) => {
    nombNuevaCateg = inputTextCateg.value;
    nombNuevaCateg = sinAcentosMayus(nombNuevaCateg);
    nombNuevaCateg = nombNuevaCateg.slice(0, 14);
    return nombNuevaCateg;
};


// _______________________________________________________
// Evento - Boton cerrar mensaje por categorías duplicadas
// -------------------------------------------------------
const $contVentanaModal = document.getElementById("cont-ventana-modal");
const $mjeCatDuplicada = document.getElementById("mje-cat-duplicada");
const $cerrar = document.getElementById("cerrar-cat-duplicada");
let $inpEditarCategoria = document.getElementById("editar-categoria");
$cerrar.addEventListener('click', () => {

    $mjeCatDuplicada.classList.add("hidden");
    $contVentanaModal.style.zIndex = 4;
    $contEditarCategoria.style.zIndex = 6;
    $inpEditarCategoria.value = nombreAEditar;
    if ($contEditarCategoria.classList.contains("hidden")) {
        $contVentanaModal.classList.add("hidden")
        $inpCategoria.value = "";
    }
    $inpEditarCategoria.value = categoriaAEditar.nombre;
});


// ______________________________________________________________________
// Evento - Ingreso de texto en input de categoria o de edicion categoria
// ----------------------------------------------------------------------
$inpCategoria.addEventListener('input', (e) => $inpCategoria.value = ingresarCategoria($inpCategoria));


// _________________________________________________
// Evento - Boton cerrar mensaje por categoría vacía
// -------------------------------------------------
const $cerrarCatVacia = document.getElementById("cerrar-cat-vacia");
const $mjeCatVacia = document.getElementById("mje-cat-vacia");
$cerrarCatVacia.addEventListener('click', () => {
    $mjeCatVacia.classList.add("hidden");
    $contVentanaModal.style.zIndex = 7;
    $contEditarCategoria.style.zIndex = 8;
    if ($contEditarCategoria.classList.contains("hidden")) {
        $contVentanaModal.classList.add("hidden");
    }
    if (categoriaAEditar) { $inpEditarCategoria.value = categoriaAEditar.nombre; }
});


// ________________________________________
// Revisar nombres de categorias duplicados
// ----------------------------------------
const revisarDatosDuplicados = (id, nombre) => {
    categoriasLS = recuperar("categorias");
    let duplicado = categoriasLS.find(categoria => categoria.nombre === nombre)
    if (duplicado) {
        categoriaDuplicada = true
    }
    else {
        categoriaDuplicada = false;
    }
    return categoriaDuplicada;
};


// ______________________________________________
// Evento - Boton AGREGAR de ingreso de categoría
// ----------------------------------------------
let $botonIngresoCategoria = document.getElementById('boton-ingreso-categoria');
$botonIngresoCategoria.addEventListener('click', (e) => {
    let valorCategoria = ingresarCategoria($inpCategoria);
    valorCategoria = $inpCategoria.value.trim();
    if (valorCategoria !== "") {
        let nuevaCategEncrip = crearIdDato(valorCategoria);
        nombNuevaCateg = nuevaCategEncrip.nombre;
        idNuevaCateg = nuevaCategEncrip.id;
        let datoDuplicado = revisarDatosDuplicados(idNuevaCateg, nombNuevaCateg);
        if (!datoDuplicado) {
            let categoriasParaGuardar = armadoArrayGuardar(idNuevaCateg, nombNuevaCateg, "nuevaCateg");
            grabar("categorias", categoriasParaGuardar);
            mostrarDato();
            $inpCategoria.value = "";
            return;
        } else {
            activarVentMod($mjeCatDuplicada);
            return;
        }
    } else {
        activarVentMod($mjeCatVacia);
        return;
    }
});


// _______________________________________
// Función  cancelar edicion de categoría
// ---------------------------------------
const $contEditarCategoria = document.getElementById("cont-editar-categoria");
const cerrarVentEdicion = () => {
    $contEditarCategoria.classList.add("hidden");
    $contVentanaModal.classList.add("hidden");
    if (!($mjeCatDuplicada.classList.contains("hidden"))) {
        $mjeCatDuplicada.classList.add("hidden");
        $contVentanaModal.style.zIndex = 4;
        $contEditarCategoria.style.zIndex = 6;
    }
}


// ________________________
// Función editar categoría
// ------------------------
const $btnCancEditCateg = document.getElementById("boton-cancelar-editar-categoria");
const $btnGrabarEditCateg = document.getElementById("boton-grabar-editar-categoria");
const editarCategoria = (id) => {
    let idCateg = id;
    activarVentMod($contEditarCategoria);
    let categoriasLS = recuperar("categorias");
    indice = categoriasLS.findIndex(categoria => categoria.id === idCateg);
    categoriaAEditar = categoriasLS.find(categoria => categoria.id === idCateg);
    $inpEditarCategoria.value = categoriaAEditar.nombre;
    $inpEditarCategoria.addEventListener('input', (e) => $inpEditarCategoria.value = ingresarCategoria($inpEditarCategoria));
    nuevaCategAux = $inpEditarCategoria.value;
    $btnCancEditCateg.addEventListener('click', () => cerrarVentEdicion());
    $btnGrabarEditCateg.setAttribute("data-id", id); // Agregar id como atributo data
};


// ______________________________________________
// Evento - Boton Grabar la edición de categoría
// ----------------------------------------------
$btnGrabarEditCateg.addEventListener('click', () => {
    const idCat = $btnGrabarEditCateg.getAttribute("data-id");
    ctrlGrabarEditarCateg(idCat);
});


// _____________________________________________________
// Funcion Controles y grabación de edición de categoria
// -----------------------------------------------------
const ctrlGrabarEditarCateg = (idCat) => {
    categoriasLS = recuperar("categorias");
    categoriaAEditar = categoriasLS.find(categoria => categoria.id === idCat);
    let nuevaCateg = $inpEditarCategoria.value;
    if (nuevaCateg !== "") {
        if (categoriaAEditar) {
            if (nuevaCateg === categoriaAEditar.nombre) {
                cerrarVentEdicion();
                return;
            } else {
                let categoriaDuplicada = revisarDatosDuplicados(idCat, nuevaCateg);
                if (!categoriaDuplicada) {
                    if (indice !== -1) {
                        arrayListo = [...categoriasLS.slice(0, indice),
                        { ...categoriasLS[indice], nombre: nuevaCateg },
                        ...categoriasLS.slice(indice + 1)
                        ];
                    }
                    grabar("categorias", arrayListo);
                    mostrarDato();
                    cerrarVentEdicion();
                    return;
                }
                if (categoriaDuplicada) {
                    activarVentMod($mjeCatDuplicada);
                    $inpEditarCategoria.value = categoriaAEditar.nombre;
                    return;
                }
            }
        }
    }
    if (nuevaCateg === "") {
        if (categoriaAEditar) {
            activarVentMod($mjeCatVacia);
            return;
        }
    }
};


//--------------------------
// Función borrar categoría
// -------------------------
let $mjeNegacionBorrarCat = document.getElementById("mje-negacion-borrar-cat");
let $cerrarNegacionBorrarCat = document.getElementById("cerrar-negacion-borrar-cat");
let $mjeConfirmBorrarCat = document.getElementById("mje-confirm-borrar-cat");
let $siBorrarCateg = document.getElementById("si-borrar-cat");
let $noBorrarCateg = document.getElementById("no-borrar-cat");
const borrarCategoria = (id) => {
    const categorias = recuperar("categorias");
    const operaciones = recuperar("operaciones");
    let borrar = true;
    if (operaciones !== null) {
        if (operaciones.length > 0) {
            const resultado = operaciones.find((op) => op.categoria === id);
            if (resultado !== undefined) {
                borrar = false;
            }
        }
    }
    if (borrar) {
        activarVentMod($mjeConfirmBorrarCat);
    } else {
        activarVentMod($mjeNegacionBorrarCat);
    }


    // ____________________________________
    // Evento - Boton si eliminar categoría
    // ------------------------------------
    $siBorrarCateg.addEventListener("click", () => {
        const nuevasCategorias = categorias.filter(
            (categoria) => categoria.id !== id);
        grabar("categorias", nuevasCategorias);
        mostrarDato();
        $contVentanaModal.classList.add("hidden");
        $mjeConfirmBorrarCat.classList.add("hidden");
    })


    // ____________________________________
    // Evento - Boton no eliminar categoría
    // ------------------------------------
    $noBorrarCateg.addEventListener('click', () => {
        $contVentanaModal.classList.add("hidden");
        $mjeConfirmBorrarCat.classList.add("hidden");
    })
};


// _______________________________________________________________
// Evento - Boton cerrar mensaje negación eliminación de categoría
// ---------------------------------------------------------------
$cerrarNegacionBorrarCat.addEventListener('click', () => {
    $mjeNegacionBorrarCat.classList.add("hidden");
    $contVentanaModal.classList.add("hidden");
});


// ______________________________
// Función  Activar Ventana Modal
// ------------------------------
const activarVentMod = (contenAActivar) => {
    let alto = document.documentElement.scrollHeight;
    if (!($contVentanaModal.classList.contains("hidden"))) {
        $contVentanaModal.style.zIndex = 8;
        contenAActivar.style.zIndex = 10;
    } else {
        $contVentanaModal.classList.remove("hidden");
        $contVentanaModal.style.zIndex = 4;
        contenAActivar.style.zIndex = 6;
    }
    $contVentanaModal.style.height = `${alto}px`;
    let margenInferior = window.innerHeight + window.scrollY;
    contenAActivar.style.bottom = `${window.innerHeight - margenInferior + 300}px`;
    contenAActivar.classList.remove("hidden");
    alto = alto - 150;
    return alto;
}

// ___________________________________
// Llamado para restaurar las categorías
// -----------------------------------
recuperar("categorias");
iniciaCategorias();





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
    { id: "3edb9a57-d1ac-401c-8bdd-ac8ac5d155f8", nombre: "COMIDA" },
    { id: "5f6e93ee-65c3-4ae1-bfa2-ecf00c9b5f91", nombre: "EDUCACION" },
    { id: "c585531d-7bed-4096-a099-baa8282300b0", nombre: "SALIDAS" },
    { id: "a84a60e9-5c32-4381-b0da-aa120df9b90b", nombre: "SERVICIOS" },
    { id: "4904f4f9-d770-4857-a250-5350ee8e3770", nombre: "TRANSPORTE" },
    { id: "40e00304-2d59-4c1c-8987-b7e5de113c25", nombre: "TRABAJO" },

    // crearIdDato('COMIDA'),
    // crearIdDato('EDUCACION'),
    // crearIdDato('SALIDAS'),
    // crearIdDato('SERVICIOS'),
    // crearIdDato('TRANSPORTE'),
    // crearIdDato('TRABAJO'),
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
            divContenCat.classList.add("flex", "justify-between", "my-2", "w-full", "gap-2");
            div1.classList.add("flex", "items-center");
            let spanCategoria = document.createElement("span");
            spanCategoria.classList.add("span-categoria");
            spanCategoria.innerHTML = categoria.nombre.trim();

            let btnEditarCat = document.createElement("button");
            btnEditarCat.innerHTML = '<i class="fa-regular fa-pen-to-square"></i>';
            btnEditarCat.id = `btn-editar-${categoria.id}`;
            btnEditarCat.classList.add("flex-shrink-0", "h-8", "px-2", "md:px-4", "lg:px-6", "rounded-lg", "bg-blue-100", "mr-2", "md:mx-4", "lg:mx-4", "shadow-[0_0px_2px_1px_rgba(0,0,0,0.2)]", "border-2", "hover:bg-cyan-800/25", "focus:bg-blue-200", "hover:dark:bg-cyan-700/25", "focus:dark:bg-gray-400", "hover:shadow-[0_0px_2px_1px_rgba(0,0,0,0.2)]", "focus:shadow-md");
            btnEditarCat.addEventListener("click", () => editarCategoria(categoria.id));

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
    if (valorGuardado === null) {   // Verificar si el valor es null
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
const armadoArrayGuardar = (locacion, id, nombre, funcion) => {
    const nuevoObj = { id, nombre };
    let arrayListoParaGuardar = [];
    if (categoriasLS) {
        let datoDuplicado = revisarDatosDuplicados(id, nombre);
        if (!datoDuplicado) {
            if (funcion === "nuevaCateg") {
                categoriasLS.push(nuevoObj);
                return categoriasLS;
            }
            if (funcion === "edicion") {
                let nombre = nombre;
                arrayListoParaGuardar = categoriasLS.map(categoria => {
                    if (categoria.id === id) {
                        return { ...categoria, nombre: nombre }; // Actualiza el nombre si el ID coincide
                    } else {
                        return categoria; // Retorna la categoría sin cambios si el ID no coincide
                    }
                });
                return arrayListoParaGuardar;
            }
        } else {
            activarVentMod($mjeCatDuplicada);
            return;
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
    nombNuevaCateg = nombNuevaCateg.slice(0, 14); //toma hasta 14 caracteres para la categoría
    console.log("estoy en ingresarCategoria", nombNuevaCateg);
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
    // $contEditarCategoria.style.zIndex = 6;
    $inpEditarCategoria.value = nombreAEditar;
    if ($contEditarCategoria.classList.contains("hidden")) {
        console.log('contenedor de edición NOOOO activo')
        $contVentanaModal.classList.add("hidden");
        $inpCategoria.value = ""
        // $contVentanaModal.style.zIndex = 4;
    }
    // else {
    // $contVentanaModal.style.zIndex = 9;

    // };
     return $inpEditarCategoria.value = nombreAEditar;     // VEER antes = ""
   
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
    console.log('evento boton cerrar')
    $mjeCatVacia.classList.add("hidden");
    $contVentanaModal.style.zIndex = 7;
    $contEditarCategoria.style.zIndex = 8;
    if ($contEditarCategoria.classList.contains("hidden")) {
        $contVentanaModal.classList.add("hidden");
    }

    $inpEditarCategoria.value = nombreAEditar;
    console.log(nombreAEditar, $inpEditarCategoria.value);
   
    // $inpCategoria.value = "";
   
});


// ________________________________________
// Revisar nombres de categorias duplicados
// ----------------------------------------
const revisarDatosDuplicados = (id, nombre) => {  //quitar el ID porque está demás
    for (let i = 0; i < categoriasLS.length; i++) {
        if (categoriasLS[i].nombre === nombre) {
            categoriaDuplicada = true;
            idCatDuplicada = categoriasLS[i].id;
            return categoriaDuplicada;
        }
    }
    categoriaDuplicada = false;
    return categoriaDuplicada;
};


// ______________________________________________
// Evento - Boton AGREGAR de ingreso de categoría
// ----------------------------------------------
let $botonIngresoCategoria = document.getElementById('boton-ingreso-categoria');
$botonIngresoCategoria.addEventListener('click', (e) => {
    let valorCategoria = ingresarCategoria($inpCategoria);
    valorCategoria = $inpCategoria.value.trim();    // Obtener el valor del input de la categoría 
    if (valorCategoria !== "") {  //evita ingreso de categoría vacía
        let nuevaCategEncrip = crearIdDato(valorCategoria);
        nombNuevaCateg = nuevaCategEncrip.nombre;
        idNuevaCateg = nuevaCategEncrip.id;
        let datoDuplicado = revisarDatosDuplicados(idNuevaCateg, nombNuevaCateg);
        if (!datoDuplicado) {
            let categoriasParaGuardar = armadoArrayGuardar("categorias", idNuevaCateg, nombNuevaCateg, "nuevaCateg");
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
    // $inpEditarCategoria.value = "";
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
const editarCategoria = (idCat) => {

    // idAEditar = idCat;
    // console.log("ingresé a editarCategoria", idCat);
    activarVentMod($contEditarCategoria); //Activa la ventana modal con espacio de edicion;  
    categoriasLS = recuperar("categorias");  //Obtener categorías del localStorage  
    // console.log('el array categorias es', categoriasLS)
    indice = categoriasLS.findIndex(categoria => categoria.id === idCat);
    let categoriaAEditar = categoriasLS.find(categoria => categoria.id === idCat);
    // console.log('la categoria que voy a editar es' ,categoriaAEditar, categoriaAEditar.nombre);
    nombreAEditar = categoriaAEditar.nombre;
    $inpEditarCategoria.value = categoriaAEditar.nombre;   //Mostrar el nombre de la categoría a editar en el input
    // console.log($inpEditarCategoria.value)
    $inpEditarCategoria.addEventListener('input', (e) => $inpEditarCategoria.value = ingresarCategoria($inpEditarCategoria));
    // console.log('volví de ingresarCategoria, este valor recibió el input $inpEditarCategoria.value:', $inpEditarCategoria.value)
    nuevaCategAux = $inpEditarCategoria.value;
    // console.log($inpEditarCategoria.value, nuevaCategAux);

    $btnCancEditCateg.addEventListener('click', () => cerrarVentEdicion());

    $btnGrabarEditCateg.addEventListener('click', () => {
        categoriaAEditar = categoriasLS.find(categoria => categoria.id === idCat);
        // console.log('llamo a ctrlGrabarEditarCateg, paso', idCat, categoriaAEditar)
        ctrlGrabarEditarCateg(idCat, categoriaAEditar);
        
    });
    $inpEditarCategoria.value = categoriaAEditar.nombre;
};


// _____________________________________________________
// Funcion Controles y grabación de edición de categoria
// -----------------------------------------------------
const ctrlGrabarEditarCateg = (idCat, categoriaAEditar) => {
    console.log('entre a ctrlGrabarEditarCateg, me llegaron estos parámetros: ', idCat, categoriaAEditar.nombre)
    categoriasLS = recuperar("categorias");
    let nuevaCateg = $inpEditarCategoria.value;
    // console.log('el nombre ingresado por input es ', $inpEditarCategoria.value, nuevaCateg);
    if (nuevaCateg !== "") {
        // console.log("Estoy editando categoria NO vacía", categoriaAEditar, 'lo ingresado por nuevo nombre es', nuevaCateg, $inpEditarCategoria.value)
        if (nuevaCateg === categoriaAEditar.nombre) { //Es el mismo nombre en el mismo ID
            cerrarVentEdicion();
            // console.log("es el mismo nombre y terminé proceso dejando todo igual")
            console.log("========================")
            return;
        } else {
            let categoriaEditada = { id: idCat, nombre: nuevaCateg };
            console.log("se cambió el nombre, voy a llamar categoria duplicada")
            let categoriaDuplicada = revisarDatosDuplicados(idCat, nuevaCateg);
            console.log("volví de categoría duplicada", categoriaDuplicada)
            if (!categoriaDuplicada) {
                console.log("entre al if y no es categoria duplicada"); // Ingresa al if si no hay duplicados
                if (indice !== -1) {
                    console.log('encontró categoría, le pondré este nombre: ', nuevaCateg) // Verifica si se encontró el objeto con el id dado
                    arrayListo = [...categoriasLS.slice(0, indice), // Objetos antes del objeto a modificar
                    { ...categoriasLS[indice], nombre: nuevaCateg }, // Objeto modificado
                    ...categoriasLS.slice(indice + 1) // Objetos después del objeto a modificar
                    ];
                }
                grabar("categorias", arrayListo);
                mostrarDato();
                cerrarVentEdicion();
                // $inpEditarCategoria.value = "";
                console.log("========================")
                return;
            }
            if (categoriaDuplicada) {
                console.log("entre al if y es categoria duplicada");
                activarVentMod($mjeCatDuplicada);
                console.log('ingreso la categoriaAEditar.nombre al input', categoriaAEditar.nombre)
                $contEditarCategoria.value = categoriaAEditar.nombre;
                console.log("========================")
                return;
            }
        }
    }
    if (nuevaCateg === "") {
        // if ($inpEditarCategoria.value === "") {
        console.log("estoy en el if !== porque es categ vacía");
        activarVentMod($mjeCatVacia)
        console.log('ingreso la categoriaAEditar.nombre al input', categoriaAEditar.nombre)
        $contEditarCategoria.value = categoriaAEditar.nombre;
        console.log("========================")
        return;
        // }
    }
    // $inpEditarCategoria.value = "";
}




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
        // $contVentanaModal.classList.remove("hidden");
        // $mjeConfirmBorrarCat.classList.remove("hidden");
    } else {
        activarVentMod($mjeNegacionBorrarCat);
        // $contVentanaModal.classList.remove("hidden");
        // $mjeNegacionBorrarCat.classList.remove("hidden");
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


// ________________________________
// Function capturar largo pantalla
// --------------------------------
// const largoVent = () => {
// const altoVentana = 
// return (altoVentana);
// }


// ______________________________
// Función  Activar Ventana Modal
// ------------------------------
const activarVentMod = (contenAActivar) => {
    let alto = document.documentElement.scrollHeight;
    console.log('ventana modal está oculta:', $contVentanaModal.classList.contains("hidden"))
    if (!($contVentanaModal.classList.contains("hidden"))) {
        console.log('SIIII está visible la ventana modal');
        $contVentanaModal.style.zIndex = 8;
        contenAActivar.style.zIndex = 10;
    } else {
        console.log('NOOOO está visible la ventana modal');
        $contVentanaModal.style.zIndex = 4;
        contenAActivar.style.zIndex = 6;
    }
    $contVentanaModal.style.height = `${alto}px`;
    $contVentanaModal.classList.remove("hidden");
    alto = alto - 150;
    let margenInferior = window.innerHeight + window.scrollY; //Largo de la ventana
    contenAActivar.style.bottom = `${window.innerHeight - margenInferior + 300}px`; // Establecer la posición de "caja" a 300px del margen inferior
    contenAActivar.classList.remove("hidden");
    return alto;
}

// ___________________________________
// Llamado para restaurar las categorías
// -----------------------------------
recuperar("categorias");
iniciaCategorias();





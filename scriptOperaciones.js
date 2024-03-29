// ___________________
// Variables generales
// -------------------
const $contenedorMenuInicio = document.getElementById("cont-menu-inicio");
let $btnIngOp = document.getElementById("btn-ing-op");
let $descripcionOperInput = document.getElementById("descripcion-oper-input");
let $montoOperInput = document.getElementById("monto-oper-input");
let $tipoOperSelect = document.getElementById("tipo-oper-select");
let $categoriaOperSelect = document.getElementById("categoria-oper-select");
let $fechaOperInput = document.getElementById("fecha-oper-input");
$fechaOperInput.valueAsDate = new Date(); 
let $btnGrabarOp = document.getElementById("btn-grabar-op");
let $btnCancOp = document.getElementById("btn-canc-op");
const $contEditarOperacion = document.getElementById("cont-editar-operacion");
const $btnModificarOp = document.getElementById("btn-modificar-op");
let $btnCancOp2 = document.getElementById("btn-canc-op-2");
const $mjeMontoCero = document.getElementById("mje-monto-cero");
const $cerrarMontoCero = document.getElementById("cerrar-monto-cero");
const $conten_menuOperaciones = document.getElementById("cont-menu-operaciones");
const $titNuevaOp = document.getElementById("tit-nueva-op");
const $titEditOp = document.getElementById("tit-edit-op");
const $btnsNuevaOp = document.getElementById("btns-nueva-op");
const $btnsEditOp = document.getElementById("btns-edit-op");
const $conten_menuBalance = document.getElementById("cont-menu-balance");
let categorias_LS;
let operaciones_LS = '[]';
let idEnCurso;
let operaciones = [];
let operacion = {};
let $menuBalance = document.getElementById("menu-balance"); //botón que activa el bloque de balances y filtros
let $contSinOperaciones = document.getElementById("cont-sin-operaciones");
let $contConOperaciones = document.getElementById("cont-con-operaciones");
let $conOperListado = document.getElementById("con-oper-listado");
let $filaTablaOperaciones = document.getElementById("fila-tabla-operaciones");
let $celdaDescripcion = document.getElementById("celda-descripcion");
let $celdaCategoria = document.getElementById("celda-categoria");
let $celdaFecha = document.getElementById("celda-fecha");
let $celdaMonto = document.getElementById("celda-monto");
let $celdaAcciones = document.getElementById("celda-acciones");


// _______________________________________________________
// Función que inicializa el array de operaciones en el LS
// -------------------------------------------------------
const inicializarOperaciones = () => {
    let hayOper = recuperar("operaciones");

    if (hayOper === null) {
        grabar("operaciones", operaciones)
    }
}


// __________________________________________
// Llamado a inicializar el array Operaciones en LS
// ------------------------------------------
inicializarOperaciones();


// _____________________________
// Funcion borrar Inputs, select
// -----------------------------
const borrarInputs = () => {
    $descripcionOperInput.value = "";
    $montoOperInput.value = "";
    $fechaOperInput.value = "";
    $fechaOperInput.value = inicializarFechaInput("fecha-oper-input", "noRestarMes");  //  input date con fecha actual
}


// ____________________________
// Evento botón Nueva Operación
// ----------------------------
$btnIngOp.addEventListener("click", () => {
    ingresarCategSelect();
    operacion.id = uuidv4();
    mostrar($conten_menuOperaciones);
    $titNuevaOp.classList.remove("hidden");
    $titEditOp.classList.add("hidden");
    $btnsNuevaOp.classList.remove("hidden");
    $btnsEditOp.classList.add("hidden");
    borrarInputs();
});


// ________________________________
// Evento Ingreso fecha en el input
// --------------------------------
$fechaOperInput.addEventListener('change', () => {  
    tomarFechaInput($fechaOperInput.value, 'ingreso', 'DIA');
});


// ________________________________
// Función tomar datos de los input
// --------------------------------
const tomarData = (id, tipoOper) => {
    categorias_LS = recuperar("categorias");
    operacion.id = id;
    operacion.descripcion = $descripcionOperInput.value;
    operacion.monto = parseFloat($montoOperInput.value);
    operacion.tipo = $tipoOperSelect.value;
    let categAux = $categoriaOperSelect.value.trim();
    operacion.fecha = tomarFechaInput($fechaOperInput.value, tipoOper, 'AÑO');
    categorias_LS.forEach((categ) => {
        if (categAux === categ.nombre) {
            operacion.categoria = categ.id;
        }
    })
    return operacion;
}


// ___________________________________________________________________
// Evento - Boton cerrar mensaje por monto cero o falta de descripción
// -------------------------------------------------------------------
$cerrarMontoCero.addEventListener('click', () => {
    $mjeMontoCero.classList.add("hidden");
    $contVentanaModal.classList.add("hidden");
});


// _____________________________________
// Evento botón Cancelar Nueva Operación
// -------------------------------------
$btnCancOp.addEventListener('click', () => { mostrar($conten_menuBalance) });


// __________________________________________
// Eventos botones Cancelar Edición Operación
// ------------------------------------------
$btnCancOp2.addEventListener('click', () => { mostrar($conten_menuBalance) });


// __________________________________
// Función mostrar datos en los input
// ----------------------------------
const mostrarDataInput = (id) => {
    operaciones_LS = recuperar("operaciones");
    categorias_LS = recuperar("categorias");
    let operacion = operaciones_LS.find((operacion) => operacion.id === id);
    if (!operacion) { return }
    $descripcionOperInput.value = operacion.descripcion;
    $montoOperInput.value = operacion.monto;
    $tipoOperSelect.value = operacion.tipo;
    let categ = categorias_LS.find((categoria) => operacion.categoria === categoria.id);
    $categoriaOperSelect.value = " " + categ.nombre;
    let fechaAux = tomarFechaInput(operacion.fecha, 'ingreso', 'DIA');
    $fechaOperInput.value = formatearFecha(fechaAux);
}


let fechaFormateada;
// ______________________________________________________________________________________________
// Función para mostrar fecha en input con formato dd/MM/aaaa desde LS (que está en formato aaaa)
// ----------------------------------------------------------------------------------------------
const formatearFecha = (fecha) => {
    let partes = fecha.split('/');
    let fechaNueva = `${partes[2]}-${partes[1].padStart(2, '0')}-${partes[0].padStart(2, '0')}`;
    return fechaNueva;
};


// __________________________________________________
// Funcion para tomar fecha del input y guardar en LS
// --------------------------------------------------
const tomarFechaInput = (fecha, tarea, orden) => {
    if (tarea === 'ingreso') {
        fecha = fecha.replace(/-/g, '/');
    }
    // Asegurarse de que la fecha esté en formato 'aaaa/mm/dd'
    let partesFecha = fecha.split('/');
    if (partesFecha.length !== 3) { return; }
    let anio = partesFecha[0];
    let mes = partesFecha[1].padStart(2, '0');
    let dia = partesFecha[2].padStart(2, '0');

    let fechaFormateada = anio + '-' + mes + '-' + dia;
    let fechaObjeto = new Date(fechaFormateada);

    if (isNaN(fechaObjeto.getTime())) { return; }

    let formatoFecha;
    if (orden === 'DIA') {
        formatoFecha = dia + '/' + mes + '/' + anio;
    } else {
        formatoFecha = anio + '/' + mes + '/' + dia;
    }
    return formatoFecha;
}


let array;
// ______________________________________________
// Función que arma la tabla con los datos del LS
// ----------------------------------------------
const completarTablaOperaciones = (array) => {
    $conOperListado.innerHTML = " ";
    if (array.length > 0) {
        document.getElementById("cont-sin-oper").classList.add("hidden");
        document.getElementById("cont-con-oper").classList.remove("hidden");
        let i = 0;
        let fechaMostrar;
        categorias_LS = recuperar("categorias");
        array.forEach((operacion) => {
            fechaMostrar = tomarFechaInput(operacion.fecha, 'mostrar desde LS', 'DIA');
            i++;
            categorias_LS.forEach((categoria) => {
                if (categoria.id === operacion.categoria) {
                    operacion.categoria = categoria.nombre;
                    return operacion.categoria;
                }
            });

            if (operacion.tipo === "GANANCIA") {
                $conOperListado.innerHTML += `        
                <div class="h-[2px] bg-slate-100 my-[4px]"></div>    
                <div id="fila-tabla-operaciones" class="flex flex-col sm:flex-row justify-between gap-1 w-full h-[70px] sm:h-[40px]">
                    <div id="decr-categ" class= "flex justify-between items-center w-full sm:w-[45%] gap-3">
                        <div id="celdaDescripcion" class="sm:my-[10px] w-[66.7%] flex justify-start items-center text-[12px]">${operacion.descripcion}</div>
                        <div id="celdaCategoria" class="sm:my-[5px] h-[35px] px-2 w-[106px] flex justify-center items-center text-[10px] bg-zinc-200 dark:bg-gray-200 p-1 rounded-lg shadow-inner text-cyan-700 font-bold"> ${operacion.categoria}</div>
                    </div>
                    <div id="celdaFecha" class="hidden items-center sm:flex sm:my-[10px] w-[70px] flex justify-end text-[12px]">${fechaMostrar}</div>
                    <div id="monto-botones" class="flex flex-row justify-between sm:my-[10px] mb-[17px] w-[full] sm:w-[220px] gap-3">
                        <div id="celdaMonto${i}" class="w-[170px] flex items-center sm:justify-end text-[15px] text-verde font-bold">
                            <span class="text-[12px]">+</span>$${formatPesos(operacion.monto)}
                        </div>
                        <div id="celdaAcciones${i}" class="w-[85px] flex items-center justify-end gap-1 lg:mr-3"></div>
                    </div>
                </div>`;
            } else {
                $conOperListado.innerHTML += `        
                <div class="h-[2px] bg-slate-100 my-[4px]"></div>
                <div id="fila-tabla-operaciones" class="flex flex-col sm:flex-row justify-between gap-1 sm:gap-2 w-full h-[72px] sm:h-[40px]">
                    <div id="decr-categ" class= "flex justify-between items-center w-full sm:w-[45%] gap-3">
                        <div id="celdaDescripcion" class="sm:my-[10px] w-[66.7%] flex justify-start items-center text-[12px] sm:text[15px]">${operacion.descripcion}</div>
                        <div id="celdaCategoria" class="sm:my-[5px] h-[35px] px-2 w-[106px] flex justify-center items-center text-[10px] bg-zinc-200 dark:bg-gray-200 p-1 rounded-lg shadow-inner text-cyan-700 font-bold"> ${operacion.categoria}</div>
                    </div>
                    <div id="celdaFecha" class="hidden items-center sm:flex sm:my-[10px] w-[70px] flex justify-end text-[12px]">${fechaMostrar}</div>
                    <div id="monto-botones" class="flex flex-row justify-between sm:my-[10px] mb-[17px] w-[full] sm:w-[220px] gap-3">
                        <div id="celdaMonto${i}" class="w-[170px] flex items-center sm:justify-end text-[15px] text-rojo font-bold">
                            <span class="text-[12px]">-</span>$${formatPesos(operacion.monto)}
                        </div>
                        <div id="celdaAcciones${i}" class="w-[85px] flex items-center justify-end gap-1 lg:mr-3"></div>
                    </div>
                </div>`;
            };
        });

        for (let i = 0; i < array.length; i++) {
            let btnEditarOper = document.createElement("button");
            btnEditarOper.innerHTML = '<i class="fa-regular fa-pen-to-square"></i>';
            let operacionIdEdit = array[i].id;
            btnEditarOper.name = `btn-editar-oper`;
            btnEditarOper.id = `${operacionIdEdit}`;
            btnEditarOper.classList.add("flex-shrink-0", "h-8", "px-2", "lg:px-2", "rounded-lg", "bg-zinc-200", "border-2", "dark:bg-gray-200", "shadow-inner", "hover:bg-cyan-700/25", "focus:bg-blue-200", "shadow-inner:lg", "hover:dark:bg-cyan-700/25", "focus:dark:bg-gray-400", "hover:shadow-md", "focus:shadow-md");
            btnEditarOper.addEventListener("click", () =>
                editarOperacion(btnEditarOper.id)
            );
            let btnBorrarOper = document.createElement("button");
            btnBorrarOper.innerHTML = '<i class="fa-regular fa-trash-can"></i>';
            let operacionIdBorr = array[i].id;
            btnBorrarOper.name = `btn-borrar-oper`;
            btnBorrarOper.id = `${operacionIdBorr}`;
            btnBorrarOper.classList.add("flex-shrink-0", "h-8", "px-2", "lg:px-2", "rounded-lg", "bg-zinc-200", "border-2", "dark:bg-gray-200", "shadow-inner", "hover:bg-cyan-700/25", "focus:bg-blue-200", "shadow-inner:lg", "hover:dark:bg-cyan-700/25", "focus:dark:bg-gray-400", "hover:shadow-md", "focus:shadow-md");
            btnBorrarOper.addEventListener("click", () => {
                confirmBorrarOper(btnBorrarOper.id);
            }

            );
            let celdaAcciones = document.getElementById(`celdaAcciones${i + 1}`);
            celdaAcciones.appendChild(btnEditarOper);
            celdaAcciones.appendChild(btnBorrarOper);
        }
    } else {
        document.getElementById("cont-con-oper").classList.add("hidden");
    }
};


// _________________________________________________________
// Función controles monto !== 0 y descripcion con contenido
// ---------------------------------------------------------
const controlMontoDescripcion = () => {
    const monto = parseFloat($montoOperInput.value);
    const descripcion = $descripcionOperInput.value.trim();
    return monto > 0 && descripcion !== "";
}


// ______________________________
// Evento botón  grabar operacion
// ------------------------------
$btnGrabarOp.addEventListener('click', () => {
    operaciones_LS = recuperar("operaciones");
    operacion.id = uuidv4();
    operacion = tomarData(operacion.id, 'ingreso');
    let puedoGrabar = controlMontoDescripcion();
    if (puedoGrabar) {
        operaciones_LS.push(operacion);
        grabar("operaciones", operaciones_LS);
        mostrar($conten_menuBalance);
        filtrar_oper(); //VER SCRIPT.JS
    } else {
        $conten_menuOperaciones.classList.remove("hidden");
        activarVentMod($mjeMontoCero);
    }
})

// ______________________________________________________
// Función Confirmación Borrar Operación
// ------------------------------------------------------
let $mjeConfirmBorrarOp = document.getElementById("mje-confirm-borrar-op");
let $opBorrar = document.getElementById("op-borrar");
let $contSinOper = document.getElementById("cont-sin-oper");
const confirmBorrarOper = (id) => {
    operaciones_LS = recuperar("operaciones");
    operacion = operaciones_LS.find((op) => op.id === id);
    operacion.fecha = tomarFechaInput(operacion.fecha, "ingreso", "DIA");
    $opBorrar.innerHTML = `<div id="op-borrar">
					<p class="text-center">Descripcion: ${operacion.descripcion}</p>
					<p class="text-center">Monto: ${formatPesos(operacion.monto)}</p>
					<p class="text-center">Fecha: ${operacion.fecha}</p>
				</div>`;
    activarVentMod($mjeConfirmBorrarOp);
    let $noBorrarOp = document.getElementById("no-borrar-op");
    $noBorrarOp.addEventListener('click', () => {
        $contVentanaModal.classList.add("hidden");
        $mjeConfirmBorrarOp.classList.add("hidden");
    })
    let $siBorrarOp = document.getElementById("si-borrar-op");
    $siBorrarOp.addEventListener('click', () => {
        $contVentanaModal.classList.add("hidden");
        $mjeConfirmBorrarOp.classList.add("hidden");
        borrarOperacion(id);
        operaciones_LS = recuperar("operaciones");
        if (operaciones_LS.length < 1) {
            ocultar_filtros.classList.remove("hidden");
            $contSinOper.classList.remove("hidden");
        }
    });
}


// ______________________________________________________
// Evento boton Borrar Operación
// ------------------------------------------------------
const borrarOperacion = (id) => {
    operaciones_LS = recuperar("operaciones");
    operaciones_LS = operaciones_LS.filter(operacion => operacion.id !== id);
    grabar("operaciones", operaciones_LS);
    mostrar($conten_menuBalance);
    filtrar_oper(); //VER SCRIPT.JS
    completarTablaOperaciones(operaciones_LS);
}


// ______________________________________________________
// Evento boton Editar Operación
// ------------------------------------------------------
let arrayListo;
const editarOperacion = (idOp) => {
    ingresarCategSelect(); 
    mostrar($conten_menuOperaciones);
    $titNuevaOp.classList.add("hidden");
    $titEditOp.classList.remove("hidden");
    $btnsEditOp.classList.remove("hidden");
    $btnsNuevaOp.classList.add("hidden");
    let operaciones_LSEdit = recuperar("operaciones");
    mostrarDataInput(idOp);
    index = "";
    idEnCurso = "";
    $btnModificarOp.addEventListener("click", () => {
        index = operaciones_LSEdit.findIndex(
            (operacion) => operacion.id === idOp
        );
        idEnCurso = operaciones_LSEdit[index].id;
        if (index !== -1) {
            let operacionEdit = tomarData(idOp, "ingreso");
            let puedoGrabar = controlMontoDescripcion();
            if (puedoGrabar) {
                arrayListo = [
                    ...operaciones_LSEdit.slice(0, index), 
                    operacionEdit, 
                    ...operaciones_LSEdit.slice(index + 1), 
                ];
                grabar("operaciones", arrayListo);
                mostrar($conten_menuBalance);
                filtrar_oper(); 
            }
            else {
                $conten_menuOperaciones.classList.remove("hidden");
                activarVentMod($mjeMontoCero);
            }
        }
    });
};


// _______________________________________
// llamado de funcion mostrar de script.js
// ---------------------------------------
document.addEventListener('DOMContentLoaded', function () {
    mostrar($contenedorMenuInicio); 
});


// ________________________________________________________________
// Muestra opciones de categorias en el select para elegir la categ
// ----------------------------------------------------------------
const ingresarCategSelect = () => {
    categorias_LS = recuperar("categorias");
    $categoriaOperSelect.innerHTML = "";
    for (let i = 0; i < categorias_LS.length; i++) {
        $categoriaOperSelect.innerHTML += `<option value =" ${categorias_LS[i].nombre}">${categorias_LS[i].nombre}</option>`;
    }
}


// _____________________________________________________
// Inicialización de opciones de categorías en el select
// -----------------------------------------------------
ingresarCategSelect();








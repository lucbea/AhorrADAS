// _______________________________________________________
// Función que inicializa el array de operaciones en el LS
// -------------------------------------------------------
const inicializarOperaciones = () => {
    if (localStorage.getItem("operaciones") === null) {
        localStorage.setItem("operaciones", JSON.stringify([]))
    }
}
// Inicialización del array Operaciones en LS
inicializarOperaciones();


// ___________________
// Variables generales
// -------------------
const $contenedorMenuInicio = document.getElementById("cont-menu-inicio");
let $botonIngresoOperacion = document.getElementById("boton-ingreso-operacion");
// boton para activar pantalla de ingreso de nueva operación
let $descripcionOperInput = document.getElementById("descripcion-oper-input");
let $montoOperInput = document.getElementById("monto-oper-input");
let $tipoOperSelect = document.getElementById("tipo-oper-select");
let $categoriaOperSelect = document.getElementById("categoria-oper-select");
let $fechaOperInput = document.getElementById("fecha-oper-input");
let $botonGrabarOperacion = document.getElementById("boton-grabar-operacion");
let $botonCancelarOperacion = document.getElementById("boton-cancelar-operacion");
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
// console.log(operaciones_LS);
// let id;
// let descripcion;
// let monto;
let operaciones = [
    // { id: '1', descripcion: 'asd', monto: 5000, tipo: 'ganancia', categoria: "comida", fecha: '24 /02 / 2024' },
    // { id: '2', descripcion: "objeto 2", monto: 2000, tipo: "ganancia", categoria: "salidas", fecha: "25/02/2024" },
    // { id: 3, descripcion: "objeto 3", monto: 3000, tipo: "ganancia", categoria: "salidas", fecha: "23/02/2024" }
];
let operacion = {};


// ________________________
// Guardar en Local Storage  ESTÁ
// ------------------------
const grabarLS = (locacion, dato) => localStorage.setItem(locacion, JSON.stringify(dato));


// ___________________________
// Recuperar del Local Storage  ESTÁ
// ---------------------------
const recuperarLS = (locacion) => {
    let datosLS;
    datosLS = JSON.parse(localStorage.getItem(locacion));
    // console.log(locacion, datosLS);
    return datosLS;
}


// _____________________________
// Funcion borrar Inputs, select
// -----------------------------
const borrarInputs = () => {
    $descripcionOperInput.value = " ";
    $montoOperInput.value = 0;
    $tipoOperSelect.value = " ";
    $categoriaOperSelect.value = " ";
    // console.log(operacion.fecha);
    // let fechaGuardada = formatearFecha(operacion.fecha);
    // let fechaAux = mostrarFechaInput(fechaGuardada);
    $fechaOperInput.value = formatearFecha(operacion.fecha);
    // console.log($fechaOperInput, $fechaOperInput.value)
}


// ____________________________
// Evento botón Nueva Operación
// ----------------------------
$botonIngresoOperacion.addEventListener("click", () => {
    console.log('voy a ingresar nueva operacion')
    mostrar($conten_menuOperaciones);
    $titNuevaOp.classList.remove("hidden");
    $titEditOp.classList.add("hidden");
    $btnsNuevaOp.classList.remove("hidden");
    $btnsEditOp.classList.add("hidden");
    borrarInputs();
});

// Ingresos datos de nueva operación
$descripcionOperInput.addEventListener('input', () => console.log($descripcionOperInput.value));
$montoOperInput.addEventListener('input', () => {
    if ($montoOperInput.value == 0) { console.log('el monto es 0, no se puede grabar esta operación') }
    else { console.log($montoOperInput.value) }
});
$tipoOperSelect.addEventListener('input', () => console.log($tipoOperSelect.value));
$categoriaOperSelect.addEventListener('input', () => console.log($categoriaOperSelect.value));
$fechaOperInput.addEventListener('input', () => {
    console.log($fechaOperInput.value);
    mostrarFechaInput($fechaOperInput.value);
});


// ________________________________
// Función tomar datos de los input
// --------------------------------
const tomarData = () => {
    // operacion.id = uuidv4();
    operacion.descripcion = $descripcionOperInput.value;
    operacion.monto = $montoOperInput.value;
    operacion.tipo = $tipoOperSelect.value;
    operacion.categoria = $categoriaOperSelect.value;
    operacion.fecha = mostrarFechaInput($fechaOperInput.value);
    // operacion.fecha = $fechaOperInput.value;
    console.log('terminé func tomarData:', operacion);
    return operacion;
}


// Evento botón Cancelar Nueva Operación
$botonCancelarOperacion.addEventListener('click', () => {
    console.log('apreté botón cancelar');
    mostrar($conten_menuBalance)
}
);

// Eventos botones Cancelar Edición Operación
$btnCancOp2.addEventListener('click', () => {
    console.log('apreté botón cancelar');
    mostrar($conten_menuBalance);
}
);

// const mostrarDataInput = (id) => {

//     operaciones_LS = recuperarLS("operaciones");
//     operacion = operaciones_LS.filter((id)=>{
//         operaciones_LS.id === id})
//     console.log('estoy en mostrarDataInput:', id, operacion.id, operacion.descripcion);

// }

const mostrarDataInput = (id) => {
    operaciones_LS = recuperarLS("operaciones");
    // Usar find en lugar de filter, ya que filter devuelve un array y find devuelve el primer elemento que cumple la condición
    let operacion = operaciones_LS.find((operacion) => operacion.id === id);
    if (!operacion) {
        console.error('No se encontró la operación con el ID proporcionado');
        return;
    }
    $descripcionOperInput.value = operacion.descripcion;
    $montoOperInput.value = operacion.monto;
    $tipoOperSelect.value = operacion.tipo;
    $categoriaOperSelect.value = operacion.categoria;
    console.log(operacion.fecha);
    // let fechaGuardada = formatearFecha(operacion.fecha);
    // let fechaAux = mostrarFechaInput(fechaGuardada);
    $fechaOperInput.value = formatearFecha(operacion.fecha);
    console.log($fechaOperInput, $fechaOperInput.value);
    // $fechaOperInput.valueAsDate = new Date(fechaAux);
    // console.log('estoy en mostrarDataInput:', id, operacion.fecha, operacion.descripcion, fechaAux);
    // alert();
    // operacion.fecha = $fechaOperInput.value;    
}


$botonGrabarOperacion.addEventListener('click', () => {
    // ingresarCategSelect();
    operaciones_LS = recuperarLS("operaciones");
    console.log(operaciones_LS);
    tomarData();
    console.log('volví', operacion);
    operaciones_LS.push(operacion);
    console.log('operacion', operacion, 'operaciones', operaciones_LS);
    // controlMonto ($montoOperInput.value);
    grabarLS("operaciones", operaciones_LS);
    console.log('voy a borrar el input de descripcion')
    mostrar($conten_menuBalance);
    console.log('voy a funcion completarTablaOperaciones');
    completarTablaOperaciones(operaciones_LS);
})

// const $contenVentanaModal = document.getElementById("cont-ventana-modal");
// const controlMonto = (monto) => {
//     if (monto === 0) {
//         activarVentMod($mjeMontoCero);
//     }
// }
// nombNuevaCateg = nombNuevaCateg.slice(0, 14);
// ___________________________________________
// Función fecha - convertir fecha para grabar
// ------------------------------------------
let fechaFormateada;

// const formatearFecha = (fecha) => {
//     let partes = fecha.split('/');
//     return `${partes[2]}-${partes[1].padStart(2, '0')}-${partes[0].padStart(2, '0')}`;
// };


// ___________________________________________________________________
// Función para mostrar fecha en input con formato dd/MM/aaaa desde LS
// -------------------------------------------------------------------
const formatearFecha = (fecha) => {
    let partes = fecha.split('/');
    let fechaNueva = `${partes[2]}-${partes[1].padStart(2, '0')}-${partes[0].padStart(2, '0')}`;
    return fechaNueva;
};

// __________________________________________________
// Funcion para tomar fecha del input y guardar en LS
// --------------------------------------------------
const mostrarFechaInput = (fecha) => {
    // Asegurarse de que la fecha esté en formato 'yyyy-mm-dd'
    let partesFecha = fecha.split('/');
    console.log('partesFecha', partesFecha);
    fechaFormateada = partesFecha[2] + '-' + partesFecha[1] + '-' + partesFecha[0];
    console.log('fecha formateada', fechaFormateada);

    let fechaObjeto = new Date(fechaFormateada);// Necesita esta conversión para aplicar el getTime a continuación
    if (isNaN(fechaObjeto.getTime())) {
        console.error('La fecha no es válida');
        return;
    }
    let dia = fechaObjeto.getDate().toString().padStart(2, '0');
    console.log('dia', dia)
    let mes = (fechaObjeto.getMonth() + 1).toString().padStart(2, '0'); // Sumar 1 al mes porque los meses van de 0 a 11
    console.log('mes', mes)
    let anio = fechaObjeto.getFullYear();
    console.log('anio', anio);
    let formatoFecha = dia + '/' + mes + '/' + anio;
    console.log('terminé func mostrarFechaInput', formatoFecha);
    return formatoFecha;
}








const completarTablaOperaciones = (array) => {
    operaciones_LS = recuperarLS("operaciones");
    // console.log(operaciones_LS);
    let btnEditarOper;
    let operacionId;
    $conOperListado.innerHTML = " ";
    if (operaciones_LS.length > 0) {
        // console.log('tengo operaciones para mostrar', operaciones_LS)
        document.getElementById("cont-sin-oper").classList.add("hidden");
        document.getElementById("cont-con-oper").classList.remove("hidden");
        let i = 0;
        operaciones_LS.forEach(operacion => {
            i++;
            $conOperListado.innerHTML += `        
                <div class="h-[2px] bg-slate-100 my-[4px]"></div>    
                <div id="fila-tabla-operaciones" class="flex flex-col sm:flex-row justify-between gap-3 w-full h-[70px] sm:h-[40px]">
                    <div id="celdaDescripcion" class="sm:my-[10px] w-[66.7%] flex justify-start items-center text-[15px]">${operacion.descripcion}</div>
                    <div id="celdaCategoria" class="sm:my-[5px] h-[35px] px-2 w-[33,3%] flex justify-center items-center text-[10px] bg-zinc-100 dark:bg-gray-300 p-1 rounded-lg shadow-inner">${operacion.categoria}</div>
                    <div id="celdaFecha" class="hidden items-center sm:flex sm:my-[10px] w-[130px] flex justify-end text-[12px]">${operacion.fecha}</div>
                    <div id="celdaMonto" class="w-[220px] flex items-center sm:justify-end text-[15px]">${operacion.monto}</div>
                    <div id="celdaAcciones${i}" class="w-[85px] flex items-center justify-end lg:gap-1"></div>
                </div>
            `;
        });
        for (let i = 0; i < operaciones_LS.length; i++) {
            let btnEditarOper = document.createElement("button");
            btnEditarOper.innerHTML = '<i class="fa-regular fa-pen-to-square"></i>';
            let operacionIdEdit = operaciones_LS[i].id;
            btnEditarOper.name = `btn-editar-oper`;
            btnEditarOper.id = `${operacionIdEdit}`;
            btnEditarOper.classList.add("flex-shrink-0", "h-8", "px-2", "lg:px-2", "rounded-lg", "bg-blue-100", "hover:bg-blue-200", "focus:bg-blue-200", "shadow-inner:lg", "hover:dark:bg-gray-400", "focus:dark:bg-gray-400", "hover:shadow-md", "focus:shadow-md");
            btnEditarOper.addEventListener('click', () => editarOperacion(operaciones_LS[i].id));

            let btnBorrarOper = document.createElement("button");
            btnBorrarOper.innerHTML = '<i class="fa-regular fa-trash-can"></i>';
            let operacionIdBorr = operaciones_LS[i].id;
            btnBorrarOper.name = `btn-borrar-oper`;
            btnBorrarOper.id = `${operacionIdBorr}`;
            btnBorrarOper.classList.add("flex-shrink-0", "h-8", "px-2", "lg:px-2", "rounded-lg", "bg-blue-100", "hover:bg-blue-200", "focus:bg-blue-200", "shadow-inner:lg", "hover:dark:bg-gray-400", "focus:dark:bg-gray-400", "hover:shadow-md", "focus:shadow-md");
            btnBorrarOper.addEventListener('click', () => borrarOperacion(operacionIdBorr));
            let celdaAcciones = document.getElementById(`celdaAcciones${i + 1}`);
            // console.log(celdaAcciones);
            celdaAcciones.appendChild(btnEditarOper);
            celdaAcciones.appendChild(btnBorrarOper);
        }
    } else {
        document.getElementById("cont-con-oper").classList.add("hidden");
        document.getElementById("cont-sin-oper").classList.remove("hidden");
        console.log("agregue alguna operación para mostrar");
    }
};


// ______________________________________________________
// Evento boton Borrar Operación
// ------------------------------------------------------
const borrarOperacion = (id) => {
    console.log('borraré la operación:', id);
    operaciones_LS = operaciones_LS.filter(operacion => operacion.id !== id);
    // for (let i = 0; i<operaciones_LS.length; i++){
    console.log(operaciones_LS);
    //   }
    grabarLS ("operaciones", operaciones_LS);
    mostrar($conten_menuBalance);
    completarTablaOperaciones(operaciones_LS);
}
// ______________________________________________________
// Evento boton Editar Operación
// ------------------------------------------------------
const $contEditarOperacion = document.getElementById("cont-editar-operacion");
const $btnGrabarOp2 = document.getElementById("btn-grabar-op-2");
let arrayListo;
const editarOperacion = (id) => {
    // mostrar($contEditarOperacion);
    console.log('voy a editar operacion con id: ', id);
    mostrar($conten_menuOperaciones);
    $titNuevaOp.classList.add("hidden");
    $titEditOp.classList.remove("hidden");
    $btnsEditOp.classList.remove("hidden");
    $btnsNuevaOp.classList.add("hidden");
    // alert();
    mostrarDataInput(id);
    $btnGrabarOp2.addEventListener('click', () => {
        index = operaciones_LS.findIndex((operacion) => operacion.id === id);
        console.log('indexde laoperacion a modificar:', index);
        if (index !== -1) {  // Verifica si se encontró el objeto con el id dado
            operacion.id = id;
            operacion = tomarData();
            arrayListo = [...operaciones_LS]; // Crea una copia del array
            arrayListo[index] = operacion; // Reemplaza el objeto en la posición index
            operaciones_LS = arrayListo; // Asigna el nuevo array a operaciones_LS
        }
        for (let i = 0; i < arrayListo.length; i++) {
            // console.log(arrayListo[i]);}
            grabarLS("operaciones", arrayListo);
            mostrar($conten_menuBalance);
            completarTablaOperaciones(arrayListo);
        }
    })
}


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

$menuBalance.addEventListener('click', () => {
    operaciones_LS = recuperarLS("operaciones");
    if (operaciones_LS) {
        completarTablaOperaciones(operaciones_LS);
    }
})

// llamado de funcion mostrar de script.js
document.addEventListener('DOMContentLoaded', function () {
    mostrar($contenedorMenuInicio); // Llama a la función desde script.js
    // activarVentMod ();

});








// Inicialización fecha del menú Ingreso Operación
// let fechaActual = new Date();
// mostrarFechaInput(fechaActual);
$fechaOperInput.valueAsDate = new Date();



// Para trabajar tabla --->> luego SACAR
completarTablaOperaciones(operaciones_LS);


// ________________________________________________________________
// Muestra opciones de categorias en el select para elegir la categ
// ----------------------------------------------------------------
const ingresarCategSelect = () => {
    // categorias_LS = recuperarLS("categorias");
    categorias_LS = recuperarLS("categorias");
    $categoriaOperSelect.innerHTML = "";
    for (let i = 0; i < categorias_LS.length; i++) {
        $categoriaOperSelect.innerHTML += `<option value =" ${categorias_LS[i].nombre}">${categorias_LS[i].nombre}</option>`;
    }
}
// Inicialización de opciones de categorías en el select
ingresarCategSelect();







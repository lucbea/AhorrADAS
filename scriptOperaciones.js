// _______________________________________________________
// Función que inicializa el array de operaciones en el LS
// -------------------------------------------------------
const inicializarOperaciones = () => {
    if (localStorage.getItem("operaciones") === null) {
        localStorage.setItem("operaciones", JSON.stringify([]))
    }
}

// __________________________________________
// Inicialización del array Operaciones en LS
// ------------------------------------------
inicializarOperaciones();


// ___________________
// Variables generales
// -------------------
const $contenedorMenuInicio = document.getElementById("cont-menu-inicio");
let $btnIngOp = document.getElementById("btn-ing-op");
// boton para activar pantalla de ingreso de nueva operación
let $descripcionOperInput = document.getElementById("descripcion-oper-input");
let $montoOperInput = document.getElementById("monto-oper-input");
let $tipoOperSelect = document.getElementById("tipo-oper-select");
let $categoriaOperSelect = document.getElementById("categoria-oper-select");
let $fechaOperInput = document.getElementById("fecha-oper-input");
$fechaOperInput.valueAsDate = new Date(); //  input date con fecha actual
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
let operaciones = [
    // { id: "93e21f72-44ca-43aa-b990-02ffef336bdf", descripcion: "verid1", monto: "1", tipo: "GANANCIA", categoria: " COMIDA", fecha: "01/03/2024" },
    // { id: "116e96d5-26d8-4245-aaad-37ef5323a950", descripcion: "verdi2", monto: "2", tipo: "GASTO", categoria: " EDUCACION", fecha: "02/03/2024" },
    // { id: "b3e6fa79-1f8c-4687-b05a-712f29f9dbb6", descripcion: "verid3", monto: "3", tipo: "GANANCIA", categoria: " SALIDAS", fecha: "03/03/2024" },
    // { id: "e2dfc2d9-3586-4e75-bf20-3ea7f8f3ef50", descripcion: "verid4", monto: "4", tipo: "GASTO", categoria: " SERVICIOS", fecha: "04/03/2024" },
    // { id: "83c6269b-7226-4388-90c6-1f6a771486c7", descripcion: "verid5", monto: "5", tipo: "GANANCIA", categoria: " TRANSPORTE", fecha: "05/03/2024" },
    // { id: "1c98ac9c-988f-457a-a4f5-f9a6ccdb522e", descripcion: "verid6", monto: "6", tipo: "GASTO", categoria: " TRABAJO", fecha: "26/02/2024" },
    // { id: "3e33ed37-d4d2-4eb8-b784-bde48396699c", descripcion: "verid7", monto: "7", tipo: "GANANCIA", categoria: " COMIDA", fecha: "27/02/2024" },
];
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


// _____________________________
// Funcion borrar Inputs, select
// -----------------------------
const borrarInputs = () => {
    $descripcionOperInput.value = "";
    $montoOperInput.value = "";
    $fechaOperInput.valueAsDate = new Date(); //  input date con fecha actual
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
$fechaOperInput.addEventListener('input', () => {
    mostrarFechaInput($fechaOperInput.value);
});


// ________________________________
// Función tomar datos de los input
// --------------------------------
const tomarData = (id) => {
    operacion.id = id;
    operacion.descripcion = $descripcionOperInput.value;
    operacion.monto = $montoOperInput.value;
    operacion.tipo = $tipoOperSelect.value;
    operacion.categoria = $categoriaOperSelect.value;
    operacion.fecha = mostrarFechaInput($fechaOperInput.value);
    return operacion;
}


// _____________________________________
// Evento botón Cancelar Nueva Operación
// -------------------------------------
$btnCancOp.addEventListener('click', () => {mostrar($conten_menuBalance)});


// __________________________________________
// Eventos botones Cancelar Edición Operación
// ------------------------------------------
$btnCancOp2.addEventListener('click', () => {mostrar($conten_menuBalance)});


// __________________________________
// Función mostrar datos en los input
// ----------------------------------
const mostrarDataInput = (id) => {
    operaciones_LS = recuperar("operaciones");
    // Usar find en lugar de filter, ya que filter devuelve un array y find devuelve el primer elemento que cumple la condición
    let operacion = operaciones_LS.find((operacion) => operacion.id === id);
    if (!operacion) {return}
    $descripcionOperInput.value = operacion.descripcion;
    $montoOperInput.value = operacion.monto;
    $tipoOperSelect.value = operacion.tipo;
    $categoriaOperSelect.value = operacion.categoria;
    $fechaOperInput.value = formatearFecha(operacion.fecha);
}


// ______________________________
// Evento botón  grabar operacion
// ------------------------------
$btnGrabarOp.addEventListener('click', () => {
    operaciones_LS = recuperar("operaciones");
    operacion.id = uuidv4();
    operacion = tomarData(operacion.id);
    operaciones_LS.push(operacion);
    grabar("operaciones", operaciones_LS);
    mostrar($conten_menuBalance);
    completarTablaOperaciones(operaciones_LS);
})


let fechaFormateada;
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
    fechaFormateada = partesFecha[2] + '-' + partesFecha[1] + '-' + partesFecha[0];
    let fechaObjeto = new Date(fechaFormateada);// Necesita esta conversión para aplicar el getTime a continuación
    if (isNaN(fechaObjeto.getTime())) {
        console.error('La fecha no es válida');
        return;
    }
    let dia = fechaObjeto.getDate().toString().padStart(2, '0');
    let mes = (fechaObjeto.getMonth() + 1).toString().padStart(2, '0'); // Sumar 1 al mes porque los meses van de 0 a 11
    let anio = fechaObjeto.getFullYear();
    let formatoFecha = dia + '/' + mes + '/' + anio;
    return formatoFecha;
}


// ______________________________________________
// Función que arma la tabla con los datos del LS
// ----------------------------------------------
const completarTablaOperaciones = (array) => {
    // let operacionId;
    $conOperListado.innerHTML = " ";
    if (array.length > 0) {
        document.getElementById("cont-sin-oper").classList.add("hidden");
        document.getElementById("cont-con-oper").classList.remove("hidden");
        let i = 0;
        array.forEach(operacion => {
            i++;
            $conOperListado.innerHTML += `        
                <div class="h-[2px] bg-slate-100 my-[4px]"></div>    
                <div id="fila-tabla-operaciones" class="flex flex-col sm:flex-row justify-between gap-1 w-full h-[70px] sm:h-[40px]">
                    <div id="decr-categ" class= "flex justify-between items-center w-full sm:w-[45%] gap-3">
                        <div id="celdaDescripcion" class="sm:my-[10px] w-[66.7%] flex justify-start items-center text-[15px]">${operacion.descripcion}</div>
                        <div id="celdaCategoria" class="sm:my-[5px] h-[35px] px-2 w-[33,3%] flex justify-center items-center text-[10px] bg-zinc-100 dark:bg-gray-200 p-1 rounded-lg shadow-inner">${operacion.categoria}</div>
                    </div>
                    <div id="celdaFecha" class="hidden items-center sm:flex sm:my-[10px] w-[130px] flex justify-end text-[12px]">${operacion.fecha}</div>
                    <div id="monto-botones" class="flex flex-row justify-between sm:my-[10px] mb-[17px] w-[full] sm:w-[29%] gap-3">
                        <div id="celdaMonto" class="w-[220px] flex items-center sm:justify-end text-[15px]">${operacion.monto}</div>
                        <div id="celdaAcciones${i}" class="w-[85px] flex items-center justify-end lg:gap-1"></div>
                    </div>
                </div>
            `;
        });
        for (let i = 0; i < array.length; i++) {
            let btnEditarOper = document.createElement("button");
            btnEditarOper.innerHTML = '<i class="fa-regular fa-pen-to-square"></i>';
            let operacionIdEdit = array[i].id;
            btnEditarOper.name = `btn-editar-oper`;
            btnEditarOper.id = `${operacionIdEdit}`;
            btnEditarOper.classList.add("flex-shrink-0", "h-8", "px-2", "lg:px-2", "rounded-lg", "bg-blue-100", "hover:bg-blue-200", "focus:bg-blue-200", "shadow-inner:lg", "hover:dark:bg-gray-400", "focus:dark:bg-gray-400", "hover:shadow-md", "focus:shadow-md");
            btnEditarOper.addEventListener('click', () => editarOperacion(btnEditarOper.id));
            let btnBorrarOper = document.createElement("button");
            btnBorrarOper.innerHTML = '<i class="fa-regular fa-trash-can"></i>';
            let operacionIdBorr = array[i].id;
            btnBorrarOper.name = `btn-borrar-oper`;
            btnBorrarOper.id = `${operacionIdBorr}`;
            btnBorrarOper.classList.add("flex-shrink-0", "h-8", "px-2", "lg:px-2", "rounded-lg", "bg-blue-100", "hover:bg-blue-200", "focus:bg-blue-200", "shadow-inner:lg", "hover:dark:bg-gray-400", "focus:dark:bg-gray-400", "hover:shadow-md", "focus:shadow-md");
            btnBorrarOper.addEventListener('click', () => borrarOperacion(operacionIdBorr));
            let celdaAcciones = document.getElementById(`celdaAcciones${i + 1}`);
            celdaAcciones.appendChild(btnEditarOper);
            celdaAcciones.appendChild(btnBorrarOper);
        }
    } else {
        document.getElementById("cont-con-oper").classList.add("hidden");
        document.getElementById("cont-sin-oper").classList.remove("hidden");
    }
};


// ______________________________________________________
// Evento boton Borrar Operación
// ------------------------------------------------------
const borrarOperacion = (id) => {
    operaciones_LS = operaciones_LS.filter(operacion => operacion.id !== id);
    grabar("operaciones", operaciones_LS);
    mostrar($conten_menuBalance);
    completarTablaOperaciones(operaciones_LS);
}


// ______________________________________________________
// Evento boton Editar Operación
// ------------------------------------------------------
let arrayListo;
const editarOperacion = (idOp) => {
    console.log('voy a ingresar categ seleccionada')
    ingresarCategSelect();
    let idOpEditar = idOp;    
    mostrar($conten_menuOperaciones);
    $titNuevaOp.classList.add("hidden");
    $titEditOp.classList.remove("hidden");
    $btnsEditOp.classList.remove("hidden");
    $btnsNuevaOp.classList.add("hidden");
    let operaciones_LSEdit = recuperar("operaciones")
    mostrarDataInput(idOpEditar);
    index = '';
    idEnCurso = '';
    $btnModificarOp.addEventListener('click', () => {       
        index = operaciones_LSEdit.findIndex((operacion) => operacion.id === idOpEditar);
        idEnCurso = operaciones_LSEdit[index].id;  
        if (index !== -1) {  // Verifica si se encontró el objeto con el id dado
            let operacionEdit = tomarData(idOpEditar);
            arrayListo = [
                ...operaciones_LSEdit.slice(0, index),  // elementos antes del índice
                operacionEdit,                      // elemento que quieres insertar/reemplazar
                ...operaciones_LSEdit.slice(index + 1)   // elementos después del índice
            ];
            grabar("operaciones", arrayListo);
            mostrar($conten_menuBalance);
            completarTablaOperaciones(arrayListo);
        }
    })
}


// ____________________________________
// Evento botón activar el Menú Balance
// ------------------------------------
$menuBalance.addEventListener('click', () => {
    operaciones_LS = recuperar("operaciones");
    if (operaciones_LS) {
        completarTablaOperaciones(operaciones_LS);
    }
})


// _______________________________________
// llamado de funcion mostrar de script.js
// ---------------------------------------
document.addEventListener('DOMContentLoaded', function () {
    mostrar($contenedorMenuInicio); // Llama a la función desde script.js
});



// ________________________________________________________________
// Muestra opciones de categorias en el select para elegir la categ
// ----------------------------------------------------------------
const ingresarCategSelect = () => {
    console.log('estoy en ingresarCategSelect, las recuperaré de LS')
    categorias_LS = recuperar("categorias");
    console.log('categorias recuperadas:', categorias_LS)
    $categoriaOperSelect.innerHTML = "";
    for (let i = 0; i < categorias_LS.length; i++) {
        $categoriaOperSelect.innerHTML += `<option value =" ${categorias_LS[i].nombre}">${categorias_LS[i].nombre}</option>`;
    }
}


// _____________________________________________________
// Inicialización de opciones de categorías en el select
// -----------------------------------------------------
ingresarCategSelect();








/* ================== DECLARAR LOS ARRAY  categorías y operaciones  ================ */
let categFiltro = [];
let operaFiltro = [];

/* ================== Menú  - y Menú Hambburguesa  ================ */
const nav = document.getElementById("nav");
const abrir = document.getElementById("abrir");
const cerrar = document.getElementById("cerrar");

const menuInicio = document.getElementById("menu-inicio");
const menuBalance = document.getElementById("menu-balance");
const menuCategorias = document.getElementById("menu-categorias");
const menuReportes = document.getElementById("menu-reportes");

abrir.addEventListener("click", () => {
	nav.classList.remove("hidden");
	cerrar.classList.remove("hidden");
	abrir.classList.add("hidden");
});


function cerrarNav() {
	nav.classList.add("hidden");
	cerrar.classList.add("hidden");
	abrir.classList.remove("hidden");
}

cerrar.addEventListener("click", cerrarNav);
menuInicio.addEventListener("click", cerrarNav);
menuBalance.addEventListener("click", cerrarNav);
menuCategorias.addEventListener("click", cerrarNav);
menuReportes.addEventListener("click", cerrarNav);

const contenedor_menuInicio = document.getElementById("cont-menu-inicio");
const contenedor_menuBalance = document.getElementById("cont-menu-balance");
const contenedor_menuOperaciones = document.getElementById("cont-menu-operaciones");
const contenedor_menuCategorias = document.getElementById(
	"cont-menu-categorias"
);
const contenedor_menuReportes = document.getElementById("cont-menu-reportes");

function mostrar(mostrar) {
	contenedor_menuInicio.classList.add("hidden");
	contenedor_menuBalance.classList.add("hidden");
	contenedor_menuOperaciones.classList.add("hidden");
	contenedor_menuCategorias.classList.add("hidden");
	contenedor_menuReportes.classList.add("hidden");
	
	mostrar.classList.remove("hidden");
}

menuInicio.addEventListener("click", () => {
	mostrar(contenedor_menuInicio);
});

const cont_con_oper = document.getElementById("cont-con-oper");
menuBalance.addEventListener("click", () => {
	mostrar(contenedor_menuBalance);
	inicializarFechaInput("filtro-fecha-desde", "restarMes");
	inicializarFechaInput("filtro-fecha-hasta", "noRestarMes");

	if (controlarSiHayCateOper()) {
		/* Si hay categorías y operaciones, entonces se habilita "Mostrar filtros" y 
		permite seleccionr Filtros, y mostrar el listado, si hay operaciones*/
		ocultar_filtros.classList.remove("hidden");
		contenedor_filtros.classList.add("hidden")
		categFiltro = JSON.parse(localStorage.getItem("categorias"));
		cargarCategorias();
		mns_aviso_seleccionar_filtros();
		filtrar_oper();
		
	} else {
		/* Si NO hay categorías/operaciones, se esconde FILTROS, y se deja 
		el mensaje de cargar "nuevas operaciones" */
		ocultar_filtros.classList.add("hidden");
	}
});

menuCategorias.addEventListener("click", () => {
	mostrar(contenedor_menuCategorias);
});

menuReportes.addEventListener("click", () => {
	mostrar(contenedor_menuReportes);
	mostrarReportes(); /* ver en scriptReporte.js */
});
/* ----------------------------------------------------------------------------------- */

/* ======================== CLARO - OSCURO ========================  */
const btn_claro_oscuro = document.getElementById("btn-claro-oscuro");

btn_claro_oscuro.addEventListener("click", () => {
	if (
		localStorage.theme === "dark" ||
		(!("theme" in localStorage) &&
			window.matchMedia("(prefers-color-scheme: dark)").matches)
	) {
		btn_claro_oscuro.innerHTML = `<i class="fa fa-moon-o" aria-hidden="true"></i>`;
		document.documentElement.classList.remove("dark");
		localStorage.theme = "light";
	} else {
		btn_claro_oscuro.innerHTML = `<i class="fa fa-sun-o"></i>`;
		document.documentElement.classList.add("dark");
		localStorage.theme = "dark";
	}
});

function modoClaroOscuro() {
	if (
		localStorage.theme === "dark" ||
		(!("theme" in localStorage) &&
			window.matchMedia("(prefers-color-scheme: dark)").matches)
	) {
		btn_claro_oscuro.innerHTML = `<i class="fa fa-sun-o"></i>`;
		document.documentElement.classList.add("dark");
	} else {
		btn_claro_oscuro.innerHTML = `<i class="fa fa-moon-o" aria-hidden="true"></i>`;
		document.documentElement.classList.remove("dark");
	}
}
/* ----------------------------------------------------------------------------------- */

/* ================================================================ */
/* para Operaciones BALANCE Y FILTROS */
/* Por si borraron todas las categorías o todas las operaciones */
function controlarSiHayCateOper() {
	let lonCate = 0;
	let lonOper = 0;
	if (localStorage.getItem("categorias") !== null) {
		lonCate = JSON.parse(localStorage.getItem("categorias")).length;
	}
	if (localStorage.getItem("operaciones") !== null) {
		lonOper = JSON.parse(localStorage.getItem("operaciones")).length;
	}

	if (lonCate > 0 && lonOper > 0) {
		return true;
	} else {
		return false;
	}
}

// ___________________________________________________________
// Función que carga las categorias del LS en el filtro select
// -----------------------------------------------------------
const filtro_categoria = document.getElementById("filtro-categoria");

function cargarCategorias() {
	filtro_categoria.innerHTML = `<option value="TODAS">TODAS</option>`;
	categFiltro.forEach((cat) => {
		filtro_categoria.innerHTML +=
			`<option value="` + cat.id + `">` + cat.nombre + `</option>`;
	});
}

// ________________________________________________
// Función que inicializa las fechas en los filtros
// ------------------------------------------------
function inicializarFechaInput(id_del_input, que_hago) {
	var fecha;
	if (que_hago === "restarMes") {
		let fechaMiliseg = new Date().getTime();
		fecha = new Date(fechaMiliseg - 2629800000);
	} else {
		fecha = new Date();
	}

	var fecParaInput = fecha.getFullYear() + "-";
	
	fecha.getMonth() + 1 < 10
		? (fecParaInput += "0" + (fecha.getMonth() + 1) + "-")
		: (fecParaInput += fecha.getMonth() + 1 + "-");
	fecha.getDate() < 10
		? (fecParaInput += "0" + fecha.getDate())
		: (fecParaInput += fecha.getDate());
	document
		.getElementById(`${id_del_input}`)
		.setAttribute("value", fecParaInput);

	return fecParaInput; //hizo falta este return porque no me tomaba la fecha correcta en el input.value al ingresar nueva operacion
}

// ___________________________________
// Evento que oculta todos los filtros
// -----------------------------------
const ocultar_filtros = document.getElementById("ocultar-filtros");
const contenedor_filtros = document.getElementById("contenedor-filtros");

ocultar_filtros.addEventListener("click", () => {
	contenedor_filtros.classList.toggle("hidden");
	if (contenedor_filtros.classList.contains("hidden")) {
		ocultar_filtros.innerHTML = `<i class="fa-regular fa-eye"></i><p class="ml-1"> Mostrar Filtros </p>`;
	} else {
		ocultar_filtros.innerHTML = `<i class="fa-regular fa-eye-slash"></i><p class="ml-1"> Ocultar Filtros </p>`;
	}
});

//_________________________________________________________________ 
/*--------------- Para filtrar operaciones -----------------------*/
const filtro_tipo = document.getElementById("filtro-tipo");
const filtro_cate = document.getElementById("filtro-categoria");
const filtro_fecha_desde = document.getElementById("filtro-fecha-desde");
const filtro_fecha_hasta = document.getElementById("filtro-fecha-hasta");
const filtro_orden = document.getElementById("filtro-orden");

// const cont_con_oper = document.getElementById("cont-con-oper"); //lo necesité en línea 67 aprox
const con_oper_listado = document.getElementById("con-oper-listado");

filtro_tipo.addEventListener("change", filtrar_oper);
filtro_cate.addEventListener("change", filtrar_oper);
filtro_fecha_desde.addEventListener("change", filtrar_oper);
filtro_fecha_hasta.addEventListener("change", filtrar_oper);
filtro_orden.addEventListener("change", filtrar_oper);

function masReciente(operaFiltro, como) {
	if (como === "A") {
		operaFiltro.sort((a, b) => {
			return new Date(a.fecha) - new Date(b.fecha);
		});
	} else {
		operaFiltro.sort((a, b) => {
			return new Date(b.fecha) - new Date(a.fecha);
		});
	}
}

function mayorMonto(operaFiltro, como) {
	return operaFiltro.sort((a, b) => {
		return como === "A" ? a.monto - b.monto : b.monto - a.monto;
	});
}

function aZ(operaFiltro, como) {
	if (como === "A") {
		operaFiltro.sort((a, b) => {
			return a.descripcion.localeCompare(b.descripcion);
		});
	} else {
		operaFiltro.sort((a, b) => {
			return b.descripcion.localeCompare(a.descripcion);
		});
	}
}

function ordenarOperaciones(operaFiltro, orden) {
	switch (orden) {
		case "mas_reciente":
			operaFiltro = masReciente(operaFiltro, "D");
			break;
		case "menos_reciente":
			operaFiltro = masReciente(operaFiltro, "A");
			break;
		case "mayor_monto":
			operaFiltro = mayorMonto(operaFiltro, "D");
			break;
		case "menor_monto":
			operaFiltro = mayorMonto(operaFiltro, "A");
			break;
		case "A_Z":
			operaFiltro = aZ(operaFiltro, "A");
			break;
		case "Z_A":
			operaFiltro = aZ(operaFiltro, "D");
			break;
		default:
	}
}

/* Busca nombre de las Categorías para mostrar */
function nombreCat(id) {
	const resultado = categFiltro.find((c) => c.id === id);
	if (resultado === undefined) {
		return "Sin categoría.";
	} else {
		return resultado.nombre;
	}
}

/* === Función ppal que llmanan TODOS los FILTROS cada vez que hay un cambio ===== */
function filtrar_oper() {
	let totBal;
	let sumaGana = 0;
	let sumaGasto = 0;
	operaFiltro = JSON.parse(localStorage.getItem("operaciones"));
	categFiltro = recuperar("categorias"); // trae las categorias del LS

	//Si antes de filtrar hay Operaciones
	if (operaFiltro.length > 0) {
		ocultar_filtros.classList.remove("hidden");
		//contenedor - filtros;
	} else {
		ocultar_filtros.classList.add("hidden");
	}

	/* Obtiene los value de cada filtro */
	const tipo = filtro_tipo.value;
	const cate = filtro_cate.value;
	const fechaDesde = new Date(`${filtro_fecha_desde.value}T00:00:00`);
	const fechaHasta = new Date(`${filtro_fecha_hasta.value}T00:00:00`);
	const orden = filtro_orden.value;

	/* Filtrar por Tipo */
	if (tipo !== "TODO") {
		operaFiltro = operaFiltro.filter((oper) => oper.tipo === tipo);
	}

	/* Filtrar por Categorías */
	if (cate !== "TODAS") {
		operaFiltro = operaFiltro.filter((oper) => oper.categoria === cate);
	}

	/* Filtrar por Fecha desde - Hasta*/
	operaFiltro = operaFiltro.filter(function (op) {
		return fechaDesde <= new Date(op.fecha) && fechaHasta >= new Date(op.fecha);
	});

	/* Filtrar - Ordenamiento*/
	ordenarOperaciones(operaFiltro, orden);

	/* Volver a mostrar operacione */
	completarTablaOperaciones(operaFiltro); //VER en scriptOperaciones.js

	/* Recalcular resultados para encabezado de Balance */
	operaFiltro.forEach((op) => {
		op.tipo === "GANANCIA"
			? (sumaGana = sumaGana + op.monto)
			: (sumaGasto = sumaGasto + op.monto);
	});

	document.getElementById("balance-ganancias").innerHTML = `$${formatPesos(
		sumaGana
	)}`;
	document.getElementById("balance-gastos").innerHTML = `-$${formatPesos(
		sumaGasto
	)}`;

	if (sumaGana - sumaGasto >= 0) {
		totBal = `<div> $${formatPesos(sumaGana - sumaGasto)} </div>`;
	} else {
		totBal = `<div class="text-[red] dark:text-red-900">	-$${formatPesos(
			Math.abs(sumaGana - sumaGasto)
		)} </div>`;
	}
	document.getElementById("balance-total").innerHTML = `${totBal}`;
}
	



/* ----------------------------------------------------------------------------------- */

/* MENSAJE que DESAPARECE DSPS DE 5segundos,  en Operaciones */
function mns_aviso_seleccionar_filtros() {
	const mns = document.getElementById("mensaje-filtros-5seg");
	mns.classList.remove("hidden");
	setTimeout(function () {
		mns.classList.add("hidden");
	}, 5000);
}

/* ================================================================================================*/
function funcionesAEjecutar() {
	modoClaroOscuro();
	mostrar(contenedor_menuInicio);
}

window.onload = funcionesAEjecutar;

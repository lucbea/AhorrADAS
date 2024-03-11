/* ================== DECLARAR LOS ARRAY  categorías y operaciones  ================ */
/* OOOOOOOOOOOOOOO jjjjjjjjj oooooooooooooo ver con que nombre usa Lucía */
let categFiltro = [];
let operaFiltro = [];
/* ----------------------------------------------------------------------------------- */

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
menuBalance.addEventListener("click", () => {
	cerrarNav();
	ocultarMostrarFiltros();
	});
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
	// mostrar.classList.add("hidden"); //Sacar 1de marzo 
	// contenedor_menuBalance.classList.remove("hidden");  //sacer 1 de marzo
}

menuInicio.addEventListener("click", () => {
	mostrar(contenedor_menuInicio);
});

const cont_con_oper = document.getElementById("cont-con-oper");
menuBalance.addEventListener("click", () => {
	mostrar(contenedor_menuBalance);
	inicializarFechaFiltro();

	if (controlarSiHayCateOper()) {
		/* Si hay categorías y operaciones, entonces se habilita "Mostrar filtros" y 
		permite seleccionr Filtros, y mostrar el listado, si hay operaciones*/
		document.getElementById("ocultar-filtros").classList.remove("hidden");
		categFiltro = JSON.parse(localStorage.getItem("categorias"));
		cargarCategorias();  
		filtrar_oper();
		document.getElementById("cont-sin-oper").classList.add("hidden");
		cont_con_oper.classList.remove('hidden');

	} else {
		/* Si NO hay categorías/operaciones, se esconde FILTROS, y se deja 
		el mensaje de cargar "nuevas operaciones" */
		document.getElementById("ocultar-filtros").classList.add("hidden");
	}
	ocultarMostrarFiltros();
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
function inicializarFechaFiltro() {
	let fechaDesde = new Date();
	let fechaHasta = new Date();
	document.getElementById("filtro-fecha-desde").value = fechaDesde.toISOString().split('T')[0];
	document.getElementById("filtro-fecha-hasta").value = fechaHasta.toISOString().split('T')[0];
}


// ______________________________________________
// Función asociada a ocultar/mostrar los filtros
// ----------------------------------------------
const ocultarMostrarFiltros = () => {
	// contenedor_filtros.classList.toggle("hidden");
	if (contenedor_filtros.classList.contains("hidden")) {
		ocultar_filtros.innerHTML = `<i class="fa-regular fa-eye"></i><p class="ml-1 w-[40px] sm:w-[100px]"> Mostrar Filtros </p>`;
	} else {
		ocultar_filtros.innerHTML = `<i class="fa-regular fa-eye-slash"></i><p class="ml-1 w-[40px] sm:w-[100px]"> Ocultar Filtros </p>`;
	}
}



// ___________________________________
// Evento que oculta todos los filtros
// -----------------------------------
const ocultar_filtros = document.getElementById("ocultar-filtros");
const contenedor_filtros = document.getElementById("contenedor-filtros");
ocultar_filtros.addEventListener("click", () => {ocultarMostrarFiltros()});

//_________________________________________________________________ 
/*--------------- Para filtrar operaciones -----------------------*/
const filtro_tipo = document.getElementById("filtro-tipo");
const filtro_cate = document.getElementById("filtro-categoria");
const filtro_fecha_desde = document.getElementById("filtro-fecha-desde");
const filtro_fecha_hasta = document.getElementById("filtro-fecha-hasta");
const filtro_orden = document.getElementById("filtro-orden");

// const cont_con_oper = document.getElementById("cont-con-oper"); //lo necesité en línea 67 aprox
const con_oper_listado = document.getElementById("con-oper-listado");
let bandera_desde = false;
let bandera_hasta = false;
filtro_tipo.addEventListener("change", filtrar_oper);
filtro_cate.addEventListener("change", filtrar_oper);
filtro_fecha_desde.addEventListener("change", () => {
	bandera_desde = true;
	filtrar_oper()});
filtro_fecha_hasta.addEventListener("change", () => {
	bandera_hasta = true;
	filtrar_oper()});
filtro_orden.addEventListener("change", filtrar_oper);

// La función que sigue es la que se revisa
// function masReciente(operaFiltro, como) {
// 	if (como === "A") {
// 		operaFiltro.sort((a, b) => {
// 			return new Date(a.fecha) - new Date(b.fecha);
// 		});
// 	} else {
// 		operaFiltro.sort((a, b) => {
// 			return new Date(b.fecha) - new Date(a.fecha);
// 		});
// 	}
// }

// Revisando
function masReciente(operaFiltro, como) {
	if (como === "A") {
		operaFiltro.sort((a, b) => {
			console.log('a.fecha:', a.fecha, 'b.fecha:', b.fecha);
			return new Date(a.fecha) - new Date(b.fecha);
		});
	} else {
		operaFiltro.sort((a, b) => {
			console.log('a.fecha:', a.fecha, 'b.fecha:', b.fecha);
			return new Date(b.fecha) - new Date(a.fecha);
		});
	}
}
// Fin revision






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
	// console.log('filtro', filtro, 'orden', orden)
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

// function formatFecha(f) {
// 	let fc = new Date(f);
// 	let ff;
// 	fc.getDate() < 10
// 		? (ff = "0" + fc.getDate() + "/")
// 		: (ff = fc.getDate() + "/");
// 	fc.getMonth() + 1 < 10
// 		? (ff += "0" + (fc.getMonth() + 1) + "/")
// 		: (ff += fc.getMonth() + 1 + "/");
// 	ff += fc.getFullYear();
// 	return ff;
// }

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
	let x;
	let sumaGana = 0;
	let sumaGasto = 0;
	operaFiltro = recuperar("operaciones");  // trae las operaciones del LS
	categFiltro = recuperar("categorias"); 	// trae las categorias del LS
	const tipo = filtro_tipo.value;
	const categ = filtro_cate.value;
	const orden = filtro_orden.value;

	// Filtro de fecha
	const fechaInicio = new Date(document.getElementById('filtro-fecha-desde').value);
	let fechaFin = new Date(document.getElementById('filtro-fecha-hasta').value);
	fechaFin.setDate(fechaFin.getDate() + 1);   // Incrementar la fecha de fin en 1 día porque no lo toma al de la misma fecha
	if (bandera_desde === true || bandera_hasta === true) {
		operaFiltro = operaciones.filter(op => {
			const fechaOp = new Date(op.fecha.split('/').reverse().join('/'));
			return fechaOp >= fechaInicio && fechaOp < fechaFin; // Usar < en lugar de <= para excluir el día siguiente
		}).sort((a, b) => {
			const dateA = new Date(a.fecha.split('/').reverse().join('/'));
			const dateB = new Date(b.fecha.split('/').reverse().join('/'));
			return dateA - dateB;
		});
	}

	// Filtro tipo
	if (tipo !== "TODO") {
		operaFiltro = operaFiltro.filter((oper) => oper.tipo === tipo);
	}

	// Filtro categoría
	if (categ !== "TODAS") {
		categFiltro = categFiltro.filter((cate) => cate.id === categ);
		operaFiltro = operaFiltro.filter((oper) => oper.categoria.trim() === categFiltro[0].nombre.trim());
	}

	ordenarOperaciones(operaFiltro, orden);
	completarTablaOperaciones(operaFiltro);
	ocultarMostrarFiltros();

	// Obtención de resultados para encabezado de Balance 
	operaFiltro.forEach((op) => {
		if (op.tipo === "GANANCIA") {
			sumaGana = sumaGana + parseFloat(op.monto);
			x = `<div> $${formatPesos(op.monto)} </div>`;
		} else {
			sumaGasto = sumaGasto + parseFloat(op.monto);
			x = `<div class="text-[red] dark:text-red-900">	-$${formatPesos(
					Math.abs(op.monto))} </div>`;
		}
	});
	document.getElementById("balance-ganancias").innerHTML = `$${formatPesos(sumaGana)}`;
	document.getElementById("balance-gastos").innerHTML = `-$${formatPesos(sumaGasto)}`;
	if (sumaGana - sumaGasto >= 0) {
		x = `<div> $${formatPesos(sumaGana - sumaGasto)} </div>`;
		} else {
			x = `<div class="text-[red] dark:text-red-900">	-$${formatPesos(Math.abs(sumaGana - sumaGasto))} </div>`;
		}
		document.getElementById("balance-total").innerHTML = `${x}`;
}
	



/* ----------------------------------------------------------------------------------- */

/* ================================================================================================*/
function funcionesAEjecutar() {
	modoClaroOscuro();
	mostrar(contenedor_menuInicio);
}

window.onload = funcionesAEjecutar;

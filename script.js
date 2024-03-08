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

const filtro_categoria = document.getElementById("filtro-categoria");
function cargarCategorias() {
	filtro_categoria.innerHTML = `<option value="TODAS">TODAS</option>`;
	categFiltro.forEach((cat) => {
		filtro_categoria.innerHTML +=
			`<option value="` + cat.id + `">` + cat.nombre + `</option>`;
	});
}

function inicializarFechaFiltro() {
	var fecha = new Date();
	document
		.getElementById("filtro-fecha")
		.setAttribute("value", fecha.toJSON().slice(0, 10));
}

const ocultar_filtros = document.getElementById("ocultar-filtros");
const contenedor_filtros = document.getElementById("contenedor-filtros");
ocultar_filtros.addEventListener("click", () => {
	contenedor_filtros.classList.toggle("hidden");
	if (contenedor_filtros.classList.contains("hidden")) {
		ocultar_filtros.innerHTML = `<i class="fa-regular fa-eye"></i><p class="ml-1 w-[40px] sm:w-[100px]"> Mostrar Filtros </p>`;
	} else {
		ocultar_filtros.innerHTML = `<i class="fa-regular fa-eye-slash"></i><p class="ml-1 w-[40px] sm:w-[100px]"> Ocultar Filtros </p>`;
	}
});

/*--------------- Para filtrar operaciones -----------------------*/
const filtro_tipo = document.getElementById("filtro-tipo");
const filtro_cate = document.getElementById("filtro-categoria");
const filtro_fecha = document.getElementById("filtro-fecha");
const filtro_orden = document.getElementById("filtro-orden");

// const cont_con_oper = document.getElementById("cont-con-oper"); //lo necesité en ínea 67 aprox
const con_oper_listado = document.getElementById("con-oper-listado");

filtro_tipo.addEventListener("change", filtrar_oper);
filtro_cate.addEventListener("change", filtrar_oper);
filtro_fecha.addEventListener("change", filtrar_oper);
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

function formatFecha(f) {
	let fc = new Date(f);
	let ff;
	fc.getDate() < 10
		? (ff = "0" + fc.getDate() + "/")
		: (ff = fc.getDate() + "/");
	fc.getMonth() + 1 < 10
		? (ff += "0" + (fc.getMonth() + 1) + "/")
		: (ff += fc.getMonth() + 1 + "/");
	ff += fc.getFullYear();
	return ff;
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
	let x;
	let sumaGana = 0;
	let sumaGasto = 0;
	operaFiltro = JSON.parse(localStorage.getItem("operaciones"));

	const tipo = filtro_tipo.value;
	const cate = filtro_cate.value;
	const fechaDesde = new Date(`${filtro_fecha.value}T00:00:00`);
	const orden = filtro_orden.value;

	if (tipo !== "TODO") {
		operaFiltro = operaFiltro.filter((oper) => oper.tipo === tipo);
	}

	if (cate !== "TODAS") {
		operaFiltro = operaFiltro.filter((oper) => oper.categoria === cate);
	}

	operaFiltro = operaFiltro.filter(function (op) {
		return fechaDesde < new Date(op.fecha);
	});

	ordenarOperaciones(operaFiltro, orden);

	/* Si hay datos después de filtrar... */
	if (operaFiltro.length > 0) {
		document.getElementById("cont-sin-oper").classList.add("hidden");
		cont_con_oper.classList.remove("hidden");

		con_oper_listado.innerHTML = "";

		operaFiltro.forEach((op) => {
			if (op.tipo === "GANANCIA") {
				sumaGana += op.monto;
				x = `<div> $${formatPesos(op.monto)} </div>`;
			} else {
				sumaGasto += op.monto;
				x = `<div class="text-[red] dark:text-red-900">	-$${formatPesos(
					Math.abs(op.monto)
				)} </div>`;
			}

			con_oper_listado.innerHTML += `<div class="flex">
							<div class="w-[30%]">${op.descripcion.toUpperCase() + "-" + op.tipo}</div>
							<div class="w-[30%]">${nombreCat(op.categoria)}</div>
							<div class="w-[15%]">${formatFecha(op.fecha)}</div>
							<div class="w-[16%] flex justify-end">${x}</div>
							<div class="w-[9%]  flex justify-end"> Edi-Eli</div>
						</div>`;
		});

		document.getElementById("balance-ganancias").innerHTML = `$${formatPesos(
			sumaGana
		)}`;
		document.getElementById("balance-gastos").innerHTML = `-$${formatPesos(
			sumaGasto
		)}`;

		if (sumaGana - sumaGasto >= 0) {
			x = `<div> $${formatPesos(sumaGana - sumaGasto)} </div>`;
		} else {
			x = `<div class="text-[red] dark:text-red-900">	-$${formatPesos(
				Math.abs(sumaGana - sumaGasto)
			)} </div>`;
		}
		document.getElementById("balance-total").innerHTML = `${x}`;
	} else {
		document.getElementById("cont-sin-oper").classList.remove("hidden");
		cont_con_oper.classList.add("hidden");
	}
}
/* ----------------------------------------------------------------------------------- */

/* ================================================================================================*/
function funcionesAEjecutar() {
	modoClaroOscuro();
	mostrar(contenedor_menuInicio);
}
window.onload = funcionesAEjecutar;

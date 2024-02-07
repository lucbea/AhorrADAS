/* ================== Menú   ================ */


const menuInicio = document.getElementById("menu-inicio");
const menuBalance = document.getElementById("menu-balance");
const menuCategorias = document.getElementById("menu-categorias");
const menuReportes = document.getElementById("menu-reportes");



const contenedor_menuInicio = document.getElementById("cont-menu-inicio");
const contenedor_menuBalance = document.getElementById("cont-menu-balance");
const contenedor_menuCategorias = document.getElementById(
	"cont-menu-categorias"
);
const contenedor_menuReportes = document.getElementById("cont-menu-reportes");

function mostrar(mostrar) {
	contenedor_menuInicio.classList.add("hidden");
	contenedor_menuBalance.classList.add("hidden");
	contenedor_menuCategorias.classList.add("hidden");
	contenedor_menuReportes.classList.add("hidden");

	mostrar.classList.remove("hidden");
}

menuInicio.addEventListener("click", () => {
	mostrar(contenedor_menuInicio);
});

menuBalance.addEventListener("click", () => {
	mostrar(contenedor_menuBalance);
});

menuCategorias.addEventListener("click", () => {
	mostrar(contenedor_menuCategorias);
});

menuReportes.addEventListener("click", () => {
	mostrar(contenedor_menuReportes);
});

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
/* ------------------------------------------------------------------------------------------------ */

/* ================================================================================================*/
function funcionesAEjecutar() {
	modoClaroOscuro();
}
window.onload = funcionesAEjecutar;

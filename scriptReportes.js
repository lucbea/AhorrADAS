/* ======================== MOSTRAR CON/SIN REPORTES ========================  */
const cont_sin_reporte = document.getElementById("cont-sin-reporte");
const cont_con_reporte = document.getElementById("cont-con-reporte");

/* Mostrar Imagen, y texto SIN REPORTES */
function mostrarSinReportes() {
	cont_sin_reporte.classList.remove("hidden");
	cont_con_reporte.classList.add("hidden");
}

/* Mostrar REPORTES */
function mostrarConReportes() {
	cont_sin_reporte.classList.add("hidden");
	cont_con_reporte.classList.remove("hidden");
}

/* viene de SCRIPT.JS */
function mostrarReportes() {
	if (localStorage.getItem("operaciones") !== null) {
		mostrarConReportes();
	} else {
		mostrarSinReportes();
	}
}

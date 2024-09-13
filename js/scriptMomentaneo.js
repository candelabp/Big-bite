const btnModal=
document.querySelector("#btn-modal");
const modal =
document.querySelector("#modal");
btnModal.addEventListener("click",()=>{
  modal.showModal()
})
function irAPagina(){
    window.location.href = "formulario.html";
}
const menuIcon = document.getElementById('menu-icon');
const navLinks = document.getElementById('nav-links');
const cerrarMenu = document.getElementById("menu-icon-cerrar")


menuIcon.addEventListener('click', () => {
  navLinks.classList.toggle('active');
});

cerrarMenu.addEventListener("click", () => {
  navLinks.classList.remove('active');
})
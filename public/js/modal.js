
//document.addEventListener("DOMContentLoaded", () => {
  //  const modal = document.getElementById("modalErro");
    //const btnFechar = document.getElementById("btnFecharModal");

 //   if (modal && btnFechar) {
   //     btnFechar.addEventListener("click", () => {
     //   modal.style.display = "none"; // esconde o modal
       // });
 //   }
//}); 


window.addEventListener("load", () => {
  const modal = document.getElementById("modalErro");
  if (!modal) return; // não existe modal, nada a fazer

  const btnFecharX = document.getElementById("btnFecharModalX");
  const btnFecharOk = document.getElementById("btnFecharModalOk");

  function fecharModal() {
    modal.remove(); // remove completamente do DOM
  }

  // Fecha ao clicar no botão X
  if (btnFecharX) btnFecharX.addEventListener("click", fecharModal);

  // Fecha ao clicar no botão OK
  if (btnFecharOk) btnFecharOk.addEventListener("click", fecharModal);

  // Fecha ao clicar fora do conteúdo do modal
  modal.addEventListener("click", (e) => {
    if (e.target === modal) fecharModal();
  });
});

import { gerarSensiIA } from "./ai-sensi.js";

export function gerarSensi() {
    const modelo = document.getElementById("modelo").value;
    document.getElementById("resultado").innerHTML =
        gerarSensiIA(modelo, false);
}

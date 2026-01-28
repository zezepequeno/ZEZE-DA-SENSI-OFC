import { gerarSensiIA } from "./ai-sensi.js";

export function gerarSensi() {
    const modelo = document.getElementById("modelo").value;
    const html = gerarSensiIA(modelo, false);
    document.getElementById("resultado").innerHTML = html;
}

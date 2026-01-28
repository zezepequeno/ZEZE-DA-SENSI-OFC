import { gerarSensiIA } from "./ai-sensi.js";

export function gerarSensi() {
    const modelo = document.getElementById("modelo")?.value || "";
    const vip = false;
    return gerarSensiIA(modelo, vip);
}

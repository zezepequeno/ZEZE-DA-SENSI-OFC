
/* ===============================
   IMPORT
================================ */
import { gerarSensiIA } from "./ai-sensi.js";

/* ===============================
   DETECTAR ESPECIFICAÇÕES
================================ */
function detectarSpecs(modelo) {
  const m = modelo.toLowerCase();

  return {
    hz:
      m.includes("120") ||
      m.includes("a54") ||
      m.includes("a34") ||
      m.includes("s21") ||
      m.includes("s22") ||
      m.includes("s23")
        ? 120
        : 60,

    chipset:
      m.includes("mediatek") ||
      m.includes("helio") ||
      m.includes("dimensity")
        ? "mediatek"
        : "snapdragon"
  };
}

/* ===============================
   GERAR SENSIBILIDADE
================================ */
function gerarSensibilidade(modelo, vip = false) {
  const specs = detectarSpecs(modelo);

  return gerarSensiIA({
    modelo,
    hz: specs.hz,
    chipset: specs.chipset,
    vip
  });
}

/* ===============================
   EXPORT GLOBAL
================================ */
export function GERAR_SENSI_IA(modelo, vip) {
  return gerarSensibilidade(modelo, vip);
}

/* ===============================
   GERADOR DE SENSI IA
================================ */
export function gerarSensiIA(modelo, specs, vip) {
  const base = specs.hz === 120 ? 95 : 88;
  const ajusteChip = specs.chipset === "snapdragon" ? 4 : 2;
  const ajusteRam = specs.ram >= 8 ? 3 : 0;

  const geral = Math.min(100, base + ajusteChip + ajusteRam);
  const redDot = geral - 8;
  const mira2x = geral - 18;
  const mira4x = geral - 28;
  const awm = geral - 35;
  const olhar = geral + 5;

  /* ===============================
     FREE
  ================================ */
  if (!vip) {
    return `
      <div class="sensi-card free">
        <p>📱 <b>Modelo:</b> ${modelo}</p>
        <p>🎮 <b>Sensibilidade Geral:</b> ${geral}</p>
        <p>🔴 <b>Red Dot:</b> ${redDot}</p>
        <p>🎯 <b>Mira 2x:</b> ${mira2x}</p>

        <div class="vip-lock">
          🔒 Conteúdo VIP bloqueado
        </div>

        <p class="cta">
          🔥 Quer a sensi completa, calibrada pra HS?
          <br>
          <b>Vire VIP agora 🚀</b>
        </p>
      </div>
    `;
  }

  /* ===============================
     VIP
  ================================ */
  return `
    <div class="sensi-card vip">
      <p>📱 <b>Modelo:</b> ${modelo}</p>
      <p>⚡ <b>Hz:</b> ${specs.hz}Hz</p>
      <p>🧠 <b>Chipset:</b> ${specs.chipset}</p>
      <p>💾 <b>RAM:</b> ${specs.ram}GB</p>

      <hr>

      <p>🎮 <b>Geral:</b> ${geral}</p>
      <p>🔴 <b>Red Dot:</b> ${redDot}</p>
      <p>🎯 <b>Mira 2x:</b> ${mira2x}</p>
      <p>🎯 <b>Mira 4x:</b> ${mira4x}</p>
      <p>🔫 <b>AWM:</b> ${awm}</p>
      <p>👁️ <b>Olhadinha:</b> ${olhar}</p>

      <div class="vip-tip">
        💡 Dica PRO: teste no modo treino e ajuste +2 se jogar 4 dedos.
      </div>
    </div>
  `;
}

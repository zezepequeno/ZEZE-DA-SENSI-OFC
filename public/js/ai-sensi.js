export function gerarSensiIA(modelo, vip) {
    const base = vip ? 95 : 88;
    const geral = Math.floor(Math.random() * (100 - base) + base);
    return `
      <div class="sensi-card">
        <p>📱 <b>Modelo:</b> ${modelo}</p>
        <p>🎯 <b>Geral:</b> ${geral}</p>
        <p>🔴 <b>Red Dot:</b> ${geral - 7}</p>
        <p>🔍 <b>Mira 2x:</b> ${geral - 15}</p>
        <p>🔭 <b>Mira 4x:</b> ${geral - 22}</p>
        <p>⚡ <b>DPI:</b> ${vip ? '720' : '500'}</p>
      </div>`;
}

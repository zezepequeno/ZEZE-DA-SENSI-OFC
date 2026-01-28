export function gerarSensiIA(modelo, vip) {
    // Lógica de cálculo realista
    const base = vip ? 94 : 85;
    const geral = Math.floor(Math.random() * (100 - base) + base);
    
    return `
        <div class="sensi-resultado">
            <p style="color:#ff6a00; font-weight:bold;">✅ SENSI PARA: ${modelo.toUpperCase()}</p>
            <p>🔴 Geral: <b>${geral}</b></p>
            <p>🔴 Red Dot: <b>${geral - 5}</b></p>
            <p>🎯 Mira 2x: <b>${geral - 12}</b></p>
            <p>🎯 Mira 4x: <b>${geral - 20}</b></p>
            <p>⚡ DPI: <b>${vip ? '720' : '500'}</b></p>
            <p>👆 Botão de Atirar: <b>${vip ? '45%' : '55%'}</b></p>
        </div>
    `;
}

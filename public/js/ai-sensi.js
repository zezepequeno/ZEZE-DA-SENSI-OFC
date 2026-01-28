export function gerarSensiIA(modelo, vip) {
    const base = vip ? 94 : 85;
    const geral = Math.floor(Math.random() * (100 - base) + base);

    return `
        <div class="sensi-resultado">
            <p><b>${modelo.toUpperCase()}</b></p>
            <p>Geral: ${geral}</p>
            <p>Red Dot: ${geral - 5}</p>
            <p>Mira 2x: ${geral - 12}</p>
            <p>Mira 4x: ${geral - 20}</p>
            <p>DPI: ${vip ? 720 : 500}</p>
        </div>
    `;
}

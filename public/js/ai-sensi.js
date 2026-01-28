export function gerarSensiIA(modelo, vip) {
    const base = vip ? 95 : 85;
    const geral = Math.floor(Math.random() * 10) + base;

    return `
        <p>Modelo: ${modelo}</p>
        <p>Geral: ${geral}</p>
        <p>Red Dot: ${geral - 5}</p>
        <p>4x: ${geral - 15}</p>
    `;
}

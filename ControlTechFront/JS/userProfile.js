import { API_BASE_URL } from './apiConfig.js';

// Executa assim que a página carrega
document.addEventListener("DOMContentLoaded", () => {
    carregarDadosUsuario();
});

export function carregarDadosUsuario() {
    console.log(">>> [userProfile.js] Atualizando sidebar...");

    // 1. Verifica Login
    const json = localStorage.getItem("usuarioLogado");
    if (!json) {
        // Se não é a página de login/cadastro, redireciona
        if (!window.location.pathname.includes('index.html')) {
            window.location.href = '/index.html';
        }
        return;
    }

    let usuario;
    try {
        const dados = JSON.parse(json);
        usuario = dados.usuario || dados;
    } catch (e) {
        console.error(e);
        return;
    }

    // 2. Referências HTML (IDs padronizados)
    const elNome = document.getElementById('nomeUsuarioDisplay');
    const elFoto = document.getElementById('fotoPerfilUsuario');
    const elIcone = document.getElementById('iconePadraoUsuario');

    // 3. Preenche Nome
    if (elNome) elNome.textContent = usuario.nome || "Visitante";

    // 4. Preenche Foto
    if (elFoto && elIcone) {
        if (usuario.fotoUrl) {
            const urlCompleta = `${API_BASE_URL}${usuario.fotoUrl}`;
            elFoto.src = urlCompleta;

            elFoto.onload = () => {
                elFoto.style.display = 'block';
                elIcone.style.display = 'none';
            };
            
            elFoto.onerror = () => {
                elFoto.style.display = 'none';
                elIcone.style.display = 'flex';
            };
        } else {
            elFoto.style.display = 'none';
            elIcone.style.display = 'flex';
        }
    }
}
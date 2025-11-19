import { API_BASE_URL } from './apiConfig.js';

export function lerQrViaUpload(file, onSuccess, onError) {
    const formData = new FormData();
    formData.append("file", file);

    fetch(`${API_BASE_URL}/api/qrcode/ler`, {
        method: "POST",
        body: formData
    })
    .then(res => {
        if (!res.ok) throw new Error("Falha ao ler QR Code");
        return res.json();
    })
    .then(data => {
        // O backend retorna { usuario: { ... } }
        if (data.usuario) onSuccess(data.usuario);
        else onError("Formato de resposta inválido");
    })
    .catch(err => onError(err));
}

export function exibirUsuario(usuarioWrapper) {
    // Apenas loga, a lógica de UI está no Login.js
    console.log("Usuário Identificado:", usuarioWrapper);
}
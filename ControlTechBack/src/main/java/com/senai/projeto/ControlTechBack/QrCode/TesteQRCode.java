package com.senai.projeto.ControlTechBack.QrCode;

public class TesteQRCode {

    public static void main(String[] args) {
        try {
            String texto = "ID: 4\nNome: Nunex\nPerfil: crente\nDescrição: N/A";
            String caminho = "qrcode_iphone_teste.png";

            QRCodeGenerator.gerarQRCode(texto, caminho, 350, 350);
            String textoLido = QRCodeReader.lerQRCode(caminho);

            System.out.println("Conteúdo do QR Code: " + textoLido);

        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}

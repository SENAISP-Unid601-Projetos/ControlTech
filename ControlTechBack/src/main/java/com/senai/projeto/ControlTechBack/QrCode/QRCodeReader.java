package com.senai.projeto.ControlTechBack.QrCode;

import com.google.zxing.BinaryBitmap;
import com.google.zxing.MultiFormatReader;
import com.google.zxing.Result;
import com.google.zxing.client.j2se.BufferedImageLuminanceSource;
import com.google.zxing.common.HybridBinarizer;
import org.springframework.web.multipart.MultipartFile;

import javax.imageio.ImageIO;
import java.awt.image.BufferedImage;

public class QRCodeReader {

    // Método para ler QR Code a partir de MultipartFile
    public static String lerQRCode(MultipartFile file) throws Exception {
        try {
            // Converte MultipartFile para BufferedImage
            BufferedImage bufferedImage = ImageIO.read(file.getInputStream());

            if (bufferedImage == null) {
                throw new Exception("Não foi possível ler a imagem do QR Code");
            }

            // Prepara a imagem para leitura
            BufferedImageLuminanceSource source = new BufferedImageLuminanceSource(bufferedImage);
            BinaryBitmap bitmap = new BinaryBitmap(new HybridBinarizer(source));

            // Lê o QR Code
            Result result = new MultiFormatReader().decode(bitmap);

            return result.getText();

        } catch (Exception e) {
            throw new Exception("Erro ao ler QR Code: " + e.getMessage());
        }
    }

    // Método original para ler de arquivo (mantido para compatibilidade)
    public static String lerQRCode(String filePath) throws Exception {
        try {
            BufferedImage bufferedImage = ImageIO.read(new java.io.File(filePath));

            if (bufferedImage == null) {
                throw new Exception("Não foi possível ler a imagem do QR Code");
            }

            BufferedImageLuminanceSource source = new BufferedImageLuminanceSource(bufferedImage);
            BinaryBitmap bitmap = new BinaryBitmap(new HybridBinarizer(source));

            Result result = new MultiFormatReader().decode(bitmap);

            return result.getText();

        } catch (Exception e) {
            throw new Exception("Erro ao ler QR Code: " + e.getMessage());
        }
    }
}
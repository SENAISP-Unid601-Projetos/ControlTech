package com.senai.projeto.ControlTechBack.QrCode;

import com.google.zxing.BinaryBitmap;
import com.google.zxing.LuminanceSource;
import com.google.zxing.MultiFormatReader;
import com.google.zxing.Result;
import com.google.zxing.client.j2se.BufferedImageLuminanceSource;
import com.google.zxing.common.HybridBinarizer;

import javax.imageio.ImageIO;
import java.awt.image.BufferedImage;
import java.io.File;

public class QRCodeReader {

    public static String lerQRCode(String caminhoArquivo) throws Exception {
        BufferedImage bufferedImage = ImageIO.read(new File(caminhoArquivo));
        LuminanceSource source = new BufferedImageLuminanceSource(bufferedImage);
        BinaryBitmap bitmap = new BinaryBitmap(new HybridBinarizer(source));

        Result resultado = new MultiFormatReader().decode(bitmap);
        return resultado.getText();
    }
}

const fs = require('fs');
const path = require('path');
const base64ToImage = require('base64-to-image');

module.exports = {
    imageBase64(base64image, imagePath = '', imageTitle){
        if (base64image) {
            //verifica se o que esta sendo enviado é uma imagem
            const result = base64image.indexOf('data:image/');
            //caso 1 = imagem , caso -1 nao é uma imagem , portando nao pode ser transformada em img
            if (result == 0) {
                //caminho das imagens
                const pathLocation = path.normalize(path.resolve('public', 'img', imagePath) + '/');
                if (!fs.existsSync(pathLocation)){
                    fs.mkdirSync(pathLocation, { recursive: true });
                }
                //filename é o nome do arquivo da img
                const optionalObj = { 'fileName': imageTitle, 'type': 'png' };

                const image = base64ToImage(base64image, pathLocation, optionalObj);
                //caminho inteiro da imagem
                return path.join('img', imagePath, image.fileName);
            } else {
                return false;
            }
        }
    }
}
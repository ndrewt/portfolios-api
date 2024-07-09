import fs from 'fs';

export const save_file = (fileName: string, file: Express.Multer.File) => {
    fs.mkdir('images', { recursive: true }, (err) => {
        if (err) throw err;
    });

    fs.writeFile('images/' + fileName, file.buffer, function (error) {
        if (error) console.log(error);
    });
};

export const delete_file = async (file_to_delete: string = '') => {
    try {
        return fs.rmSync(file_to_delete, {
            force: true,
        });
    } catch (err) {
        console.log(err);
    }
};

export const generateFileName = (file: Express.Multer.File) => {
    const format = file.originalname.split('.')[1];
    return `file-` + Date.now() + '-' + Math.floor(Math.random() * 100) + '.' + format;
};

const multer = require('multer');
const path = require('path');
// const GridFsStorage = require('multer-gridfs-storage')

const serverStorage = multer.diskStorage({
    destination: (req, file, cb) => { cb(null, 'public/images') },
    filename: (req, file, cb) => { cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname)) }
});
// exports.serverStorage = serverStorage;

const upload = multer({storage: serverStorage});
exports.upload = upload;


// exports.dbStorage = new GridFsStorage({
//     url:process.env.DB,
//     options: {useNewUrlParser: true, useUnifiedTopology: true},
//     filr: (req, file)=>{
//         const match = ['image/jpg', 'image/jpeg', 'image/png'];
        
//         if(match.indexOf(file.mimetype) === -1){
//             const filename = file.originalname;
//             return filename;
//         }

//         return{
//             bucketName: 'photos',
//             filename: file.originalname
//         }
//     }
// })

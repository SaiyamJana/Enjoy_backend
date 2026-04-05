import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
    destination: function (req , file , cb) {//cb is callback function which will be called after destination is set
        cb(null , path.resolve("public/temp"));
    },
    filename: function (req , file , cb) {
        const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1E9);
        cb(null , uniqueSuffix + "-" + file.originalname);
    }
})

export const upload = multer({
    storage: storage
});
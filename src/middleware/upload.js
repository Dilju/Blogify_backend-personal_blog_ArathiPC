import * as multer from "multer";
import * as path from "path";
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/");
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    },
});
const fileFilter = (req, file, cb) => {
    const filetypes = /jpeg|jpg|png|gif/;
    const mimetype = filetypes.test(file.mimetype);
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    if (mimetype && extname)
        return cb(null, true);
    cb(new Error("Only image files are allowed!"));
};
export const upload = multer.default({ storage, fileFilter });
//# sourceMappingURL=upload.js.map
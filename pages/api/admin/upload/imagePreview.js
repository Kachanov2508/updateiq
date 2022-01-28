import nextConnect from 'next-connect';
import multer from 'multer';

const storage = multer.diskStorage ({
    destination: function (req, file, cb) {
        const dir = req.headers.dirpath
        cb(null, `./public/uploads/${dir}`)
    },
    filename: function (req, file, cb) {
          cb(null, file.originalname)
    }
})
  
const upload = multer({ storage: storage })

const apiRoute = nextConnect({
  onError(error, req, res) {
    res.status(501).json({ error: `Sorry something Happened! ${error.message}` });
  },
  onNoMatch(req, res) {
    res.status(405).json({ error: `Method '${req.method}' Not Allowed` });
  },
});

apiRoute.use(upload.single("previewImage"));

apiRoute.post((req, res) => {
  res.status(200).json({ data: 'success' });
});

export default apiRoute;

export const config = {
  api: {
    bodyParser: false, // Disallow body parsing, consume as stream
  },
};


// https://betterprogramming.pub/upload-files-to-next-js-with-api-routes-839ce9f28430
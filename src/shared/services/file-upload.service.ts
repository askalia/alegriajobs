import request from "superagent"
import { storage } from "./firebase-utils.service";


type IUploadFileAdapter = (file: File, customFileName: string) => Promise<string>;

const uploadFileToCloudinary: IUploadFileAdapter = async (file: File, customFileName: string): Promise<string> => {        
    const url = `${process.env.REACT_APP_CLOUDINARY_API_URL}/${process.env.REACT_APP_CLOUDINARY_API_VERSION}/${process.env.REACT_APP_CLOUDINARY_KEY}/upload`;        
    return new Promise((resolve, reject) => {
        request.post(url)
            .field('upload_preset', process.env.REACT_APP_CLOUDINARY_PRESET_NAME as string)
            .field('file', file || "")
            .field('public_id', customFileName || file.name)
            .field('multiple', false)
            .on('progress', (progress) => {
                console.log('upload progress : ', progress)            
            })
            .end((error, response) => {
resolve(response?.body?.secure_url)
            })
    })
        
}

const uploadFileToFirebase: IUploadFileAdapter = async (file: File, customFileName: string): Promise<string> => {
    const fileExtension = file.type.split('/')[1];
    const uploadTask = storage.ref(`${process.env.REACT_APP_FIREBASE_RESUMES_PATH}/${customFileName}.${fileExtension}`).put(file);
    return new Promise((resolve, reject) => {
        uploadTask.on(
            "state_changed",
            (snapShot) => {
                //takes a snap shot of the process as it is happening
                console.log(snapShot);
            },
            (err) => {
                //catches the errors
                console.log(err);
                reject(err)
            },
            () => {
                // gets the functions from storage refences the image storage in firebase by the children
                // gets the download url then sets the image from firebase as the value for the imgUrl key:
                resolve(
                    storage
                    .ref(process.env.REACT_APP_FIREBASE_RESUMES_PATH)
                    .child(`${customFileName}.${fileExtension}`)
                    .getDownloadURL()
                )
                
            }
        )           
    });
}

const DEFAULT_FILE_STORAGE_PROVIDER = "firebase";

const uploadAdapter = (): IUploadFileAdapter => (({
    "cloudinary": uploadFileToCloudinary,
    "firebase": uploadFileToFirebase
} as { [key: string] : IUploadFileAdapter })
[(process.env.REACT_APP_FILE_STORAGE_PROVIDER || DEFAULT_FILE_STORAGE_PROVIDER).toLowerCase()]);

export const fileUploadService = {
    uploadFile: uploadAdapter()
}
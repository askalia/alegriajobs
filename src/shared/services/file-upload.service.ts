import request from "superagent"

const uploadFile = async (file: File, customFileName?: string): Promise<string> => {
    //cloudinary.uploader.upload("my_picture.jpg", function(error, result) { console.log(result) });    

    console.log('uploadFile : ', file)
    const url = `https://api.cloudinary.com/v1_1/${
            process.env.REACT_APP_CLOUDINARY_KEY}/upload`;
        //const title = this.titleEl.value;
        console.log('URL upload : ', url)
    return new Promise((resolve, reject) => {

        request.post(url)
            .field('upload_preset', process.env.REACT_APP_CLOUDINARY_PRESET_NAME as string)
            .field('file', file || "")
            .field('public_id', customFileName || file.name)
            //.field('name', 'uploadFile')
            .field('multiple', false)
            //.field('tags', title ? `myphotoalbum,${title}` : 'myphotoalbum')
            //.field('context', title ? `photo=${title}` : '')
            .on('progress', (progress) => {
                console.log('upload progress : ', progress)
                //this.onPhotoUploadProgress(photoId, file.name, progress)
            })
            .end((error, response) => {
                //console.log('END upload : ', response)
                //this.onPhotoUploaded(photoId, fileName, response);
                resolve(response?.body?.secure_url)
            })
    })
        
}

export const fileUploadService = {
    uploadFile   
}
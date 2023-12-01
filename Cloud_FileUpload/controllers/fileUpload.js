const File = require("../models/File");
const cloudinary = require('cloudinary').v2;
//localFileUpload -> handler function

exports.localFileUpload = async(req, res) => {
    try{

        //fetch file
        const file = req.files.file;
        console.log("File Aagayi jee -> ", file);

        //create path where file need to be stored--
        let path = __dirname + "/files" + Date.now() + `.${file.name.split('.')[1]}`;
        console.log("PATH-> ",path)

        //add path to the move function
        file.mv(path, (err) => {
            console.log(err)
        });

        //create a successfull response
        res.json({
            success:true,
            message:'Local file uploaded successfully',
        });

    } catch(error){
        console.log(error);
    }
}

function isFileTypeSupported(type, supportTypes){
    return supportTypes.includes(type);
}

async function uploadFileToCloudinary(file, folder){
    const options = {folder};
    console.log("temp file path ",  file.tempFilePath);
    return await cloudinary.uploader.upload(file.tempFilePath, options);
}


//image upload ka handler-->
exports.imageUpload = async(req, res) => {
    try{
        //data fetch...
        const{name,tags,email} = req.body;
        console.log(name,tags,email);
 
        const file = req.files.imageFile;
        console.log(file);

        //validation
        const supportTypes = ["jpg", "jpeg", "png"];
        const fileType = file.name.split('.')[1].toLowerCase();
        console.log("file type ", fileType);

        if(!isFileTypeSupported(fileType, supportTypes)){
            return res.status(400).json({
                success:false,
                message:'File format not supported',
            })
        }

        //file format supported
        console.log("uploading....")
        const response = await uploadFileToCloudinary(file, "Fs");
        console.log(response);

        // db me entry save krni haa...
        const fileData = await File.create({
            name,
            tags,
            email,
            imageUrl:response.secure_url,
        });

        res.json({
            success:true,
            imageUrl:response.secure_url,
            message:'Image Successfully Uploaded',
        })

    } catch(error){
        console.error(error);
        res.status(400).json({
            success:false,
            message:'Something went wrong',
        }); 
    }
}

//video upload ka handler -->

exports.videoUpload = async(req, res) => {

    try{
    
        const{name,tags} = req.body;
        console.log(name,tags);

        const file = req.files.videoFile;
        console.log(file);

        console.log("uploading....")
        const response = await uploadFileToCloudinary(file, "Fs");
        console.log(response);

        res.json({
            success:true,
            imageUrl:response.secure_url,
            message:'Video Successfully Uploaded',
        })

    } catch(error){
        console.error(error);
        res.status(400).json({
            success:false,
            message:'Something went wrong',
        }); 
    }
}
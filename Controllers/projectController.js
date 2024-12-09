const projects = require('../Models/projectSchema')

exports.addProjectAPI=async(req,res)=>{
    console.log("Inside add ProjectAPI");

    const {title,language,github,website,overview}=req.body
    const projectImg = req.file.filename//from multermiddleware
    const userId = req.payload//from jwt middleware
    // console.log(req.file);
    //console.log(title,language,github,website,overview,userId);
    try{
        const project = await projects.findOne({github})
        if(project){
            res.status(401).json("Project already existing")
        }
        else{
            const newProject = new projects({title,language,github,website,overview,projectImg,userId})
            await newProject.save()
            res.status(200).json(newProject)
        }
    }
    catch(err){
        res.status(406).json(err)
    }
  
}
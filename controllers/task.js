import Task from "../models/task.js";
import Section from "../models/section.js";

export const create =async(req,res)=>{
    const {sectionId}=req.body;
    try{
        
        if (!sectionId || typeof sectionId !== 'string') {
            return res.status(400).json({ error: "Invalid or missing section ID" });
        }
        const section =await Section.findById(sectionId);
        if (!section) {
            return res.status(404).json({ error: "Section not found" });
        }
        const tasksCount=await Task.countDocuments({ section: sectionId });
        const task= await Task.create({
            section:sectionId,
            position:tasksCount>0?tasksCount:0
        })
        if (!task) {
            return res.status(400).json({ error: "Failed to create task" });
        }
        res.status(201).json(task);
    }catch(error){
        res.status(500).json(error);
    }
}

export const update = async(req,res)=>{
    const {taskId}=req.params;
    try{
        const task=await Task.findByIdAndUpdate(
            taskId,
            {$set: req.body}
        )
        res.status(200).json(task);
    }catch(error){
        res.status(500).json(error);
    }
}

export const deleteTask =async(req,res)=>{
    const {taskId}=req.params;
    try{
        const currentTask=await Task.findById(taskId);
        await Task.deleteOne({_id:taskId});
        const tasks= await Task.find({section:currentTask.section}).sort('position')
        for (const key in tasks){
            await Task.findByIdAndUpdate(
                tasks[key].id,
                {$set:{position:key}}
            )
        }
        res.status(200).json("deleted");
    }catch(error){
        res.status(500).json(error);
    }
}

export const updatePosition =async(req,res)=>{
    const {
        resourceList,
        destinationList,
        resourceSectionId,
        destinationSectionId
    }=req.body;
    const resourceListReverse=resourceList.reverse();
    const destinationListReverse=destinationList.reverse();
    try{
        if(resourceSectionId !== destinationSectionId){
            for(const key in resourceListReverse){
                await Task.findByIdAndUpdate(
                    resourceListReverse[key].id,
                    {
                        $set:{
                            section:resourceSectionId,
                            position:key
                        }
                    }
                )
            }
        }
        for (const key in destinationListReverse) {
            await Task.findByIdAndUpdate(
                destinationListReverse[key].id,
                {
                    $set:{
                        section:destinationSectionId,
                        position:key
                    }
                }
            )
        }
        return res.status(200).json('updated')
    }catch(error){
        return res.status(500).json(error);
    }

}
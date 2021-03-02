const { Group, validateGroup } = require("../models/group");
const {User} = require("../models/user");

const createGroup = async( req,res )=> {
    const { error } = validateGroup(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const code = await Group.findOne({ groupCode: req.body.groupCode });
    
    if( code ) return res.status(400).send('Group Code already Exit');
    let group = new Group({
        groupCode: req.body.groupCode,
        groupName: req.body.groupName
    })
    
    group = await group.save();

    let user = await User.findById(req.user._id)
    user.group.push(group._id)
    await user.save();
    res.send(group)
}

const joinGroup = async(req,res) => {

    let user = await User.findById(req.user._id);
    if( !user ) return res.status(404).send('User Not found');
    
    let group = await Group.findOne({ groupCode: req.body.groupCode});
    if( !group ) return res.send("Group doesn't Exist");

    group.students.push(req.user._id);
    group = await group.save();

    user.group.push(group._id);
    await user.save();

    res.send(group);
}

const getAllGroup = async(req,res) => {
    const group = await User.findById(req.user._id).select('group').populate({
        path:'group'
    });

    if( !group ) res.status(404).send("Group Doesn't exists");
    res.send(group);
}

const getStudentsInsideGroup = async( req, res) => {
    const group = await Group.findById(req.body.groupId).select('students').populate({
        path: 'students', select: {
            name: 1,
            email: 1
        }
    });

    if( !group ) return res.status(404).send("Group Doesn't exists");
    res.send(group.students)
}

const getTestPaperInsideGroup = async( req, res ) => {
    const group = await Group.findById(req.body.groupId).select('tests').populate({
        path: 'tests', 
        populate:{
            path: 'questions',
            populate:{
                path:'options'
            }
        }
    })

    if( !group ) return res.status(404).send("Group Doesn't exists");
    res.send(group.tests);
}

module.exports = {
    createGroup,
    joinGroup,
    getAllGroup,
    getStudentsInsideGroup,
    getTestPaperInsideGroup
}
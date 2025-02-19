const User =  require('../models/user.model');
const Profile = require('../models/profile.model');

module.exports.createProfile = async (req, res) => {
    try {
        
        const {
            fullname, 
            city,
            gender,
            dateofbirth,
            bio,
            paymentmethod,
            sociallinklanguage,
            phonenumber

        } = req.body;


        if(fullname === undefined
            || city === undefined
            ||  gender === undefined
            || dateofbirth === undefined
            || bio === undefined
            || paymentmethod === undefined
            || sociallinklanguage === undefined
            || phonenumber === undefined){
            return res.status(400).json({
                message : "Please fill all the fields"
            });
        }

        const userId = req.user._id;

        const profile = new Profile({
            userId,
            fullname,
            city,
            gender,
            dateofbirth,
            bio,
            paymentmethod,
            sociallinklanguage,
            phonenumber

        });


        const profileData = await profile.save();


        if(!profileData){
            return res.status(400).json({
                message : "Profile not created"
            })
        }


        return res.status(200).json({
            status: 200,
            message : "Profile Created Successfully"
        })



    } catch (error) {
        
        return res.status(500).json({
            message : error.message
        })

    }
}
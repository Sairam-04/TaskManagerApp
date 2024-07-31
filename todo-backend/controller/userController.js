const SALT = require("../constants/constants");
const User = require("../models/userModel");
const sendToken = require("../utils/jwtToken");
const crypto = require("crypto")

exports.checkIsGoogleLogin = async (req, res, next) =>{
	try{
		if(req.body.googleAccessToken){
			const data = await fetch(process.env.GOOGLE_AUTH_URL, {
				headers:{
					Authorization: `Bearer ${req.body.googleAccessToken}`
				}
			});
			const json = await data.json();
			const {given_name, family_name, email, picture} = json;
			const user = await User.findOne({email});
			if (!user) {
				const result = await User.create({
					firstName: given_name,
					lastName: family_name,
					email,
					profilePicture: picture
				})
				sendToken(result, 200, res);
			}
			sendToken(user, 200, res);
		}else{
			return res.status(400).json({
				success: false,
				message: "Unable to Singin with Google",
			});
		}
	}catch(error){
		console.log(error)
		return res.status(500).json({
			success: false,
			message: "Internal Server Error",
			error
		});
	}
}

exports.registerUser = async (req, res, next) => {
	try {
		const { firstName, lastName, email, password } = req.body;
		const user = new User({
			firstName,
			email,
			lastName,
			password,
		});
		const genHash = crypto
          .pbkdf2Sync(password, SALT, 10000, 64, "sha512")
          .toString("hex");
		user.password = genHash;
		await user.save();
		sendToken(user, 200, res);
	} catch (error) {
		if (error.code === 11000 && error.keyPattern && error.keyPattern.email) {
			return res.status(400).json({
				success: false,
				message: "Email is already in use. Please choose a different email.",
			});
		}
		return res.status(500).json({
			success: false,
			message: "Internal Server Error",
		});
	}
};


exports.loginUser = async (req, res, next) => {
	try {
		const { email, password } = req.body;
		if (!email || !password) {
			return res.status(400).json({
				success: false,
				message: "Please Enter Valid Email or Password"
			})
		}
		const user = await User.findOne({ email: email }).select("+password");
		if (!user) {
			return res.status(404).json({
				success: false,
				message: "User Does not exist. Email or Password Invalid!"
			})
		}
		const isPasswordMatched = await user.comparePassword(password);
		if (!isPasswordMatched) {
			return res.status(200).json({
				success: false,
				message: "Password is Invalid!!"
			})
		}
		sendToken(user, 200, res);
	} catch (error) {
		console.log(error)
		return res.status(500).json({
			success: false,
			message: "Internal Server Error"
		})
	}
}

// exports.updateUser = async (req, res, next) => {
// 	try {
// 		const user_id = req.user._id;
// 		if (!user_id) {
// 			return res.status(400).json({
// 				success: false,
// 				message: "User Not Found"
// 			})
// 		}
// 		const newUserData = {
// 			name: req.body.name,
// 			email: req.body.email,
// 			phoneNumber: req.body.phoneNumber
// 		}
// 		const user = await User.findByIdAndUpdate(user_id, newUserData, {
// 			new: true,
// 			runValidators: true,
// 			useFindAndModify: true
// 		})
// 		if(!user){
// 			return res.status(200).json({
// 				success: false,
// 				message: "Failed to update"
// 			})
// 		}
// 		return res.status(200).json({
// 			success: true,
// 			user
// 		})
// 	}
// 	catch (err) {
// 		console.log(err)
// 		return res.status(500).json({
// 			success: false,
// 			error: err
// 		})
// 	}
// }

exports.getUser = async (req, res, next) =>{
	try{
		const user_id = req.user._id;
		if(!user_id){
			return res.status(400).json({
				success: false,
				message: "User Not Found"
			})
		}
		const user = await User.findById(user_id);
		return res.status(200).json({
			success: true,
			user
		})
	}catch(err){
		return res.status(500).json({
			success: false,
			error: err
		})
	}
}

// exports.resetPassword = async (req, res, next) =>{
// 	try{
// 		const user_id = req.user._id;
// 		if(!user_id){
// 			return res.status(400).json({
// 				success: false,
// 				message: "User Not Found"
// 			})
// 		}
// 		const user = await User.findById(user_id);
// 		if(!user){
// 			return res.status(400).json({
// 				success: false,
// 				message: "User does not exists"
// 			})
// 		}
// 		const {answer} = req.body;
// 		const isAnswerMatched = await user.compareAnswer(answer);
// 		if(!isAnswerMatched){
// 			return res.status(200).json({
// 				success: false,
// 				message: "Security Answer is not matched"
// 			})
// 		}
// 		const {newPassword} = req.body;
// 		if(newPassword.length <8){
// 			return res.status(200).json({
// 				success: false,
// 				message:"Password Length should be greater than or equal to 8 characters"
// 			})
// 		}
// 		user.password = await bcrypt.hash(newPassword, 10);
// 		user.save();

// 		return res.status(200).json({
// 			success: true,
// 			message:"Password Saved Successfully"
// 		})
// 	}catch(err){
// 		console.log(err)
// 		return res.status(500).json({
// 			success: false,
// 			error: err
// 		})
// 	}
// }
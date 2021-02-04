const User = require("../models/user");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");

const register = async (req, res) => {
   
   try {
      const { firstname, lastname, email, password, phone_number, address } = req.body;
      const targetUser = await User.findOne({ email })
      const phoneNumber = String(phone_number);

      if (targetUser) {
         res.status(400).send({ message: "Email already taken." });
      } else {
         const salt = bcryptjs.genSaltSync(Number(process.env.SALT_ROUND));
         const hashedPwd = bcryptjs.hashSync(password, salt);

         const user = new User({
            firstname,
            lastname,
            email,
            phone_number: phoneNumber,
            address,
            password: hashedPwd
         });

         const newUser = await user.save();
         
         const payLoad = {
            id: newUser._id,
            firstname: newUser.firstname,
            email: newUser.email,
         };
         const token = jwt.sign(payLoad, process.env.SECRET, { expiresIn: 86400 });

         res.status(201).send({ message: "User created.", token});
      }
   } catch (err) {
      res.status(500).send({ message: err.message }); 
   };
};

const login = async (req, res) => {
   try {
      const { email, password } = req.body;
      const targetUser = await User.findOne({ email });
      console.log(targetUser);
      if (!targetUser) {
         res.status(400).send({ message: "email or password incorrect" });
      } else {
         const isCorrect = bcryptjs.compareSync(password, targetUser.password);
         if (isCorrect) {
            const payLoad = {
               id: targetUser._id,
               firstname: targetUser.firstname,
               email: targetUser.email,
            };
            const token = jwt.sign(payLoad, process.env.SECRET, { expiresIn: 86400 });
            res.status(200).send({ token });
         } else {
            res.status(400).send({ message: "email or password incorrect" });
         }
      }
   } catch (err) {
      console.log(err);
      res.status(500).send({ message: err.message });
   }
};

module.exports = {
   register,
   login
};
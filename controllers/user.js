const db = require("../models");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");

const register = async (req, res) => {
   try {
      const { firstname, lastname, email, password, phone_number, address } = req.body;
      const targetUser = await db.User.findOne({ where: { email } });
      const phoneNumber = String(phone_number);

      if (targetUser) {
         res.status(400).send({ message: "Email already taken." });
      } else {
         const salt = bcryptjs.genSaltSync(Number(process.env.SALT_ROUND));
         const hashedPwd = bcryptjs.hashSync(password, salt);

         const newUser = await db.User.create({
            firstname,
            lastname,
            email,
            phone_number: phoneNumber,
            address,
            password: hashedPwd
         });

         const payLoad = {
            id: newUser.id,
            firstname: newUser.firstname,
            email: newUser.email,
         };
         const token = jwt.sign(payLoad, process.env.SECRET, { expiresIn: 86400 });

         res.status(201).send({ message: "User created.", token });
      }
   } catch (err) {
      res.status(500).send({ message: err.message }); 
   };
};

const login = async (req, res) => {
   try {
      const { email, password } = req.body;
      const targetUser = await db.User.findOne({ where: { email } });

      if (!targetUser) {
         res.status(400).send({ message: "email or password incorrect" });
      } else {
         const isCorrect = bcryptjs.compareSync(password, targetUser.password);
         if (isCorrect) {
            const payLoad = {
               id: targetUser.id,
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
      res.status(500).send({ message: err.message });
   }
};

module.exports = {
   register,
   login
};
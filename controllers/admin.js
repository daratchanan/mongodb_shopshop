const Admin = require("../models/Admin");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");

const register = async (req, res) => {
   try {
      const { firstname, lastname, email, password, phone_number, address } = req.body;
      
      if (password.length < 6) {
         return res.status(400).json({ message: "password morethan 6"});
      };

      const targetUser = await Admin.findOne({ email });

      if (targetUser) {
         res.status(400).send({ message: "Email already taken" });
      } else {
         const salt = bcryptjs.genSaltSync(Number(process.env.SALT_ROUND));
         const hashedPassword = bcryptjs.hashSync(password, salt);

         await Admin.create({
            firstname,
            lastname,
            email,
            phone_number,
            address,
            password: hashedPassword
         });
         res.status(201).send({ message: "User has been created" })
      }
   } catch (err) {
      res.status(500).send({ message: err.message });
   };
};

const login = async (req, res) => {
   try {
      const { email, password } = req.body;
      const targerUser = await Admin.findOne({ email });
      if (!targerUser) {
         res.status(400).send({ message: "Email or password is wrong" });
      } else {
         const isCorrect = bcryptjs.compareSync(password, targerUser.password);
         if (isCorrect) {
            const payLoad = {
               id: targerUser._id,
               firstname: targerUser.firstname,
               email: targerUser.email,
            };
            const token = jwt.sign(payLoad, process.env.SECRET, { expiresIn: 10000 });
            res.status(200).send({ token });
         } else {
            res.status(400).send({ message: "Email or password is wrong" });
         }
      }
   } catch (err) {
      res.status(500).send({ message: err.message });
   }
}

module.exports = {
   register,
   login
};
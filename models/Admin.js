module.exports = (sequelize, DataTypes) => {
   const Admin = sequelize.define("Admin", {
      firstname: {
         type: DataTypes.STRING,
         allowNull: false,
         validate: {
          len: [3,16]
         }
      },
      lastname: {
         type: DataTypes.STRING,
         allowNull: true,
         validate: {
            len: [3,16]
         }
      },
      email: {
         type: DataTypes.STRING,
         allowNull: false,
         unique: true
      },
      password: {
         type: DataTypes.STRING,
         allowNull: false,
      },
      phone_number: {
         type: DataTypes.STRING,
         allowNull: false
      },
      address: {
         type: DataTypes.STRING
      }
   }, {
      tableName: "admin",
   });

   return Admin;
};



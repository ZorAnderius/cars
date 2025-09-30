import { DataTypes, Model, UUIDV4 } from "sequelize";

class User extends Model {

  static initModel(sequelize) {
    return User.init({
      id: { type: DataTypes.UUID, defaultValue: UUIDV4, primaryKey: true },
      email: { type: DataTypes.STRING, allowNull: false, unique: true, validate: { isEmail: true } },
      password: { type: DataTypes.STRING, allowNull: false, validate: { min: 8, max: 50 } },
      role: { type: DataTypes.STRING, defaultValue: 'admin' }
    },
      {
        sequelize,
        modelName: "User",
        tableName: "users",
        timestamps: true,
        underscored: true
      });
  }
}

export default User;
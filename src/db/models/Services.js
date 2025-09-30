import { DataTypes, Model, UUIDV4 } from "sequelize";

class Service extends Model {

  static initModel(sequelize) {
    return Service.init({
      id: { type: DataTypes.UUID, defaultValue: UUIDV4, primaryKey: true },
      type: { type: DataTypes.STRING, allowNull: false, validate: { min: 3, max: 100 } },
      descrioption: { type: DataTypes.TEXT, allowNull: false, validate: { min: 3, max: 1000 } },
      price: { type: DataTypes.DOUBLE, allowNull: false, validate: { min: 0.0 } }
    },
      {
        sequelize,
        modelName: 'Service',
        tableName: 'services',
        timestamps: false,
        underscored: true
      });
  }
}

export default Service;
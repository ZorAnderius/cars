import { DataTypes, Model, UUIDV4 } from "sequelize";

class Service extends Model {

  static initModel(sequelize) {
    return Service.init({
      id: { type: DataTypes.UUID, defaultValue: UUIDV4, primaryKey: true },
      type: { type: DataTypes.STRING, allowNull: false},
      description: { type: DataTypes.TEXT, allowNull: false },
      price: { type: DataTypes.DOUBLE, allowNull: false}
    },
      {
        sequelize,
        modelName: 'Service',
        tableName: 'services',
        timestamps: true,
        underscored: true
      });
  }
}

export default Service;
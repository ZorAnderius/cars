import { DataTypes, Model } from "sequelize";

class Car extends Model {

  static initModel(sequelize) {
    return Car.init({
      id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
      model: { type: DataTypes.STRING, allowNull: false, validate: { min: 2, max: 30 } },
      year: { type: DataTypes.INTEGER, allowNull: false, validate: { min: 1900, max: 2050 } },
      price: { type: DataTypes.DOUBLE, allowNull: false, validate: { min: 0.0 } },
      mileage: { type: DataTypes.DOUBLE, allowNull: false, validate: { min: 0 } },
      bodyStyle: { type: DataTypes.STRING, allowNull: false, validate: { min: 2, max: 30 } },
      specs: { type: DataTypes.STRING, allowNull: true, validate: { min: 0, max: 100 } },
      photo: { type: DataTypes.STRING, allowNull: true }
    },
      {
        sequelize,
        modelName: 'Car',
        tableName: 'cars',
        timestamps: true,
        underscored: true,
      }
    );
  }

  static associate(models) {
    Car.hasMany(models.Review, { foreignKey: 'car_id', onDelete: 'CASCADE' });
  }
}

export default Car;
import { DataTypes, Model } from "sequelize";

class Car extends Model {

  static initModel(sequelize) {
    return Car.init({
      id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
      model: { type: DataTypes.STRING, allowNull: false },
      year: { type: DataTypes.INTEGER, allowNull: false },
      price: { type: DataTypes.DOUBLE, allowNull: false },
      mileage: { type: DataTypes.DOUBLE, allowNull: false },
      bodyStyle: { type: DataTypes.STRING, allowNull: false },
      specs: { type: DataTypes.STRING, allowNull: true },
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
    Car.hasMany(models.Review, { foreignKey: 'car_id', as: 'Review', onDelete: 'CASCADE' });
  }
}

export default Car;
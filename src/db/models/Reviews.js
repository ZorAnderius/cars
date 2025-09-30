import { DataTypes, Model } from "sequelize";

class Review extends Model {

  static initModel(sequelize) {
    return Review.init({
      id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
      content: { type: DataTypes.TEXT, allowNull: false },
      rating: { type: DataTypes.INTEGER, allowNull: true},
      author: { type: DataTypes.STRING, allowNull: false },
      car_id: { type: DataTypes.UUID, allowNull: false }
    },
      {
        sequelize,
        modelName: "Review",
        tableName: "reviews",
        timestamps: true,
        underscored: true
      }
    )
  }

  static associate(models) {
    Review.belongsTo(models.Car, { foreignKey: 'car_id', as: 'Car' })
  }
}

export default Review;
import { DataTypes, Model } from "sequelize";

class Review extends Model {
  static initModel(sequalize) {
    return Review.init({
      id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
      content: { type: DataTypes.TEXT, allowNull: false, validate: { min: 2, max: 2000 } },
      rating: { type: DataTypes.INTEGER, allowNull: true, validate: { min: 1, max: 10 } },
      author: { type: DataTypes.STRING, allowNull: false, validate: { min: 2, max: 30 } },
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
    Review.belongsTo(models.Car, { foreignKey: 'car_id' })
  }
}

export default Review;
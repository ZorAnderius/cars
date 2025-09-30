import { DataTypes, Model, UUIDV4 } from "sequelize";

class Session extends Model {

  static initModel(sequelize) {
    return Session.init({
      id: { type: DataTypes.UUID, defaultValue: UUIDV4, primaryKey: true },
      sessionId: { type: DataTypes.STRING, allowNull: false, unique: true },
      userId: { type: DataTypes.UUID, allowNull: false },
      data: { type: DataTypes.JSON, allowNull: true },
      expiresAt: { type: DataTypes.DATE, allowNull: false }
    },
      {
        sequelize,
        modelName: "Session",
        tableName: "sessions",
        timestamps: true,
        underscored: true
      });
  }

  static associate(models) {
    Session.belongsTo(models.User, { foreignKey: 'userId' });
  }
}

export default Session;

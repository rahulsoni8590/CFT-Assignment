import { DataTypes } from "sequelize";
import sequelize from "../config/sql.config.js";

const Categorymodel = sequelize.define("Category", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING, 
        allowNull: false,
    },
});

const Servicemodel = sequelize.define("Service", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    categoryid: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Categorymodel, 
            key: "id", 
        },
    },
    name: {
        type: DataTypes.STRING, 
        allowNull: false,
    },
    type: {
        type: DataTypes.ENUM("VIP", "Normal"),
        allowNull: false,
        defaultValue: "Normal",
    },
});

Categorymodel.hasMany(Servicemodel, { foreignKey: "categoryid" });
Servicemodel.belongsTo(Categorymodel, { foreignKey: "categoryid" });

export { Categorymodel, Servicemodel };

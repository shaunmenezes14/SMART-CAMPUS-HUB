module.exports = (sequelize, DataTypes) => {
  const Attendance = sequelize.define(
    "Attendance",
    {
      date: {
        type: DataTypes.DATEONLY,
        allowNull: false,
      },
      status: {
        type: DataTypes.ENUM("present", "absent"),
        allowNull: false,
      },
      semester: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      section: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      timestamps: true,
      indexes: [
        {
          unique: true,
          fields: ["studentId", "subjectId", "date"],
        },
      ],
    }
  );

  Attendance.associate = (models) => {
    Attendance.belongsTo(models.Student, { foreignKey: "studentId" });
    Attendance.belongsTo(models.Subject, { foreignKey: "subjectId" });
    Attendance.belongsTo(models.Faculty, { foreignKey: "facultyId" });
    Attendance.belongsTo(models.Department, { foreignKey: "departmentId" });
  };

  return Attendance;
};
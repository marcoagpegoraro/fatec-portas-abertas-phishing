module.exports = (sequelize, DataTypes) => {
    var User = sequelize.define('User', {
        login: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    });
    
    return User;
};
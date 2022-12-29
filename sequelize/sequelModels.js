const { Sequelize, DataTypes, Model } = require('sequelize');
const {sequelize} = require('./SequelConfig');

class BotChannels extends Model{}
class BotMessages extends Model{}
class BotServers extends Model{}

BotChannels.init(
    {
        ServerID: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        MessageChannelID: {
            primaryKey: true,
            type: DataTypes.TEXT,
            allowNull: false
        }
    }, 
    {   
        timestamps: false,
        sequelize: sequelize,
        tableName: 'BotChannels'
    }, 
)

BotMessages.init(
    {
        MessageChannelID: {
            primaryKey: true,
            type: DataTypes.TEXT,
            allowNull: false
        },
        MessageAuthorID: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        MessageContent: {
            type: DataTypes.TEXT,
            allowNull: false
        },
    }, 
    {   
        timestamps: true,
        createdAt: 'MessageTimestamp',
        updatedAt: false,
        sequelize: sequelize,
        tableName: "BotMessages"
    },
    
)

BotServers.init(
    {
        ServerID: {
            primaryKey: true,
            type: DataTypes.TEXT,
            allowNull: false
        },
        ServerName: {
            type: DataTypes.TEXT,
            allowNull: false
        },
    }, 
    {
        createdAt: 'DateJoined',
        timestamps: true,
        updatedAt: false,
        sequelize: sequelize,
        tableName: "BotServers"
    },
)

module.exports = {
    BotChannels,
    BotServers,
    BotMessages
}
const { Sequelize, DataTypes, Model } = require('sequelize');
import { sequelize } from './SequelConfig';

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
            type: DataTypes.TEXT,
            allowNull: false
        }
    }, 
    {
        tableName: 'BotChannels'
    }, 
    {sequelize}
)

BotMessages.init(
    {
        MessageChannelID: {
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
        MessageTimestamp: {
            type: DataTypes.TEXT,
            allowNull: false
        },
    }, 
    {
        tableName: "BotMessages"
    },
    {sequelize}
)

BotServers.init(
    {
        ServerID: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        ServerName: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        DateJoined: {
            type: DataTypes.TEXT,
            allowNull: false
        },
    }, 
    {
        tableName: "BotServers"
    },
    {sequelize}
)
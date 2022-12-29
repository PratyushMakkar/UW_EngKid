const { MessageContent } = require("../Models/MessageContent");
const {InsertChannelIDIntoServer, InsertMessageIntoDatabase, SearchMessageWithinDatabase
, GetChannelIDFromServer, JoinServer, ClearAllTables, CloseConnection} = require("../sequelize/BotCRUDFunctions");

const content = new MessageContent(
    "ChannelID2",
    "Author#2",
    "This is content for author 2",
    "15:16:17 UTC"
)

describe('Ensuring that all messages are added into the server', () => {
        beforeAll(async ()=> {
           await ClearAllTables();
        });
        
        test('Testing if an inputted message can be retrieved', async ()=> {
            const messageResult = await InsertMessageIntoDatabase(content);
            const result = await SearchMessageWithinDatabase(
                content.channelID,
                content.author
            );
            expect(result.at(0)).toStrictEqual(messageResult);
        })

        afterAll(async () => {
            await ClearAllTables();
            await CloseConnection();
        });

    }
)
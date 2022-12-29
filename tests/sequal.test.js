const { MessageContent } = require("../Models/MessageContent");
const {InsertChannelIDIntoServer, InsertMessageIntoDatabase, SearchMessageWithinDatabase
, GetChannelIDFromServer, JoinServer, ClearAllTables} = require("../sequelize/BotCRUDFunctions");

const content = new MessageContent(
    "ChannelID1",
    "Author#1",
    "This is content for author 1",
    "15:16:17 UTC"
)

describe('Ensuring that all messages are added into the server', () => {
        beforeEach(()=> {
            return ClearAllTables()
        });
        
        test('Testing if an inputted message can be retrieved', async ()=> {
            await InsertMessageIntoDatabase(content);
            expect(SearchMessageWithinDatabase(
                content.channelID,
                content.author
            )).toBe(content);
        })

    }
)
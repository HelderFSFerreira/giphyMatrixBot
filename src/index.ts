import {
    AutojoinRoomsMixin,
    LogLevel,
    LogService,
    PantalaimonClient,
    RichConsoleLogger,
    SimpleFsStorageProvider
} from "matrix-bot-sdk";
import * as path from "path";
import config from "./config";
import CommandHandler from "./commands/handler";

// First things first: let's make the logs a bit prettier.
LogService.setLogger(new RichConsoleLogger());

// For now let's also make sure to log everything (for debugging)
LogService.setLevel(LogLevel.DEBUG);

// Print something so we know the bot is working
LogService.info("index", "Bot starting...");

// Prepare the storage system for the bot
const storage = new SimpleFsStorageProvider(path.join(config.dataPath, "bot.json"));

// This is the startup closure where we give ourselves an async context
(async function () {
    
    const pantalaimon = new PantalaimonClient(config.homeserverUrl, storage);
    const client = await pantalaimon.createClientWithCredentials(config.username, config.password);

    // Setup the autojoin mixin (if enabled)
    if (config.autoJoin) {
        AutojoinRoomsMixin.setupOnClient(client);
    }

    // Prepare the command handler
    const commands = new CommandHandler(client);

    await commands.start();
    LogService.info("index", "Starting sync...");
    await client.start(); // This blocks until the bot is killed
})();


// docker run -it --rm -v docker run -it --rm -v /path/to/pantalaimon/dir:/data -p 8008:8008 pantalaimon:/data -p 8008:8008 matrixdotorg/pantalaimon
// docker run -it --rm -v /Users/h.ferreira/Documents/projects/learning/pantalaimon/volume:/data -p 8008:8008 matrixdotorg/pantalaimon
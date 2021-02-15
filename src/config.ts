import * as config from "config";

interface IConfig {
    homeserverUrl: string;
    accessToken: string;
    username: string;
    password: string
    autoJoin: boolean;
    dataPath: string;
    webAvatarUrl: string,
    webUrl: string
}

export default <IConfig>config;

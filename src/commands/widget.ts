import { LogService, MatrixClient } from "matrix-bot-sdk";
import { IWidget } from "matrix-widget-api";
import config from "./../config";
import * as crypto from "crypto";


export interface IStateEvent<T> {
    type: string;
    state_key: string;
    content: T;
}

export interface ILayout {
    widgets: {
        [widgetId: string]: {
            container: "top" | "right";
            index?: number;
            width?: number;
            height?: number;
        };
    };
}

export class GiphyWidget {
    
    private constructor() {
        //do nothing
    }

    public static async getWidget(client: MatrixClient, args: string[]): Promise<IStateEvent<IWidget>> {
        const widgetId = crypto.createHash('sha256').update('test').digest('hex');
        
        return {
            type: "im.vector.modular.widgets",
            state_key: widgetId,
            content: {
                creatorUserId: await client.getUserId(),
                id: widgetId,
                type: "m.custom",
                waitForIframeLoad: true,
                name: "Giphy",
                avatar_url: config.webAvatarUrl,
                url: config.webUrl + encodeURIComponent(args.join(' ')),
                data: {
                    title: await client.getUserId(),
                    auditoriumId: await client.getUserId(),
                },
            } as IWidget,
        }
    }

    public static getLayout(widget: IStateEvent<IWidget>): IStateEvent<ILayout> {
        return {
            type: "io.element.widgets.layout",
            state_key: "",
            content: {
                widgets: {
                    [widget.state_key]: {
                        container: "top",
                        index: 0,
                        width: 100,
                        height: 40,
                    },
                },
            },
        };
    }

}
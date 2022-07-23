import { createContext } from "react";

export interface AppContextInterface {
    url: string
}

export const AppCtx = createContext<AppContextInterface | null>(null);

export function AppCtxProvider(props: any) {

    const sampleAppContext: AppContextInterface = {
        url: "http://localhost:8080"
    };

    return (
        <AppCtx.Provider value={sampleAppContext}>
            { props.children }
        </AppCtx.Provider>
        );
}
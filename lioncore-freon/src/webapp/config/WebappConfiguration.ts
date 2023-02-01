import type { PiEnvironment } from "@projectit/core";
import { LanguageInitializer } from "../language/LanguageInitializer";
import type { IServerCommunication } from "../server/IServerCommunication";
// import { ServerCommunication } from "../server/ServerCommunication";
import { IndexedDBCommunication } from "../server/IndexedDBCommunication";

/**
 * The one and only reference to the actual language for which this editor runs
 */
import { LIonCoreEnvironment } from "../../picode/config/gen/LIonCoreEnvironment";
export const editorEnvironment: PiEnvironment = LIonCoreEnvironment.getInstance();
LanguageInitializer.initialize();

/**
 * The one and only reference to the server on which the models are stored
 */
// export const serverCommunication: IServerCommunication = ServerCommunication.getInstance();
export const serverCommunication: IServerCommunication = IndexedDBCommunication.getInstance();


// TODO rethink these interfaces
import type { PiElement } from "@projectit/core";
import { PiNamedElement } from "@projectit/core";


/**
 * Takes care of the communication with the persistence layer.
 * Which implementation is used is configured in {@link WebappConfiguration}.
 */
export interface IServerCommunication {

    /**
     * Takes 'piUnit' and stores it according to the data in 'modelInfo'
     * @param modelName
     * @param unitName
     * @param piUnit
     */
    putModelUnit(modelName: string, unitName: string, piUnit: PiElement);

    /**
     * Deletes the unit according to the data in 'modelInfo' from the server
     * @param modelName
     * @param unitName
     */
    deleteModelUnit(modelName: string, unitName: string);

    /**
     * Renames 'piUnit' in model with name 'modelName' to 'newName'.
     * @param modelName
     * @param oldName
     * @param newName
     * @param piUnit
     */
    renameModelUnit(modelName: string, oldName: string, newName: string, piUnit: PiNamedElement) ;

    /**
     * Deletes the complete model with name 'modelName', including all its model units
     * @param modelName
     */
    deleteModel(modelName: string);

    /**
     * Reads the list of model units that are available on the server and calls 'modelListCallback'.
     * @param modelListCallback
     */
    loadModelList(modelListCallback: (names: string[]) => void);

    /**
     * Reads the list of units in model 'modelName' that are available on the server and calls 'modelListCallback'.
     * @param modelName
     * @param unitListCallback
     */
    loadUnitList(modelName: string, unitListCallback: (names: string[]) => void);

    /**
     * Reads the model unit according to the data in 'modelInfo' from the server and
     * calls 'loadCallBack', which takes the model unit as parameter.
     * @param modelName
     * @param unitName
     * @param loadCallback
     */
    loadModelUnit(modelName: string, unitName: string, loadCallback: (piUnit: PiElement) => void);

    /**
     * Reads the public interface of the model unit according to the data in 'modelInfo' from the server and
     * calls 'loadCallBack', which takes the model unit as parameter.
     * @param modelName
     * @param unitName
     * @param loadCallback
     */
    loadModelUnitInterface(modelName: string, unitName: string, loadCallback: (piUnit: PiElement) => void);

    /**
     * Reads all interfaces for all available units of model 'modelName' and calls loadCallback for each.
     * @param languageName
     * @param modelName
     * @param loadCallback
     */

    // getInterfacesForModel(languageName: string, modelName: string, loadCallback: (piModel: PiElement) => void);

}

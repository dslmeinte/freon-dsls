// Generated by the ProjectIt Language Generator.
import { observable, makeObservable } from "mobx";
import {
    MobxModelElementImpl,
    observablepart,
    PiNamedElement,
    PiUtils,
    PiParseLocation,
    matchElementList,
    matchPrimitiveList,
    matchReferenceList
} from "@projectit/core";
import { JsonValue, JsonMetaType } from "./internal";

/**
 * Class JsonFile is the implementation of the concept with the same name in the language definition file.
 * It uses mobx decorators to enable parts of the language environment, e.g. the editor, to react
 * to changes in the state of its properties.
 */
export class JsonFile extends MobxModelElementImpl implements PiNamedElement {
    /**
     * A convenience method that creates an instance of this class
     * based on the properties defined in 'data'.
     * @param data
     */
    static create(data: Partial<JsonFile>): JsonFile {
        const result = new JsonFile();
        if (!!data.name) {
            result.name = data.name;
        }
        if (!!data.contents) {
            result.contents = data.contents;
        }
        if (!!data.parse_location) {
            result.parse_location = data.parse_location;
        }
        return result;
    }

    readonly $typename: JsonMetaType = "JsonFile"; // holds the metatype in the form of a string
    $id: string; // a unique identifier
    parse_location: PiParseLocation; // if relevant, the location of this element within the source from which it is parsed
    name: string = ""; // implementation of name
    contents: JsonValue; // implementation of part 'contents'

    constructor(id?: string) {
        super();
        if (!!id) {
            this.$id = id;
        } else {
            this.$id = PiUtils.ID(); // uuid.v4();
        }
        makeObservable(this, { name: observable });

        // both 'observablepart' and 'observablelistpart' change the get and set of an attribute
        // such that the parent-part relationship is consistently maintained,
        // and make sure the part is observable
        observablepart(this, "contents");
    }

    /**
     * Returns the metatype of this instance in the form of a string.
     */
    piLanguageConcept(): JsonMetaType {
        return this.$typename;
    }

    /**
     * Returns the unique identifier of this instance.
     */
    piId(): string {
        return this.$id;
    }

    /**
     * Returns true if this instance is a model concept.
     */
    piIsModel(): boolean {
        return false;
    }

    /**
     * Returns true if this instance is a model unit.
     */
    piIsUnit(): boolean {
        return false;
    }

    /**
     * Returns true if this instance is an expression concept.
     */
    piIsExpression(): boolean {
        return false;
    }

    /**
     * Returns true if this instance is a binary expression concept.
     */
    piIsBinaryExpression(): boolean {
        return false;
    }
    /**
     * Matches a partial instance of this class to this object
     * based on the properties defined in the partial.
     * @param toBeMatched
     */
    public match(toBeMatched: Partial<JsonFile>): boolean {
        let result: boolean = true;
        if (result && toBeMatched.name !== null && toBeMatched.name !== undefined && toBeMatched.name.length > 0) {
            result = result && this.name === toBeMatched.name;
        }
        if (result && !!toBeMatched.contents) {
            result = result && this.contents.match(toBeMatched.contents);
        }
        return result;
    }
}

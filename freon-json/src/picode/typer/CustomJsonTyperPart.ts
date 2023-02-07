// Generated by the ProjectIt Language Generator.
import { PiElement, PiType, PiTyper, PiTyperPart } from "@projectit/core";
import { JsonTyper } from "../typer/gen/JsonTyper";

/**
 * Class 'CustomJsonTyperPart' is meant to be a convient place to add any
 * custom code for type checking.
 */
export class CustomJsonTyperPart implements PiTyperPart {
    mainTyper: JsonTyper;

    isType(modelelement: PiElement): boolean | null {
        return null;
    }

    inferType(modelelement: PiElement): PiType | null {
        return null;
    }

    equals(type1: PiType, type2: PiType): boolean | null {
        return null;
    }

    conforms(type1: PiType, type2: PiType): boolean | null {
        return null;
    }

    conformsList(typelist1: PiType[], typelist2: PiType[]): boolean | null {
        return null;
    }

    commonSuper(typelist: PiType[]): PiType | null {
        return null;
    }

    public getSuperTypes(type: PiType): PiType[] | null {
        return null;
    }
}

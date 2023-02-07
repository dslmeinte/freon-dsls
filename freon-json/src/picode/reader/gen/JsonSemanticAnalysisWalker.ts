// Generated by the ProjectIt Language Generator.
import { JsonEveryConcept, JsonBoolean } from "../../language/gen";
import { JsonWorker, JsonDefaultWorker } from "../../utils/gen";
import { PiNamedElement, Language, LanguageEnvironment, PiElementReference } from "@projectit/core";

export class JsonSemanticAnalysisWalker extends JsonDefaultWorker implements JsonWorker {
    changesToBeMade: Map<JsonEveryConcept, JsonEveryConcept> = null;

    constructor(changesToBeMade: Map<JsonEveryConcept, JsonEveryConcept>) {
        super();
        this.changesToBeMade = changesToBeMade;
    }

    private findReplacement(modelelement: JsonEveryConcept, referredElem: PiElementReference<PiNamedElement>) {
        const scoper = LanguageEnvironment.getInstance().scoper;
        const possibles = scoper.getVisibleElements(modelelement).filter(elem => elem.name === referredElem.name);
        if (possibles.length > 0) {
            // element probably refers to something with another type
            let replacement: JsonEveryConcept = null;
            for (const elem of possibles) {
                const metatype = elem.piLanguageConcept();
            }
            this.changesToBeMade.set(modelelement, replacement);
        } else {
            // true error, or boolean "true" or "false"
            if (referredElem.name === "true") {
                this.changesToBeMade.set(modelelement, JsonBoolean.create({ value: true }));
            } else if (referredElem.name === "false") {
                this.changesToBeMade.set(modelelement, JsonBoolean.create({ value: false }));
            }
        }
    }
}

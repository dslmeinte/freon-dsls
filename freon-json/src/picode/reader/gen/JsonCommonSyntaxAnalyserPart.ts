// Generated by the ProjectIt Language Generator.
import { net } from "net.akehurst.language-agl-processor";
import SPPTBranch = net.akehurst.language.api.sppt.SPPTBranch;
import {} from "../../language/gen";
import { JsonSyntaxAnalyser } from "./JsonSyntaxAnalyser";
import { PiElementReference } from "@projectit/core";

export class JsonCommonSyntaxAnalyserPart {
    mainAnalyser: JsonSyntaxAnalyser;

    constructor(mainAnalyser: JsonSyntaxAnalyser) {
        this.mainAnalyser = mainAnalyser;
    }
}

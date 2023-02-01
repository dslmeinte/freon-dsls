// Generated by the ProjectIt Language Generator.
import { net } from "net.akehurst.language-agl-processor";
import SyntaxAnalyser = net.akehurst.language.api.syntaxAnalyser.SyntaxAnalyser;
import SharedPackedParseTree = net.akehurst.language.api.sppt.SharedPackedParseTree;
import SPPTBranch = net.akehurst.language.api.sppt.SPPTBranch;
import SPPTLeaf = net.akehurst.language.api.sppt.SPPTLeaf;
import SPPTNode = net.akehurst.language.api.sppt.SPPTNode;
import { PiNamedElement, PiParseLocation, PiElementReference } from "@projectit/core";
import { MetamodelSyntaxAnalyserPart, LIonCoreCommonSyntaxAnalyserPart } from ".";

/**
 *   Class LIonCoreSyntaxAnalyser is the main syntax analyser.
 *   The actual work is being done by its parts, one for each model unit,
 *   and one common part that contains the methods used in multiple units.
 *
 */
export class LIonCoreSyntaxAnalyser implements SyntaxAnalyser {
    sourceName: string = "";
    locationMap: any;
    private _unit_Metamodel_analyser: MetamodelSyntaxAnalyserPart = new MetamodelSyntaxAnalyserPart(this);
    private _unit_common_analyser: LIonCoreCommonSyntaxAnalyserPart = new LIonCoreCommonSyntaxAnalyserPart(this);

    clear(): void {
        throw new Error("Method not implemented.");
    }

    transform<T>(sppt: SharedPackedParseTree): T {
        if (!!sppt.root) {
            return this.transformSharedPackedParseTreeNode(sppt.root) as unknown as T;
        } else {
            return null;
        }
    }

    public transformSharedPackedParseTreeNode(node: SPPTNode): any {
        if (!!node) {
            try {
                if (node.isLeaf) {
                    return this.transformSharedPackedParseTreeLeaf(node);
                } else if (node.isBranch) {
                    return this.transformSharedPackedParseTreeBranch(node as SPPTBranch);
                }
            } catch (e) {
                if (e.message.startsWith("Syntax error in ") || e.message.startsWith("Error in LIonCoreSyntaxAnalyser")) {
                    throw e;
                } else {
                    // add more info to the error message
                    throw new Error(
                        `Syntax error in "${this.sourceName} (line: ${node.location.line}, column: ${node.location.column})": ${e.message}`
                    );
                }
                // console.log(e.message + e.stack);
            }
        } else {
            return null;
        }
    }

    private transformSharedPackedParseTreeLeaf(node: SPPTNode): any {
        let tmp = ((node as SPPTLeaf)?.nonSkipMatchedText).trim();
        if (tmp.length > 0) {
            if (tmp.startsWith('"')) {
                // stringLiteral, strip the surrounding quotes
                tmp = tmp.slice(1, tmp.length - 1);
                return tmp;
            } else if (tmp == "false") {
                // booleanLiteral
                return false;
            } else if (tmp == "true") {
                // booleanLiteral
                return true;
            } else if (Number.isInteger(parseInt(tmp))) {
                // numberLiteral
                return parseInt(tmp);
            } else {
                // identifier
                return tmp;
            }
        }
        return null;
    }

    private transformSharedPackedParseTreeBranch(branch: SPPTBranch): any {
        let brName: string = branch.name;
        if ("Metamodel" == brName) {
            return this._unit_Metamodel_analyser.transformMetamodel(branch);
        } else if ("MetamodelElement" == brName) {
            return this._unit_Metamodel_analyser.transformMetamodelElement(branch);
        } else if ("__pi_reference" == brName) {
            return this.transform__pi_reference(branch);
        } else {
            throw new Error(`Error in LIonCoreSyntaxAnalyser: ${brName} not handled for node '${branch?.matchedText}'`);
        }
    }

    /**
     * Generic method to get the children of a branch. Throws an error if no children can be found.
     */
    public getChildren(branch: SPPTBranch): any {
        if (!!branch && !!branch.nonSkipChildren) {
            try {
                return branch.nonSkipChildren.toArray();
            } catch (e) {
                throw new Error(`Cannot follow branch: ${e.message} (${branch.matchedText.trimEnd()})`);
            }
        }
        return null;
    }

    /**
     * Generic method to get the optional group of a branch. Throws an error if no group can be found.
     */
    public getGroup(branch: SPPTBranch) {
        // take the first element in the [0..1] optional group or multi branch
        let group: any = branch;
        let stop: boolean = false;
        while (!stop) {
            let nextOne: any = null;
            try {
                nextOne = group.nonSkipChildren?.toArray()[0];
            } catch (e) {
                throw new Error(`Cannot follow group: ${e.message} (${group.matchedText})`);
            }
            if (!nextOne || (!nextOne.name.includes("multi") && !nextOne.name.includes("group"))) {
                stop = true; // found a branch with actual content, return its parent!
            } else {
                group = nextOne;
            }
        }
        return group;
    }

    public transform__pi_reference(branch: SPPTBranch) {
        if (branch.name.includes("multi") || branch.name.includes("List")) {
            // its a path name
            return this.transformSharedPackedParseTreeList<string>(branch, ".");
        } else {
            // its a single name
            return this.transformSharedPackedParseTreeLeaf(branch);
        }
    }

    /**
     * Generic method to transform references
     * ...PiElemRef = identifier;
     */
    public piElemRef<T extends PiNamedElement>(branch: SPPTBranch, typeName: string): PiElementReference<T> {
        let referred: string | string[] | T = this.transformSharedPackedParseTreeNode(branch);
        if (this.getChildren(branch)?.length > 1) {
            // its a path name
            referred = this.transformSharedPackedParseTreeList<string>(branch, ".");
        }
        if (referred == null || referred == undefined) {
            // throw new Error(`Syntax error in "${branch?.parent?.matchedText}": cannot create empty reference`);
            return null;
        } else if (typeof referred === "string" && (referred as string).length == 0) {
            // throw new Error(`Syntax error in "${branch?.parent?.matchedText}": cannot create empty reference`);
            return null;
        } else {
            return PiElementReference.create<T>(referred, typeName);
        }
    }

    /**
     * Generic method to transform lists
     */
    public transformSharedPackedParseTreeList<T>(branch: SPPTBranch, separator?: string): T[] {
        let result: T[] = [];
        const children = this.getChildren(branch);
        if (!!children) {
            for (const child of children) {
                let element: any = this.transformSharedPackedParseTreeNode(child);
                if (element !== null && element !== undefined) {
                    if (separator == null || separator == undefined) {
                        result.push(element);
                    } else {
                        if (element != separator) {
                            result.push(element);
                        }
                    }
                }
            }
        }
        return result;
    }

    /**
     * Generic method to transform lists of references
     */
    public transformSharedPackedParseTreeRefList<T extends PiNamedElement>(
        branch: SPPTBranch,
        typeName: string,
        separator?: string
    ): PiElementReference<T>[] {
        let result: PiElementReference<T>[] = [];
        const children = this.getChildren(branch);
        if (!!children) {
            for (const child of children) {
                let refName: any = this.transformSharedPackedParseTreeNode(child);
                if (refName !== null && refName !== undefined) {
                    if (separator === null || separator === undefined) {
                        result.push(PiElementReference.create<T>(refName, typeName));
                    } else {
                        if (refName !== separator) {
                            result.push(PiElementReference.create<T>(refName, typeName));
                        }
                    }
                }
            }
        }
        return result;
    }

    public location(branch: SPPTBranch): PiParseLocation {
        const location = PiParseLocation.create({
            filename: this.sourceName,
            line: branch.location.line,
            column: branch.location.column
        });
        return location;
    }
}

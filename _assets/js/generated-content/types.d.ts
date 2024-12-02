// @ts-check

declare namespace JS.Parsing
{
    type Part = (Comment | JSDoc | Function | Code | Class)
    type Fragment = import("./js-quasi-parser/FragmentNode").FragmentNode
    type JSDoc = { type: 'jsdoc', source_lines: string[], previous_part: Part | undefined }
    type Code = import("./js-quasi-parser/CodeNode").CodeNode
    type Function = import("./js-quasi-parser/FunctionNode").FunctionNode
    type Comment = import("./js-quasi-parser/CommentNode").CommentNode
    type Class = import("./js-quasi-parser/ClassNode").ClassNode
    interface PartParser<T extends Part>
    {
        type: T['type']
        pattern: RegExp
        append: (part: T, source_line: string) => void
        create: (source_line: string) => T
    }
    type ParsingState = { position: number, source_lines: string[], block_depth: number }
}

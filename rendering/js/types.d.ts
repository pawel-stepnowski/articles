// @ts-check

declare namespace Articles.Rendering
{
    type IndexedMesh<N extends number> = { vertices: FixedArray<Math.Vector3, N>, indices: Math.Vector3[] }

    type FixedArray<T, N extends number> = [T, ...T[]] & { length: N }

    type DrawData<TVertexShaderInput> =
    {
        indices: Math.Vector3[],
        attributes: DrawDataAttributes<TVertexShaderInput>
    }

    type DrawDataAttributes<T> = { [Property in keyof T]: T[Property][] }
    
    interface IVertexShaderAttribute<T>
    {
        createValue(): T
    }

    interface IFragmentShaderAttribute<T> extends IVertexShaderAttribute<T>
    { 
        interpolate(values: FixedArray<T, 3>, interpolation: FixedArray<number, 3>, result: T): void
    }

    type VertexShaderAtributes<T> = { [Property in keyof T]: IVertexShaderAttribute<T[Property]> }
    
    type VertexShader<TUniforms, TInput, TOutput> = ((uniforms: TUniforms, input: TInput, output: TOutput) => void) 
    &
    {
        input_attributes: VertexShaderAtributes<TInput>
    }

    type FragmentShader<TUniforms, TInput> = ((uniforms: TUniforms, input: TInput, output: { color: Articles.Rendering.Math.Vector4 }) => void)  &
    {
        input_attributes: { [Property in keyof TInput]: IFragmentShaderAttribute<TInput[Property]> }
    }

    // type ShaderAttributeValues<T extends Record<string, Articles.Rendering.IShaderAttribute<any>>> =
    // {
    //     [Property in keyof T]: ReturnType<T[Property]["createValue"]>
    // }
}

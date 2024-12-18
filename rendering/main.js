// @ts-check
import * as AppendixA from "./js/examples/appendix_a/Scene.js";
import { SourceCodeRendererModule } from "../_assets/js/generated-content/SourceCodeRendererModule.js";
import { SourceCodeRenderer } from "../_assets/js/generated-content/SourceCodeRenderer.js";
import { AppendixB } from "./js/examples/appendix_b.js";

window.addEventListener('load', onWindowLoad);

async function onWindowLoad()
{
    initializeNavigation();
    await renderSourceCode();
    renderAppendixA();
    renderAppendixB();
    // console.log(calculatePlaceholders());
}

function initializeNavigation()
{
    document.querySelectorAll('aside .buttons .menu').forEach(element => element.addEventListener('click', () =>
    {
        document.querySelectorAll('aside').forEach(element => element.classList.toggle('collapsed'))
    }));
    const sections = document.querySelectorAll('section');
    const config = { rootMargin: '-50px 0px -55%' };
    const intersection_observer_callback = (/** @type {IntersectionObserverEntry[]} */ entries) =>
        {
            entries.forEach(entry =>
            {
                if (entry.isIntersecting)
                {
                    const id = entry.target.id;
                    if (id)
                    { 
                        const current_active_item = document.querySelector('nav .active');
                        const intersecting_item = document.querySelector('nav a[href="#' + id + '"]');
                        if (current_active_item) current_active_item.classList.remove('active');
                        if (intersecting_item) intersecting_item.classList.add('active');
                    }
                }
            });
        }
    const observer = new IntersectionObserver(intersection_observer_callback, config);
    sections.forEach(section => observer.observe(section));
}

async function renderSourceCode()
{
    const query_string = new URLSearchParams(window.location.search);
    const modules = 
    {
        pixel_manipulation: await SourceCodeRendererModule.parse('/articles/rendering/js/examples/pixel_manipulation.js'),
        linear_map: await SourceCodeRendererModule.parse('/articles/rendering/js/examples/linear_map.js'),
        fixed_array: await SourceCodeRendererModule.parse('/articles/_assets/js/FixedArray.js'),
        vector: await SourceCodeRendererModule.parse('/articles/rendering/js/math/Vector.js'),
        matrix: await SourceCodeRendererModule.parse('/articles/rendering/js/math/Matrix.js'),
        matrix2: await SourceCodeRendererModule.parse('/articles/rendering/js/math/Matrix2.js'),
        matrix4: await SourceCodeRendererModule.parse('/articles/rendering/js/math/Matrix4.js'),
        renderer: await SourceCodeRendererModule.parse('/articles/rendering/js/Renderer.js'),
        triangle_rasterization: await SourceCodeRendererModule.parse('/articles/rendering/js/examples/triangle_rasterization.js'),
        projection: await SourceCodeRendererModule.parse('/articles/rendering/js/examples/projection.js'),
        rendering: await SourceCodeRendererModule.parse('/articles/rendering/js/examples/rendering.js'),
        math_types: await SourceCodeRendererModule.unparsed('/articles/rendering/js/math/types.d.ts')
    };
    const renderer = new SourceCodeRenderer(modules);
    if (query_string.get('render') === 'manual') window.addEventListener('keydown', e => { if (e.key === 'r') renderer.render(); });
    else renderer.render();
}

function renderAppendixA()
{
    const container = document.querySelector('#appendix-a-container');
    if (!container) return;
    const scene = new AppendixA.Scene();
    container.appendChild(scene.renderer.element);
    container.appendChild(scene.control_panel.container_element);
    scene.render();
}

function renderAppendixB()
{
    const container = document.querySelector('#appendix-b-container');
    if (!container) return;
    const appendix = new AppendixB();
    container.appendChild(appendix.element);
    appendix.render();
}
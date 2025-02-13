import { TextureData } from './TextureMonitor';
import { cloneCanvas, imageBitmapToCanvas } from './utils/canvasUtils';
import { getByteSize } from './utils/textures/calculateFileSize';

export class TextureCard
{
    public div: HTMLDivElement;
    private info: HTMLDivElement;
    private extra: HTMLDivElement;
    private dimension: HTMLHeadingElement;
    private size: HTMLHeadingElement;
    private name: HTMLHeadingElement;

    /**
     * Creates the html elements and attaches itself to its holder so it is displayed in the list
     * @param data - data to be displayed
     * @param gpuMemory - number of bytes the texture uses
     */
    public init(data: TextureData, gpuMemory: number): void
    {
        this.div = document.createElement('div');
        this.info = document.createElement('div');
        this.extra = document.createElement('div');
        this.dimension = document.createElement('h4');
        this.size = document.createElement('h3');
        this.name = document.createElement('h3');

        const mbSize = getByteSize(gpuMemory);

        this.div.classList.add('texture-wrapper');
        this.info.classList.add('texture-info');
        this.extra.classList.add('extra-info');
        // data.source?.classList?.add('texture');

        this.dimension.innerHTML = `<span>&#127924;</span>&nbsp;&nbsp;${data.width} X ${data.height}`;
        this.size.innerHTML = `<span>&#128190;</span>&nbsp;&nbsp;${mbSize}`;

        data.cardHolder.classList.add('type-active');

        // Setup hidden texture card hover content
        this.extra.appendChild(this.name);

        if (data.source.src)
        {
            const sourceURL = data.source.src;

            this.name.innerText = sourceURL.substring(
                sourceURL.lastIndexOf('/') + 1,
                sourceURL.indexOf('?') !== -1 ? sourceURL.indexOf('?') : sourceURL.length,
            );
            const textureButton = document.createElement('div');

            textureButton.innerText = 'OPEN';
            textureButton.classList.add('link-btn');
            textureButton.onclick = function ()
            {
                // WIP - Need to find a way to open locally on file explorer
                // I doesn't always work, as the sourceURL might not be the actual file path
                window.open(sourceURL, '_blank');
            };
            this.extra.appendChild(textureButton);
            data.cardHolder.classList.add('type-texture');

            const image = new Image();

            image.classList.add('texture');
            image.src = sourceURL;
            this.div.appendChild(image);
        }
        else if (data.source instanceof ImageBitmap)
        {
            const canvas = imageBitmapToCanvas(data.source);

            canvas.classList.add('texture');
            this.div.appendChild(canvas);
            this.name.innerText = 'ImageBitmap';
            data.cardHolder.classList.add('type-texture');
        }
        else if (data.source instanceof HTMLCanvasElement)
        {
            const canvas = cloneCanvas(data.source);

            canvas.classList.add('texture');
            this.div.appendChild(canvas);
            this.name.innerText = 'Canvas';
            data.cardHolder.classList.add('type-texture');
        }
        else
        {
            this.name.innerText = '???';
            data.cardHolder.classList.add('type-misc');
        }

        // data.source.classList && this.div.appendChild(data.source);
        data.cardHolder.appendChild(this.div);
        this.info.appendChild(this.dimension);
        this.info.appendChild(this.size);
        data.cardHolder.appendChild(this.info);
        data.cardHolder.appendChild(this.extra);
    }
}

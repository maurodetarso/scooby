export function cloneCanvas(source: HTMLCanvasElement): HTMLCanvasElement
{
    const canvas = document.createElement('canvas');

    canvas.width = source.width;
    canvas.height = source.height;

    const context = canvas.getContext('2d');

    if (context)
    {
        context.drawImage(source, 0, 0);
    }

    return canvas;
}

export function imageBitmapToCanvas(imageBitmap: ImageBitmap): HTMLCanvasElement
{
    const canvas = document.createElement('canvas');

    canvas.width = imageBitmap.width;
    canvas.height = imageBitmap.height;

    const context = canvas.getContext('2d');

    if (context)
    {
        context.drawImage(imageBitmap, 0, 0);
    }

    return canvas;
}


export function CanvasTextWrapper(canvas, lines, style) {

  const width = canvas.width * 2
  const height = canvas.height * 2
  const ctx = canvas.getContext('2d')
  const fontSize = style.fontSize || 30
  const lineheight = 1 * fontSize

  ctx.font = `normal ${fontSize}px Open Sans, Roboto, sans-serif`
  ctx.textAlign = 'center'
  ctx.textBaseline = 'middle'
  ctx.fillStyle = style.color || '#000000'

  const maxTextWidth = width / 3 - fontSize * 1.5

  lines.map((line, i) => ctx.fillText(
      line,
      width / 4,
      height / 3.5 + lineheight * (i + 1) - (lines.length * 5),
      maxTextWidth
    )
  )
}

export function getLines(ctx, text, canvasWidth, fontSize) {
  const maxTextWidth = canvasWidth / 3 - fontSize * 1.5
  const words = text.split(' ');
  const lines = words.reduce((acc, word) => {
    const lastLineIndex = acc.length > 0 ? acc.length - 1 : 0;
    const lastLine = acc[lastLineIndex];
    const line = [lastLine, word].join(' ').trim();
    const metrics = ctx.measureText(line);
    const lineWidth = metrics.width;

    if (lineWidth > maxTextWidth) {
      acc[lastLineIndex + 1] = word;
    } else {
      acc[lastLineIndex] = line;
    }

    return acc;
  }, []);

  return lines;
}

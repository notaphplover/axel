import { PassThrough, Readable } from 'stream';

export function mergeReadables(...streams: Readable[]): PassThrough {
  let pass: PassThrough = new PassThrough();
  let waiting: number = streams.length;
  for (const stream of streams) {
    pass = stream.pipe(pass, { end: false });
    stream.once('end', () => {
      if (--waiting === 0) {
        pass.end();
      }
    });
  }
  return pass;
}

const FILE_SIZES = ['bytes', 'KiB', 'MiB', 'GiB', 'TiB', 'PiB', 'EiB', 'ZiB', 'YiB'];
const K = 1000;
/**
 * Formats the size of a file from bytes to a more readable format (KB, MB, etc.).
 * @param {number} bytes - The size of the file in bytes.
 * @param {number} decimals - Number of decimal places to include in the formatted output.
 * @returns {string} The formatted file size.
 */
export function formatFileSize(bytes: number, decimals: number = 2) {
  if (bytes === 0) return '0 B';

  const dm = decimals < 0 ? 0 : decimals;
  const i = Math.floor(Math.log(bytes) / Math.log(K));

  return parseFloat((bytes / Math.pow(K, i)).toFixed(dm)) + ' ' + FILE_SIZES[i];
}

function plural(str: string, amount: number): string {
  return str.replace('%n', amount.toString()).replace('%s', amount === 1 ? '' : 's');
}

export class TotalsMeter {
  constructor(private _files: number = 0, private _size: number = 0) {}

  get files(): number {
    return this._files;
  }
  get size(): number {
    return this._size;
  }
  addFile(size: number): void {
    this._files++;
    this._size += size;
  }
  toString(): string {
    return `${this.totalString()} (${this.sizeString()})`;
  }
  format(format: string): string {
    return format.replace('%n', this.totalString()).replace('%s', this.sizeString());
  }
  totalString(nameString: string = 'file'): string {
    return plural(`%n ${nameString}%s`, this._files);
  }
  sizeString(): string {
    return formatFileSize(this._size);
  }
}

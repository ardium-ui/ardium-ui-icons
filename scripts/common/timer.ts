/**
 * Formats the duration from milliseconds to a more readable format (ms, s, min, h, etc.).
 * @param {number} milliseconds - The duration in milliseconds.
 * @returns {string} The formatted duration.
 */
function formatDuration(milliseconds: number) {
  if (milliseconds < 1000) return `${milliseconds} ms`;

  const seconds = milliseconds / 1000;
  if (seconds < 60) return `${seconds.toFixed(3)} s`;

  const minutes = seconds / 60;
  if (minutes < 60) return `${minutes.toFixed(2)} min`;

  const hours = minutes / 60;
  if (hours < 24) return `${hours.toFixed(2)} h`;

  const days = hours / 24;
  if (days < 365) return `${days.toFixed(2)} d`;

  const years = days / 365;
  return `${years.toFixed(2)} y`;
}

export class Timer {
  private _start: number = Date.now();
  private _end: number | null = null;

  public end(): Timer {
    this._end ??= Date.now();
    return this;
  }
  public valueOf(): number {
    const end = this._end ?? Date.now();
    return end - this._start;
  }
  public reset(): void {
    this._start = Date.now();
  }
  public toString(): string {
    return formatDuration(this.valueOf());
  }
}

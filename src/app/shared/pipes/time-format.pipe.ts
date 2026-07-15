import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'timeFormat',
  standalone: true,
})
export class TimeFormatPipe implements PipeTransform {
  /**
   * Formats a duration in seconds as a time string in `mm:ss` format.
   *
   * @param seconds Duration in seconds.
   * @returns A formatted time string:
   * - `65` → `"01:05"`
   * - `5` → `"00:05"`
   * - `null` or `undefined` → `"00:00"`
   */
  transform(seconds: number | null | undefined): string {
    if (seconds == null) {
      return '00:00';
    }

    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;

    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds
      .toString()
      .padStart(2, '0')}`;
  }
}

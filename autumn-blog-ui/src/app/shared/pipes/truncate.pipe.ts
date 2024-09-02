import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'truncate',
  standalone: true
})
export class TruncatePipe implements PipeTransform {

  transform(value: string, limit: number): string {
    if (!value) return '';

    const text = this.stripHtmlTags(value);

    const truncatedText = text.length > limit ? text.substring(0, limit) + '...' : text;

    return truncatedText;
  }

  private stripHtmlTags(value: string): string {
    return value.replace(/<[^>]*>/g, '');
  }
}

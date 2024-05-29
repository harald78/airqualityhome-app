import { Page } from '@playwright/test';

// Use this function to log all api calls inside a test
export function monitorApiCalls(page: Page) {
  page.on('request', (request) => console.log('>>', request.method(), request.url()));
  page.on('response', (response) => console.log('<<', response.status(), response.request().method(), response.url()));
}

export function selectByAriaLabel(ariaLabel: string) {
  return `[aria-label="${ariaLabel}"]`;
}

export function selectByAriaRowIndex(index: number) {
  return `[aria-rowindex="${index}"]`;
}

export function selectByAriaColIndex(index: number) {
  return `[aria-colindex="${index}"]`;
}

export function selectElementHasAriaLabel(element: string, ariaLabel: string) {
  return `${element}:has(${selectByAriaLabel(ariaLabel)})`;
}

export function selectElementHasText(element: string, text: string) {
  return `${element}:has(div:has-text("${text}"))`;
}

export async function fillIonTextarea(page: Page, label: string, text: string) {
  await page.locator(`textarea:right-of(:text("${label}"))`).fill(text);
}

export function getActualMonthNameAndYearString(date: Date) {
  return `${getActualMonthString(date)} ${getFullYearString(date)}`;
}

export function getFullYearString(date: Date) {
  return date.getFullYear().toString(10);
}

export function getActualMonthString(date: Date) {
  const monthNumber = date.getMonth();
  switch (monthNumber) {
    case 0:
      return 'JANUARY';
    case 1:
      return 'FEBRUARY';
    case 2:
      return 'MARCH';
    case 3:
      return 'APRIL';
    case 4:
      return 'MAY';
    case 5:
      return 'JUNE';
    case 6:
      return 'JULY';
    case 7:
      return 'AUGUST';
    case 8:
      return 'SEPTEMBER';
    case 9:
      return 'OCTOBER';
    case 10:
      return 'NOVEMBER';
    case 11:
      return 'DECEMBER';
    default:
      return 'JANUARY';
  }
}

import { BrowserContext } from '@playwright/test';

export async function initGlobalRouteMocks(context: BrowserContext) {}

export const mockRoute = async (context: BrowserContext, uri: string, status: number) =>
  context.route(uri, (route) =>
    route.fulfill({
      body: '',
      status,
    })
  );

export const mockRouteWithJsonResponse = async (context: BrowserContext, uri: string, fileName: any, status: number, headers?: { [key: string]: string; } | undefined) =>
  context.route(uri, (route) => route.fulfill({
    path: `playwright/support/json-data/${fileName}`,
    status,
    headers,
  }));
export const mockPostRouteWithJsonResponse = async (context: BrowserContext, uri: string, fileName: any, status: number) =>
  context.route(uri, (route) => {
    if (route.request().method() === 'POST') {
      return route.fulfill({
        path: `playwright/support/json-data/${fileName}`,
        status,
      });
    }

    return route.fulfill({});
  });

export const mockDeleteRouteWithJsonResponse = async (context: BrowserContext, uri: string, fileName: any, status: number) =>
  context.route(uri, (route) => {
    if (route.request().method() === 'DELETE') {
      return route.fulfill({
        path: `playwright/support/json-data/${fileName}`,
        status,
      });
    }
    return route.fulfill({});
  });

export const getQueryStringValue = (key: string): string => {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(key) || '';
}

export const removeQueryString = (): void => {
  const url = window.location.href;

  const newUrl = new URL(url);

  if (newUrl.search) {
    // Remove the query string
    newUrl.search = '';

    // Update the URL without reloading the page
    window.history.replaceState({}, document.title, newUrl);
    // window.location.assign(newUrl.href);
  }
}

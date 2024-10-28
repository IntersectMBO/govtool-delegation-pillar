/**
 * Downloads a JSON object as a file.
 * @param json - The JSON object to be downloaded.
 * @param fileName - The name of the file to be downloaded.
 * If not provided, the default name will be "data.jsonld".
 */
export const downloadJson = (json: unknown, fileName?: string) => {
  const blob = new Blob([JSON.stringify(json, null, 2)], {
    type: 'application/json',
  });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `${fileName || 'data'}.jsonld`;

  // Fallback: If iOS/Safari doesn't support `download`, open the data in a new tab
  if (
    navigator.userAgent.includes('Safari') &&
    !navigator.userAgent.includes('Chrome')
  ) {
    window.open(url, '_blank');
  } else {
    link.click();
  }

  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};

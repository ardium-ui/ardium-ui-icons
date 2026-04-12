export type HighlightPart = {
  text: string;
  highlighted: boolean;
};

export function highlightOrderedMatch(
  value: string,
  query: string
): HighlightPart[] {
  const source = value;
  const search = query.trim().toLowerCase();

  if (!search) {
    return [{ text: source, highlighted: false }];
  }

  const matchedIndices = new Set<number>();
  let queryIndex = 0;

  for (let i = 0; i < source.length && queryIndex < search.length; i++) {
    if (source[i].toLowerCase() === search[queryIndex]) {
      matchedIndices.add(i);
      queryIndex++;
    }
  }

  // If not all query chars were found in order, return unhighlighted text
  if (queryIndex < search.length) {
    return [{ text: source, highlighted: false }];
  }

  const parts: HighlightPart[] = [];
  let currentText = '';
  let currentHighlighted = matchedIndices.has(0);

  for (let i = 0; i < source.length; i++) {
    const isHighlighted = matchedIndices.has(i);

    if (i === 0) {
      currentText = source[i];
      currentHighlighted = isHighlighted;
      continue;
    }

    if (isHighlighted === currentHighlighted) {
      currentText += source[i];
    } else {
      parts.push({
        text: currentText,
        highlighted: currentHighlighted,
      });
      currentText = source[i];
      currentHighlighted = isHighlighted;
    }
  }

  parts.push({
    text: currentText,
    highlighted: currentHighlighted,
  });

  return parts;
}
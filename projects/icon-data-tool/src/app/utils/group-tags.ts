type ObjWithTags = { tags: string[] };

export function groupTags(arr: ObjWithTags[]): {
  common: string[];
  other: string[];
} {
  if (arr.length === 0) {
    return { common: [], other: [] };
  }

  const allTags = new Set<string>();
  arr.forEach((obj) => obj.tags.forEach((tag) => allTags.add(tag)));

  let commonTags = new Set(arr[0].tags);
  for (let i = 1; i < arr.length; i++) {
    commonTags = new Set(arr[i].tags.filter((tag) => commonTags.has(tag)));
  }

  const otherTags = [...allTags].filter((tag) => !commonTags.has(tag));

  return {
    common: [...commonTags],
    other: otherTags,
  };
}

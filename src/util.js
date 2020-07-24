export function fetchMatches(query, dataArray) {
  let dataSet = dataArray || [];
  let matchstr = query || "";
  let result = [];
  for (let i = 0; i < dataSet.length; i++) {
    if (dataSet[i].summary.includes(matchstr)) {
      result.push(i);
    }
  }

  return result;
}

export default function fetchDataMatch(query, dataArray) {
  let result = fetchMatches(query, dataArray.summaries);
  let suggestedData = result.map((i) => {
    let data = {};
    data.title = dataArray.titles[i];
    data.summary = dataArray.summaries[i].summary;
    data.author = dataArray.authors[i].author;
    return data;
  });
  return suggestedData;
}

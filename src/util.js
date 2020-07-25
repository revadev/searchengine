export function fetchMatches(query, dataArray,num,selectedArray) {
  let dataSet = dataArray || [];
  let matchstr = query || "";
  let result = [];
  for (let i = 0; i < dataSet.length; i++) {
    if (dataSet[i].summary.includes(matchstr)) {
      if(!selectedArray.includes(i)){ // do not show suggestion if already added
        result.push(i);
      }
      if(result.length>=num){break;}
    }
  }
  return result;
  //todo: optimize solution for large data
}

export function cleanString(text) {
  return text.replace(/\\u[\dA-F]{4}/gi, function (match) {
    return String.fromCharCode(parseInt(match.replace(/\\u/g, ""), 16));
  });
}

export default function fetchDataMatch(query, dataArray,num,selectedList) {
  let selectedArray = selectedList && selectedList.length>0? selectedList.map((item)=>{return item.id}): [];
  let result = fetchMatches(query, dataArray.summaries,num,selectedArray);
  let suggestedData = result.map((i) => {
    let data = {};
    data.id = i;
    data.title = cleanString(dataArray.titles[i]);
    data.summary = cleanString(dataArray.summaries[i].summary);
    data.author = cleanString(dataArray.authors[i].author);
    return data;
  });
  return suggestedData;
}

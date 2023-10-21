import { relevantColNames, KSRelevantCols, KSReview } from "./types";

// Convert a CSV row into KS entries
const CSVtoKS = (csvData: string):KSReview[] => {
  // Min chars defining a line – anything shorter than this gets skipped (raw newlines, etc)
  const minLineChars = 3;
  
  // Each new line with a believable number of chars
  let lines = csvData.split('\n').filter(l => l.length > minLineChars);
  if(lines.length < 2) throw new Error("no rows");

  const colNames = (lines.shift() || '').split(',');
  const colCount = colNames.length;
  
  // validate that all relevant names are present
  let missingCols:string[] = [];
  relevantColNames.forEach(rN => {
    if(!colNames.includes(rN)) missingCols.push(rN)
  })
  if(missingCols.length > 0) throw new Error(`Missing columns ${missingCols} in ${colNames}`);


  const rowToReview = (row:string) => {
    // Split at commas, but only when they're not in quotes (review content),
    // preserving sequential commas / empty cells. Thank youuuuu chatgpt
    const cells = row.split(/,\s*(?=(?:(?:[^"]*"){2})*[^"]*$)/)
      .map(e => e.trim().replace(/^"(.*)"$/, '$1'));

    // Validate that there are enough lines
    if(cells.length !== colCount){
      // It doesn't handle this error well, nulling instead
      // throw new Error(`expected ${colCount} columns, got ${cells.length}: ${cells}`)
      return null;
    }
    
    let temp:Record<string, string> = {};
    // Construct an object keys based on colname and vals from the row
    colNames.forEach((cN,i) => {
      temp[cN]=cells[i];
    })


    // Being generous with anonymity: anyone with a name shorter than initials,
    // or anything starting with 'anon...' will be nulled before sending to G
    const isAnon = temp.author.toLocaleLowerCase().startsWith('anon') || temp.author.length < 2;

    const review:KSReview = {
      id: temp.id,
      timestamp: new Date(temp.created_at),
      reviewURL: temp.review_URL,
      title: temp.title,
      content: temp.body,
      starRating: Number(temp.rating) || 5, // lol
      photoURLs: temp.reviewer_image.split(','),
      products: [{
        title: temp.productTitle,
        url: temp.productUrl
      }],
      reviewerName: isAnon ? null : temp.author
    }
    return review;
  }

  const reviews = lines.map(rowToReview)
  // @ts-ignore stop ignoring the filter
  const filtered:KSReview[] = reviews.filter(x => x != null);

  return filtered;
}

export default CSVtoKS;
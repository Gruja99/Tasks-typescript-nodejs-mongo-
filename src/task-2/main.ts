interface sameValueRepeat {
  value: string;
  count: number;
}

function sameValuesCounter(input: string[]): sameValueRepeat[] {
  const allWordValues: sameValueRepeat[] = [];
  const sameWordRepeat: any = {};
  for (let i = 0; i < input.length; i++) {
    const value = input[i];
    if (value in sameWordRepeat) {
      sameWordRepeat[value] += 1;
    } else {
      sameWordRepeat[value] = 1;
    }
  }
  for (const word in sameWordRepeat) {
    const countWord = {} as sameValueRepeat;
    countWord['value'] = word;
    countWord['count'] = sameWordRepeat[word];
    allWordValues.push(countWord);
  }
  return allWordValues;
}

const result = sameValuesCounter(['bar', 'foo', 'bar', 'foobar', 'bar', 'foo']);
console.log(result);

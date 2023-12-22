export default function log(logMessage: any) {
  const currentDate = parseDate(new Date());
  const prefixedArgs = [`${currentDate} -`, logMessage];
  console.log.apply(console, prefixedArgs);
}

function parseDate(date: Date) {
  return date.toISOString().replace("T", " ").replace("Z", "").split(".")[0];
}

/* ---------------- exports ---------------- */
export function userImpact(data) {
  const computedData = data.reduce((acc, commit) => {
    const login = commit.author ? commit.author.login : commit.commit.committer.name
    const index = acc.findIndex((o)=> o[0]===login)
    index===-1 ? acc.push([login, 1]) : acc[index][1]++
    return acc
  }, [])

  const resultSorted = computedData.slice(0).sort((a,b) => b[1]-a[1])
  return resultSorted
}

export function commitsTimeline(data) {
  const computedData = data.reduce((acc, commit) => {
    const date = commit.commit.author.date
    const dateFormatted = date.substring(0, 10)
    const index = acc.findIndex((o) => o[0]===dateFormatted)

    index===-1 ? acc.push([dateFormatted, 1]) : acc[index][1]++
    return acc
  }, [])

  // HightCharts needs UTC dates ascending sorted for timeline
  const resultSorted = convertDateToUTC(computedData).sort((a,b) =>  a[0]>b[0] ? 1 : a[0]<b[0] ? -1 : 0)
  return resultSorted
}

/* ---------------- functions ---------------- */

function convertDateToUTC(data){
  return data.map((item) => [Date.parse(item[0]), item[1]])
}

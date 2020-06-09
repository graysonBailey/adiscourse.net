export var present = 25



















export async function getBase(url) {
  try {
    const response = await fetch(url)
    const body = await response.json()
    //loadDiscourseUnitsToArray(body)
   console.log(body)
  //  discourses.vis()
  } catch (error) {
    console.log(error)
    console.log("failure at database retrieval - client")
  }

}

import ContentLoader from "react-content-loader"
import React from "react"

const MyLoader = (props) => {
    return(
  <ContentLoader 
    speed={2}
    width={220}
    height={ 340}
    viewBox="0 0 220 340"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
    {...props}
  >
    <rect x="0" y="0" rx="8" ry="8" width="300" height="256" />
    <rect x="0" y="264" rx="5" ry="5" width="200" height="28" />
    <rect x="0" y="300" rx="3" ry="3" width="170" height="20" />
    
  </ContentLoader>
)
}
export default MyLoader
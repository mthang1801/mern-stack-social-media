import React from 'react'
import {BoxWrapper, WorkList, Introduce, Website} from "./IntroductionBox.styles"
import {useQuery} from "@apollo/client"
import {GET_CURRENT_PERSONAL_USER, GET_CURRENT_USER} from "../../apollo/operations/queries"
import {useThemeUI} from "theme-ui"
import {Link} from "react-router-dom"
import {FaGlobe} from "react-icons/fa"
import {MdWork} from "react-icons/md"
const works = [
  {job_name : "Data Engineer", company_name : "iTech Corp", company_location : "HCM city", company_coordinates_href: "https://www.latlong.net/c/?lat=12.554564&long=107.080476", company_href : "http://google.com", },
  {job_name : "Data Scientist", company_name : "Samsung", company_location : "HCM city", company_coordinates_href: "https://www.latlong.net/c/?lat=12.554564&long=107.080476", company_href : "http://google.com", },
  {job_name : "Junior Developer", company_name : "Freelance", company_location : "HCM city", company_coordinates_href: "https://www.latlong.net/c/?lat=12.554564&long=107.080476", company_href : "http://google.com", }
]



const IntroductionBox = () => {
  const {data : {user}} = useQuery(GET_CURRENT_USER, {fetchPolicy : "cache-first"})
  const {data : {currentPersonalUser}} = useQuery(GET_CURRENT_PERSONAL_USER, {fetchPolicy : "cache-first"})
  const {colorMode} = useThemeUI();
  return (
    <BoxWrapper theme={colorMode}>
      <h4>Introduction</h4>
      {/* Introduce */}
      <Introduce>Lorem ipsum dolor sit amet consectetur adipisicing elit. Exercitationem possimus harum aliquam nobis qui! Temporibus, commodi facilis ex nihil veniam in quia eius dicta quos.</Introduce>
      {/* works list */}
      <WorkList>
        {works.map(work => (
          <li>
           <Website><span><MdWork/></span><Link to={`/tags/${work.job_name}`}>{work.job_name}</Link>at<Link to={work.company_href}>{work.company_name}</Link></Website> 
          </li>
        ))}
      </WorkList>
      {/* Live in */}
      <p>Live in <Link to="https://google.com">Can Tho</Link></p>
      {/* Followers */}
      <p>Current Have <strong>200</strong> followers</p>      
      {/* Contact */}
      <p>Contact me via : 0123 456 789</p>
      <Website> <span><FaGlobe/></span> <Link href="https://github.com/mthang1801">https://github.com/mthang1801</Link></Website>
    </BoxWrapper>
  )
}

export default IntroductionBox

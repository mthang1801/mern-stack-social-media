import React from 'react';
import {
  BoxWrapper,
  WorkList,
  Introduce,
  Website,
} from './styles/IntroductionBox.styles';
import { useReactiveVar } from '@apollo/client';
import { currentPersonalUserVar } from '../../apollo/cache';
import { useTheme } from '../../theme';
import { Link } from 'react-router-dom';
import { FaGlobe } from 'react-icons/fa';
import { MdWork } from 'react-icons/md';
const works = [
  {
    job_name: 'Data Engineer',
    company_name: 'iTech Corp',
    company_location: 'HCM city',
    company_coordinates_href:
      'https://www.latlong.net/c/?lat=12.554564&long=107.080476',
    company_href: 'http://google.com',
  },
  {
    job_name: 'Data Scientist',
    company_name: 'Samsung',
    company_location: 'HCM city',
    company_coordinates_href:
      'https://www.latlong.net/c/?lat=12.554564&long=107.080476',
    company_href: 'http://google.com',
  },
  {
    job_name: 'Junior Developer',
    company_name: 'Freelance',
    company_location: 'HCM city',
    company_coordinates_href:
      'https://www.latlong.net/c/?lat=12.554564&long=107.080476',
    company_href: 'http://google.com',
  },
];

const IntroductionBox = () => {
  const { theme } = useTheme();
  return (
    <BoxWrapper theme={theme}>
      <h4>Introduction</h4>
      {/* Introduce */}
      <Introduce>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Exercitationem
        possimus harum aliquam nobis qui! Temporibus, commodi facilis ex nihil
        veniam in quia eius dicta quos.
      </Introduce>
      {/* works list */}
      <WorkList>
        {works.map((work) => (
          <li key={work.job_name}>
            <Website>
              <span>
                <MdWork />
              </span>
              <Link to={`/tags/${work.job_name}`}>{work.job_name}</Link>at
              <Link to={work.company_href}>{work.company_name}</Link>
            </Website>
          </li>
        ))}
      </WorkList>
      {/* Live in */}
      <p>
        Live in <Link to="https://google.com">Can Tho</Link>
      </p>
      {/* Followers */}
      <p>
        Current Have <strong>200</strong> followers
      </p>
      {/* Contact */}
      <p>Contact me via : 0123 456 789</p>
      <Website>
        {' '}
        <span>
          <FaGlobe />
        </span>{' '}
        <Link href="https://github.com/mthang1801">
          https://github.com/mthang1801
        </Link>
      </Website>
    </BoxWrapper>
  );
};

export default IntroductionBox;

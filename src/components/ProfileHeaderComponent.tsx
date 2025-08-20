import {Col, Image, Row} from "react-bootstrap";
import bgImg from '../assets/images/background/profile-cover.jpg';
import avatarImg from '../assets/images/avatar/avatar.jpg';
import {Link} from "react-router-dom";
import type {Dispatch, ReactNode, SetStateAction} from "react";
import type {TabInt} from "../services/services.ts";
import type {MediaObjectInt} from "../interfaces/MediaObjectInt.ts";
import {APP_ENTRYPOINT} from "../config/services.ts";

export default function ProfileHeaderComponent(props: {
  name: string
  role: string
  actionsChildren?: ReactNode
  tabItems?: TabInt[]
  keyTab?: string
  setTabKey?: Dispatch<SetStateAction<string>>
  profileMedia?: MediaObjectInt
}) {
  
  const {
    name,
    role,
    actionsChildren,
    tabItems,
    setTabKey,
    keyTab,
    profileMedia,
  } = props

  return (
    <>
      <Row className='align-items-center'>
        <Col sm={12}>
          <div
            className='pt-20 rounded-top'
            style={{
              background: `url(${bgImg}) no-repeat`,
              backgroundSize: 'cover'
            }}
          />
          
          <div className='bg-white rounded-bottom smooth-shadow-sm'>
            <div className='d-flex align-items-center justify-content-between pt-4 pb-6 px-4'>
              <div className='d-flex align-items-center'>
                <div
                  className='avatar-xxl avatar-indicators avatar-online me-2 position-relative d-flex justify-content-end align-items-end mt-n10'>
                  <Image
                    roundedCircle
                    src={profileMedia ? APP_ENTRYPOINT + profileMedia.contentUrl : avatarImg}
                    className='avatar-xxl border border-4 border-white-color-40'
                    alt=''
                  />
                </div>
                
                <div className='lh-1'>
                  <h2 className='mb-0 text-capitalize'>{name}
                    <Link to='#!' className='text-decoration-none'/>
                  </h2>
                  <p className='mb-0 d-block'>@{role}</p>
                </div>
              </div>
              
              <div className='d-flex'>{actionsChildren}</div>
            </div>
            
            <ul className='nav nav-lt-tab px-4'>
              {(keyTab && tabItems) && tabItems.length > 0 && tabItems.map((t, i) =>
                <li key={i} className='nav-item'>
                  <Link
                    to={`#${t.event}`}
                    className={`nav-link ${keyTab === t.event ? 'active' : ''}`}
                    onClick={(): void => { if (setTabKey) setTabKey(t.event) }}
                  >
                    {t.title}
                  </Link>
                </li>)}
            </ul>
          </div>
        </Col>
      </Row>
    </>
  )
  
};

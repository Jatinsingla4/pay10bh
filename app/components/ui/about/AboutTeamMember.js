import React from 'react'
import Style from './AboutTeamMember.module.scss'

const AboutTeamMember = ({ section5, imageBase = "", section5Heading, variant = "default" }) => {
  const teamMembers = section5 &&
    Array.isArray(section5.our_team_list) &&
    section5.our_team_list.length > 0
    ? section5.our_team_list.map((item) => {
        const isLocal = item._isLocal || (item.Image && item.Image.startsWith('/'));
        const imageUrl = isLocal ? item.Image : `${imageBase}${item.Image}`;
        const designation = item['Designation '] || item.Designation || '';
        return {
          name: item.Name || '',
          role: designation.trim(),
          description: item.Description || '',
          image: imageUrl,
        };
      })
    : [];

  if (!teamMembers.length) return null;

  const isCompact = variant === 'compact';

  return (
    <div className={`${Style.board_members_main} ${isCompact ? Style.compact : ''}`}>
      <div className={Style.board_header} data-animation="opacity-up">
        <h2>{section5Heading}</h2>
      </div>

      <div className={`${Style.team_grid} ${isCompact ? Style.compact : ''}`} data-animation="opacity-up">
        {teamMembers.map((member, index) => (
          <div key={index} className={Style.member_card}>
            <div className={Style.member_image}>
              <img src={member.image} alt={member.name} />
            </div>
            <div className={Style.member_meta}>
              <div className={Style.member_identity}>
                <h4>{member.name}</h4>
                <p className={Style.member_role}>{member.role}</p>
              </div>
              <p className={Style.member_description}>{member.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AboutTeamMember;

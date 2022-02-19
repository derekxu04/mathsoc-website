// Library Imports
import React from "react";
import { Typography } from "@material-ui/core";

// Component Imports
import WholePageBox from "components/WholePageBox";

// Styling
import styles from "src/styles/PortfolioBox.module.scss";

// Helper Imports
import alphabeticalSort from "src/helpers/alphabeticalSort";

// Data
import { MemberDetails } from "src/data/portfolioData";

const DEFAULT_PROFILE_IMAGE = "/images/team/blank_profile.png";
const LARGE_SUBCOM_SPLIT = 5;

interface PortfolioProps {
  members: MemberDetails[];
  role: string;
}
const Portfolio: React.FC<PortfolioProps> = ({ role, members }) => {
  const directors = members.filter((member) => member.role.includes("Director"));
  const subcom = members.filter((member) => member.role.includes("Subcommittee"));
  const parsedDirectors = directors.sort(alphabeticalSort);
  const parsedSubcom = subcom.sort(alphabeticalSort);

  return (
    <div className={styles.portfolio}>
      <WholePageBox>
        <div className={styles.portfolioContent}>
          <Typography variant="h4" align="center">
            {role}
          </Typography>
          <br />
          {/*directors*/}
          <div className={styles.directorsBox}>
            {parsedDirectors.map((person) => (
              <div className={styles.person} key={person.name}>
                <img
                  src={person.imagePath ? `https:${person.imagePath}` : DEFAULT_PROFILE_IMAGE}
                  alt={`${person.name} photo`}
                  height={150}
                  width={150}
                  className={styles.personImage}
                />
                <br />
                <Typography variant="h4">{person.name}</Typography>
                <Typography variant="h6">{`${role} Director`}</Typography>
              </div>
            ))}
          </div>
          {/*subcom*/}
          {parsedSubcom.length > 0 && (
            <div>
              <br />
              <Typography variant="h4" align="center">
                Subcommittee
              </Typography>
              <br />
              <ul className={subcom.length > LARGE_SUBCOM_SPLIT ? styles.large : ""}>
                {parsedSubcom.map((person) => (
                  <li key={person.name} className={styles.item}>
                    <Typography
                      variant="body1"
                      align="center"
                      style={{ margin: 0, padding: "0.3rem 1rem" }}
                    >
                      {person.name}
                    </Typography>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </WholePageBox>
    </div>
  );
};

export default Portfolio;

// Library Imports
import React from "react";
import { Container, Typography } from "@material-ui/core";
import Image from "next/image";

// Styling
import styles from "src/styles/HomeHero.module.scss";

interface HeroProps {
  url: string;
  text: string;
}

const HomeHero: React.FC<HeroProps> = ({ url, text }) => {
  return (
    <section className={styles.hero}>
      <div className={styles.imageContainer}>
        <Image
          src={url}
          className={styles.image}
          alt="banner"
          layout="fill"
          priority={true}
          draggable="false"
          quality={80}
          key={text}
        />
      </div>
      <Container>
        <div className={styles.text}>
          <Typography variant="h2" color="inherit">
            Welcome to
          </Typography>
          <Typography variant="h1">UNSW Mathematics Society</Typography>
          <button className={styles.join}>Join Us</button>
        </div>
      </Container>
    </section>
  );
};

export default HomeHero;

import React from "react";
import { Container, Typography } from "@material-ui/core";
import styles from "src/styles/Hero.module.scss";
import Image from "next/image";

interface HeroProps {
  url: string;
  text: string;
}

const Hero: React.FC<HeroProps> = ({ url, text }) => {
  const [loaded, setLoaded] = React.useState(false);
  const ref = React.useRef<HTMLDivElement>(null);

  // https://stackoverflow.com/questions/59787642/nextjs-images-loaded-from-cache-dont-trigger-the-onload-event
  React.useEffect(() => {
    if ((ref.current?.firstChild?.firstChild as HTMLImageElement | undefined)?.complete) {
      setLoaded(true);
    }
  }, []);

  return (
    <section className={styles.hero}>
      <div className={styles.imageContainer} ref={ref}>
        {!loaded && <div className={styles.tempImageContainer} />}
        <Image
          src={url}
          className={styles.image}
          alt="banner"
          layout="fill"
          priority={true}
          draggable="false"
          quality={80}
          onLoad={() => setLoaded(true)}
        />
      </div>
      <Container>
        <div className={styles.text}>
          <Typography variant="h1" align="center">
            {text}
          </Typography>
        </div>
      </Container>
    </section>
  );
};

export default Hero;

import React from "react";
import Head from "next/head";
import LoadingIndicator from "../src/pages/LoadingIndicator";
import AboutUs from "../src/pages/AboutUs";

function AboutUsPage({ loading }) {
  return (
    <>
      <Head>
        <title>À propos de nous - iham_baobab_web</title>
        <meta name="description" content="Découvrez qui nous sommes et notre mission" />
        <meta property="og:title" content="À propos de nous - iham_baobab_web" />
        <meta property="og:description" content="Découvrez qui nous sommes et notre mission" />
        <meta property="og:type" content="website" />
      </Head>
      
      <LoadingIndicator loading={loading}>
        <AboutUs />
      </LoadingIndicator>
    </>
  );
}

export default AboutUsPage;
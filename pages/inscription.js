import React from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import LoadingIndicator from "../src/pages/LoadingIndicator";
import Inscription from "../src/components/inscription/Inscription";

function InscriptionPage({ loading }) {
  const router = useRouter();

  const changeA = (param) => {
    if (param === "oui") {
      router.push("/");
    }
  };

  return (
    <>
      <Head>
        <title>Inscription - iham_baobab_web</title>
        <meta name="description" content="Créez votre compte iham_baobab_web" />
        <meta name="robots" content="noindex" />
      </Head>
      
      <LoadingIndicator loading={loading}>
        <Inscription chg={changeA} />
      </LoadingIndicator>
    </>
  );
}

export default InscriptionPage;
import Head from "next/head";
import styles from "../styles/Home.module.css";
import dynamic from "next/dynamic";
import Sentiment from "sentiment";

import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";

import FileSelector from "../components/FileSelector";
import TagCloud from "../components/TagCloud";
import WordInText from "../components/WordInText";

const WaveForm = dynamic(() => import("../components/WaveForm"), {
  ssr: false,
});

import { transcription } from "../data/transcription";
import getOccurrences from "../helpers/wordcloud";

const sentiment = new Sentiment();

export default function Home() {
  // console.log(sentiment.analyze(data.transcript));
  return (
    <div className={styles.container}>
      <Head>
        <title>Deepgram App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <h1>Visualize your audio</h1>
      {/* <FileSelector /> */}
      <WaveForm url="samples/demo.mp3" />

      <Tabs>
        <TabList>
          <Tab>Overview</Tab>
          <Tab>Sentiment</Tab>
          <Tab>Tag Cloud</Tab>
          <Tab>Entities</Tab>
          <Tab>Fx5</Tab>
          <Tab>Fx6</Tab>
          <Tab>Fx7</Tab>
        </TabList>

        <TabPanel>
          <div>
            {transcription.words.map((el, index) => {
              return (
                <WordInText
                  key={index}
                  word={el.word}
                  onClick={() => {
                    console.log(`Jump to ${el.start}`);
                  }}
                />
              );
            })}
          </div>
        </TabPanel>
        <TabPanel>
          <h2>Sentiment</h2>
        </TabPanel>
        <TabPanel>
          <TagCloud data={getOccurrences(transcription.words)} />
        </TabPanel>
      </Tabs>
    </div>
  );
}

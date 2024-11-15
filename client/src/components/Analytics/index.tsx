import React, { useRef, useEffect, FC } from "react";

// @ts-ignore
const { tableau } = window;

type AnalyticsProps = {
  url: string;
}

const Analytics: FC<AnalyticsProps> = ({ url }) => {
  const ref = useRef(null);

  const initViz = () => {
    new tableau.Viz(ref.current, url, {
      hideTabs: true,
      onFirstInteractive: function () {
        console.log("Run this code when the viz has finished loading.");
      },
      width: "100%",
      height: "150vh",
    });
  };

  useEffect(() => {
    try {
      initViz()
    } catch (e) {
      console.log('Analytics is already integrated')
    }
  }, []);

  return <div ref={ref} />;
};

export default Analytics;
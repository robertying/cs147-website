import React, { useEffect, useState } from "react";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import useMediaQuery from "@mui/material/useMediaQuery";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import Image from "components/Image";

const features = [
  {
    name: "Fox Jump 1",
    description:
      "The quick brown fox jumps over the lazy dog. The quick brown fox jumps over the lazy dog. The quick brown fox jumps over the lazy dog.",
    icon: <AutoAwesomeIcon />,
    image: "feature-1.png",
  },
  {
    name: "Fox Jump 2",
    description:
      "The quick brown fox jumps over the lazy dog. The quick brown fox jumps over the lazy dog. The quick brown fox jumps over the lazy dog.",
    icon: <AutoAwesomeIcon />,
    image: "feature-2.png",
  },
  {
    name: "Fox Jump 3",
    description:
      "The quick brown fox jumps over the lazy dog. The quick brown fox jumps over the lazy dog. The quick brown fox jumps over the lazy dog.",
    icon: <AutoAwesomeIcon />,
    image: "feature-3.png",
  },
];

const FeatureImage: React.FC<{ feature: typeof features[0] }> = ({
  feature,
}) => {
  return (
    <Image
      className="w-full absolute inset-y-0 my-auto object-contain"
      style={{ height: "96.8%" }}
      src={feature.image}
      alt={`feature screenshot of ${feature.name}`}
    />
  );
};

const Features: React.FC<{ on: boolean }> = ({ on }) => {
  const sm = useMediaQuery("(min-width:640px)");

  const [selectedFeature, setSelectedFeature] = useState(0);
  const [featureCarouselOn, setFeatureCarouselOn] = useState(on);

  const handleFeatureOver = (id: number) => {
    setFeatureCarouselOn(false);
    setSelectedFeature(id);
  };

  const handleFeatureLeave = () => {
    setFeatureCarouselOn(true);
  };

  useEffect(() => {
    setFeatureCarouselOn(on);
  }, [on]);

  useEffect(() => {
    const timer = setInterval(() => {
      if (sm && featureCarouselOn) {
        setSelectedFeature((s) => (s + 1) % features.length);
      }
    }, 2000);
    return () => clearInterval(timer);
  }, [sm, featureCarouselOn]);

  return (
    <section className="h-screen section">
      <div className="h-full container mx-auto flex flex-row items-center justify-center px-6 lg:px-28 space-x-0 sm:space-x-16 pt-14 sm:pt-16">
        <div className="flex flex-col sm:w-3/5 space-y-2 sm:space-y-8 text-green-700">
          <h2 className="text-3xl sm:text-5xl font-bold mb-4">Features</h2>
          {features.map((f, index) => (
            <div
              key={f.name}
              className={`w-full p-4 sm:p-4 flex flex-row items-center space-x-4 sm:space-x-4 shadow-md hover:shadow-xl transition-all duration-500 cursor-pointer ${
                selectedFeature === index
                  ? "shadow-xl bg-green-700 text-white"
                  : "shadow-md"
              }`}
              onMouseOver={() => handleFeatureOver(index)}
              onMouseLeave={handleFeatureLeave}
            >
              {f.icon}
              <div>
                <h3 className="text-lg sm:text-2xl font-medium mb-1">
                  {f.name}
                </h3>
                {f.description}
              </div>
            </div>
          ))}
        </div>
        {sm && (
          <div className="w-2/5 h-3/5 relative">
            <TransitionGroup>
              <CSSTransition
                key={features[selectedFeature].name}
                timeout={500}
                classNames="feature-screenshot"
              >
                <FeatureImage feature={features[selectedFeature]} />
              </CSSTransition>
            </TransitionGroup>
            <Image
              className="w-full h-full object-contain relative"
              src="iphone-frame.png"
              alt="iphone frame"
            />
          </div>
        )}
      </div>
    </section>
  );
};

export default Features;

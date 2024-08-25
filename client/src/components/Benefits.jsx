import { benefits } from "../constants";
import Heading from "./Heading";
import Section from "./Section";
import Arrow from "../assets/svg/Arrow";
import { GradientLight } from "./design/Benefits";
import ClipPath from "../assets/svg/ClipPath";

const Benefits = () => {
  return (
    <Section id="features">
      <div className="container relative z-2">
        <Heading
          className="md:min-w-md lg:max-w p-0.1"
          title="AlmaLinks user-friendly platform makes it easy to manage your alumni data and helps bridge the gap between your alumni and current students"
        />
        <div className="flex flex-wrap gap-15 mb-10">
      
          {benefits.slice(0, 3).map((item) => (
            <div
              className="block relative p-0.5 bg-no-repeat bg-[length:100%_100%] md:max-w-[44rem]"
              style={{
                backgroundImage: `url(${item.backgroundUrl})`,
              }}
              key={item.id}
            >
              <div className="relative z-2 flex flex-col min-h-[22rem] p-[4.4rem] pointer-events-none">
                <h5 className="h5 mb-5">{item.title}</h5>{" "}
                <p className="body-2 mb-6 text-n-3">your first step to real world.</p>
                <p className="body-2 mb-6 text-n-3">Real World demands fulfilled.</p>
                <p className="body-2 mb-6 text-n-3">For boosting your future.</p>
                <div className="flex items-center mt-auto">
                  <img
                    src={item.iconUrl}
                    width={38}
                    height={38}
                    alt={item.title}
                  />
                  <Arrow />
                </div>
              </div>

              {item.light && <GradientLight />}

              <div
                className="absolute inset-0.5 bg-n-8"
                style={{ clipPath: "url(#benefits)" }}
              >
                <div className="absolute inset-0 opacity-0 transition-opacity hover:opacity-10">
                  {item.imageUrl && (
                    <img
                      src={item.imageUrl}
                      width={380}
                      height={362}
                      alt={item.title}
                      className="w-full h-full object-cover"
                    />
                  )}
                </div>
              </div>

              <ClipPath />
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
};

export default Benefits;

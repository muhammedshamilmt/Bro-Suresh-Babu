import ScrollStack, { ScrollStackItem } from "./ScrollStack";
import foundationGrace from "@/assets/foundation-grace.jpg";
import foundationCross from "@/assets/foundation-cross.jpg";
import foundationUnity from "@/assets/foundation-unity.jpg";

const foundations = [
  {
    title: "The Grace of God",
    description: "Living in the fullness of God's unmerited favor through Christ's finished work",
    image: foundationGrace,
  },
  {
    title: "The Cross of Christ",
    description: "Finding hope, redemption, and eternal life through Jesus' sacrifice",
    image: foundationCross,
  },
  {
    title: "Unity in Faith",
    description: "Bringing believers together in love, grace, and spiritual communion",
    image: foundationUnity,
  },
];

const Foundations = () => {
  return (
    <section id="foundations" className="relative w-full bg-background">
      <div className="text-center pt-16 sm:pt-20 lg:pt-24 pb-8 sm:pb-12 px-4">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3 sm:mb-4">
          Our <span>Foundations</span>
        </h2>
        <p className="text-base sm:text-lg lg:text-xl text-muted-foreground max-w-2xl mx-auto">
          Core principles that guide our ministry and inspire transformation
        </p>
      </div>

      {/* Desktop: ScrollStack View */}
      <div className="hidden lg:block">
        <ScrollStack
          useWindowScroll
          itemDistance={100}
          itemScale={0.05}
          itemStackDistance={40}
          stackPosition="15%"
          scaleEndPosition="10%"
          baseScale={0.90}
        >
          {foundations.map((foundation, index) => (
            <ScrollStackItem
              key={foundation.title}
              itemClassName="overflow-visible bg-background"
            >
              <div className="relative w-full h-full rounded-3xl overflow-hidden">
                {/* Background Image */}
                <div
                  className="absolute inset-0 bg-cover bg-center"
                  style={{ backgroundImage: `url(${foundation.image})` }}
                />
                
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

                {/* Content */}
                <div className="relative h-full flex flex-col justify-end p-12">
                  <div className="space-y-4">
                    <div className="inline-block px-4 py-2 bg-primary/20 backdrop-blur-sm rounded-full">
                      <span className="text-sm font-bold text-primary-foreground">
                        Foundation {index + 1}
                      </span>
                    </div>
                    
                    <h3 className="text-5xl font-bold text-white">
                      {foundation.title}
                    </h3>
                    
                    <p className="text-xl text-white/90 max-w-2xl">
                      {foundation.description}
                    </p>
                  </div>
                </div>
              </div>
            </ScrollStackItem>
          ))}
        </ScrollStack>
      </div>

      {/* Mobile & Tablet: Card Grid View */}
      <div className="lg:hidden px-4 pb-16 space-y-6">
        {foundations.map((foundation, index) => (
          <div
            key={foundation.title}
            className="relative overflow-hidden rounded-2xl shadow-medium hover:shadow-glow transition-shadow"
          >
            {/* Background Image */}
            <div className="relative h-[400px] sm:h-[450px]">
              <div
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: `url(${foundation.image})` }}
              />
              
              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/50 to-black/20" />

              {/* Content */}
              <div className="relative h-full flex flex-col justify-end p-6 sm:p-8">
                <div className="space-y-3 sm:space-y-4">
                  <div className="inline-block px-3 sm:px-4 py-1.5 sm:py-2 bg-primary/20 backdrop-blur-sm rounded-full border border-primary/30">
                    <span className="text-xs sm:text-sm font-bold text-primary-foreground">
                      Foundation {index + 1}
                    </span>
                  </div>
                  
                  <h3 className="text-2xl sm:text-3xl font-bold text-white leading-tight">
                    {foundation.title}
                  </h3>
                  
                  <p className="text-base sm:text-lg text-white/90 leading-relaxed">
                    {foundation.description}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Foundations;

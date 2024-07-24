import React from "react";

interface PageTitleProps {
  title: string;
  description: string;
}
const PageTitle: React.FC<PageTitleProps> = (props) => {
  const { title, description } = props;

  return (
    <div className="relative bg-black text-white p-4 sm:p-6 rounded-sm overflow-hidden">
      {/* Background illustration */}
      <div className="absolute right-0 top-0 -mt-4 mr-16 pointer-events-none hidden xl:block" aria-hidden="true">
        <svg width="319" height="198" xmlns="http://www.w3.org/2000/svg">
          <g fill="none" fillRule="evenodd">
            <g transform="rotate(64 36.592 105.604)">
              <image href={"/assets/footwear.png"} width="64" height="64" />
            </g>
            <g transform="rotate(-51 120.324 -145.372)">
              <image href={"/assets/blouse.png"} width="64" height="64" />
            </g>
            <g transform="rotate(44 61.546 392.623)">
              <image href={"/assets/uniform.png"} width="64" height="64" />
            </g>
          </g>
        </svg>
      </div>

      {/* Content */}
      <div className="relative">
        <h1 className="text-2xl md:text-3xl text-white font-bold mb-1">{title} 👕</h1>
        <p>{description}</p>
      </div>
    </div>
  );
};

export default PageTitle;

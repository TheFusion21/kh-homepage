import React from 'react';

const PageFooter = () => {

  return (
    <div className="flex flex-col items-center justify-center w-full bg-steam-back text-steam-white py-4 uppercase text-shadow-sm font-bold">
      <div className="max-w-5xl mx-auto flex flex-col items-center justify-center text-center w-full">
        <p>This product is just a preview of my skills with React/Tailwind/etc.</p>
        <p>It only serves as a portfolio piece and is not intended to be used for any other purpose.</p>
        <p>The Steam logo and all other trademarks are property of their respective owners.</p>
        <p>The Steam API is used for the purpose of demonstration only.</p>
        <p>To have any data presentable, I had to use the Steam API.</p>
      </div>
    </div>
  );
};

export default PageFooter;
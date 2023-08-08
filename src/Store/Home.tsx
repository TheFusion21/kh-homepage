import React from 'react';
import {
  AiOutlinePercentage,
  AiOutlineApple,
  AiOutlineAndroid,
} from 'react-icons/ai';
import {
  BsSmartwatch,
} from 'react-icons/bs';
const Home = () => {

  return (
    <div className="w-full md:w-4/6 md:mx-auto lg:w-3/6 2xl:w-2/6 flex flex-col p-4">
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="border border-slate-300 rounded-lg overflow-hidden p-4 hover:bg-slate-950/10">
          <AiOutlinePercentage className="w-16 h-16 mx-auto text-red-600" />
          <h2 className="text-center">Discounts</h2>
        </div>
        <div className="border border-slate-300 rounded-lg overflow-hidden p-4 hover:bg-slate-950/10">
          <AiOutlineApple className="w-16 h-16 mx-auto text-slate-950" />
          <h2 className="text-center">IOS</h2>
        </div>
        <div className="border border-slate-300 rounded-lg overflow-hidden p-4 hover:bg-slate-950/10">
          <AiOutlineAndroid className="w-16 h-16 mx-auto text-green-600" />
          <h2 className="text-center">Android</h2>
        </div>
        <div className="border border-slate-300 rounded-lg overflow-hidden p-4 hover:bg-slate-950/10">
          <BsSmartwatch className="w-16 h-16 p-1 mx-auto text-slate-950" />
          <h2 className="text-center">Wearables</h2>
        </div>
      </div>
    </div>
  );
}

export default Home;
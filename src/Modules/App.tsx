import React, { useEffect, useState } from 'react';
import ProgressBar from './ProgressBar';
import Feed, { FeedEntry } from './Feed';
import Form, { Input } from './Form';

const testFeedData: FeedEntry[] = [
  {
    username: 'johndoe123',
    updatedAt: '2021-09-01T12:00:00.000Z',
    changed: 'created',
    status: 'pending',
    message: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec in nunc sed lorem aliquet aliquam. Sed vel massa ac sem faucibus ultrices. Nulla facilisi. Sed id sapien eget nisi mollis aliquam. Cras ac nisl euismod, ultrices diam quis, aliquet nisl. Sed eget justo eget lacus aliquet hendrerit. Curabitur vitae nunc vitae nunc ultricies ultricies. Sed euismod, nisl eget ultricies placerat, velit nisl ultrices dui, et maximus lorem nulla eget turpis. Aliquam erat volutpat. Nulla facilisi. Donec sed diam vel elit tempor viverra. Nulla facilisi. Donec at ante eget libero aliquam aliquet. Sed auctor, urna sit amet mattis ultricies, justo nisl aliquet diam, nec ultricies est sem eget nunc. Nullam auctor, nisl eget aliquet tincidunt, nisl ipsum vehicula massa, nec aliquam nibh lacus in nunc. Donec euismod, felis vel aliquet lacinia, nisl felis ultricies velit, et bibendum arcu arcu eu felis.',
    author: 'johndoe123',
  },
  {
    username: 'janesmith',
    updatedAt: '2021-09-01T15:00:00.000Z',
    changed: 'status',
    status: 'reviewing',
    message: null,
    author: 'johndoe123',
  },
  {
    username: 'janesmith',
    updatedAt: '2021-09-02T09:00:00.000Z',
    changed: 'status',
    status: 'approved',
    message: null,
    author: 'johndoe123',
  },
  {
    username: 'peterparker',
    updatedAt: '2021-09-02T17:00:00.000Z',
    changed: 'comment',
    status: 'approved',
    message: 'This is a comment for this feed',
    author: 'johndoe123',
  },
  {
    username: 'PM',
    updatedAt: '2021-09-03T12:00:00.000Z',
    changed: 'status',
    status: 'completed',
    message: null,
    author: 'johndoe123',
  },
  {
    username: 'johndoe123',
    updatedAt: '2021-09-20T12:00:00.000Z',
    changed: 'comment',
    status: 'pending',
    message: 'Reopening this feed',
    author: 'johndoe123',
  }
];

const App = () => {
  const [progress, setProgress] = useState(0);
  const [progress2, setProgress2] = useState(0);
  const [feedData, setFeedData] = useState(testFeedData);

  const [testInputData, setTestInputData] = useState<Input[]>([
    {
      type: 'text',
      label: 'Text Field',
      required: true,
      disabled: false,
      onChange: (value: string) => {
        setTestInputData((inputs) => {
          const newInputs = [...inputs];
          newInputs[0].value = value;
          return newInputs;
        });
      },
    },
    {
      type: 'password',
      label: 'Password Field',
      required: false,
      disabled: false,
      onChange: (value: string) => {
        setTestInputData((inputs) => {
          const newInputs = [...inputs];
          newInputs[1].value = value;
          return newInputs;
        });
      },
    },
    {
      type: 'email',
      label: 'Email Field',
      required: false,
      disabled: false,
      onChange: (value: string) => {
        setTestInputData((inputs) => {
          const newInputs = [...inputs];
          newInputs[2].value = value;
          return newInputs;
        });
      },
    },
    {
      type: 'currency',
      label: 'Fixed Currency',
      required: false,
      disabled: false,
      onChange: (value: number) => {
        setTestInputData((inputs) => {
          const newInputs = [...inputs];
          newInputs[3].value = value;
          return newInputs;
        });
      },
      min: 0,
      max: 100000,
      currency: 'USD',
      fixed: true,
    },
    {
      type: 'currency',
      label: 'Variable Currency',
      required: false,
      disabled: false,
      onChange: (value: [number, string]) => {
        setTestInputData((inputs) => {
          const newInputs = [...inputs];
          newInputs[4].value = value[0];
          newInputs[4].currency = value[1];
          return newInputs;
        });
      },
      currency: 'USD',
    }
  ]);

  // change the progress value to see the different states of the progress bar
  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(progress => {
        if (progress === 100) {
          clearInterval(interval);
          return 0;
        }
        return progress + 5;
      });
    }, 800);
    return () => clearInterval(interval);
  }, [progress]);

  // change the progress value to see the different states of the progress bar randomly
  useEffect(() => {
    const interval = setInterval(() => {
      setProgress2(Math.floor(Math.random() * 100));
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-row flex-wrap">
      <div className="w-[640px] p-4 text-center">
        <h1 className="text-lg font-bold uppercase">Progress Bar</h1>
        <div className="h-2" />
        <h2 className="text-sm text-zinc-500">A progress bar component with slight animation.</h2>
        <ProgressBar progress={100} style="arrow" color="bg-sky-500" />
        <div className="h-2" />
        <h2 className="text-sm text-zinc-500">With label</h2>
        <ProgressBar progress={progress} label={`${progress}%`} style="striped" color="bg-green-500" />
        <div className="h-2" />
        <h2 className="text-sm text-zinc-500">With hidden label for sr-only</h2>
        <ProgressBar progress={progress2} label={`${progress2}%`} hiddenLabel color="bg-red-500" />
      </div>
      <div className="w-[640px] p-4 text-center">
        <h1 className="text-lg font-bold uppercase">Form</h1>
        <div className="h-2" />
        <Form inputs={testInputData} />
      </div>
      <div className="w-[640px] p-4 text-center">
        <h1 className="text-lg font-bold uppercase">Feed</h1>
        <div className="h-2" />
        <Feed feed={feedData} onFeedChange={setFeedData} />
      </div>
    </div>
  )
};

export default App;
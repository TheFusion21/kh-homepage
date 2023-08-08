import React from 'react';
export interface FeedEntry {
  username: string;
  updatedAt: string;
  changed: 'created' | 'status' | 'comment';
  status: 'pending' | 'reviewing' | 'approved' | 'completed' | 'rejected';
  message: string | null;
  author: string;
}

const Feed = (
  {
    feed,
    onFeedChange,
  } : {
    feed: FeedEntry[],
    onFeedChange: (feed: any[]) => void,
  }
) => {

  return (
    <div className="w-full flex flex-col justify-stretch gap-8">
      {feed.map((update, i) => (
        <div className="flex flex-row w-full gap-4 relative text-left">
          {/* line from avatar down to the bottom */}
          {i !== feed.length -1 && (
            <div className="absolute w-px bg-slate-950/20 left-6 top-14 -bottom-6" />
          )}
          <img src={`https://i.pravatar.cc/64?u=${update.username}`} alt="avatar" className="rounded-full w-12 h-12 shrink-0" />
          {(update.changed === 'created' || update.changed == 'comment') && (
            <div className="grow border rounded-md border-slate-950/20 divide-y divide-slate-950/20">
              {/* Header */}
              <div className="flex flex-row items-center h-12 px-3 bg-slate-100">
                {update.changed === 'created' && (
                  <div>
                    <span className="font-bold">{update.username}</span>
                    <span> created a new feed on {new Date(update.updatedAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                  </div>
                )}
                {update.changed === 'comment' && (
                  <div>
                    <span className="font-bold">{update.username}</span>
                    <span> commented on {new Date(update.updatedAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                  </div>
                )}
                <div className="grow" />
                {update.author === update.username && (
                  <div className="border-slate-950/20 border rounded-full px-2 text-sm bg-slate-200">
                    <span>Author</span>
                  </div>
                )}
              </div>
              {/* Message */}
              <div className="p-3">
                {update.message}
              </div>
            </div>
          )}
          {update.changed === 'status' && (
            <div className="h-12 w-full flex flex-row items-center pl-2">
              <div className="w-full">
                <span className="font-bold">{update.username}</span>
                <span> changed the status to </span>
                <span className={`border rounded-md px-2 ${update.status === 'pending' ? 'border-yellow-500 bg-yellow-100' : ''} ${update.status === 'approved' ? 'border-green-500 bg-green-100' : ''} ${update.status === 'rejected' ? 'border-red-500 bg-red-100' : ''} ${update.status === 'completed' ? 'border-blue-500 bg-blue-100' : ''}`}>
                  {update.status}
                </span>
                <span> on {new Date(update.updatedAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })} </span>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export default Feed;
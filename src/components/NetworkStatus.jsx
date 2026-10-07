import React from 'react'
import useNetworkStatus from '../hooks/useNetworkStatus'

const NetworkStatus = () => {
    const isOnline = useNetworkStatus();

  return (
    <div className='fixed bottom-4 right-4 z-50 bg-[#171d25] px-4 py-2 text-sm '>
      {isOnline ? (
        <span className="text-green-400"> {"\u25CF"} Online </span>
      ) : (
        <span className="text-red-400"> {"\u25CF"} Offline</span>
      )}
    </div>
  );
}

export default NetworkStatus
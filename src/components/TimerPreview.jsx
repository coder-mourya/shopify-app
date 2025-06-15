import React, { useState, useEffect } from 'react';
import { Card, Empty } from 'antd';
import dayjs from 'dayjs';

const TimerPreview = ({ timer }) => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    if (!timer?.endTime) return;

    const updateTimer = () => {
      const now = dayjs();
      const end = dayjs(timer.endTime);
      const diff = end.diff(now);

      if (diff > 0) {
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);

        setTimeLeft({ days, hours, minutes, seconds });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);

    return () => clearInterval(interval);
  }, [timer?.endTime]);

  if (!timer) {
    return (
      <Card title="Timer Preview" className="h-full">
        <Empty
          description="Select a timer to preview"
          image={Empty.PRESENTED_IMAGE_SIMPLE}
        />
      </Card>
    );
  }

  const getTimerStyle = () => {
    const baseStyle = {
      backgroundColor: timer.backgroundColor,
      color: timer.textColor,
      fontSize: `${timer.fontSize}px`,
    };

    switch (timer.style) {
      case 'modern':
        return {
          ...baseStyle,
          borderRadius: '12px',
          padding: '16px',
          fontWeight: 'bold',
          letterSpacing: '1px',
        };
      case 'classic':
        return {
          ...baseStyle,
          borderRadius: '4px',
          padding: '12px',
          border: '2px solid',
          borderColor: timer.textColor,
        };
      case 'minimal':
        return {
          ...baseStyle,
          backgroundColor: 'transparent',
          color: timer.backgroundColor,
          padding: '8px',
          border: '1px solid',
          borderColor: timer.backgroundColor,
        };
      case 'bold':
        return {
          ...baseStyle,
          borderRadius: '8px',
          padding: '20px',
          fontWeight: '900',
          textTransform: 'uppercase',
          letterSpacing: '2px',
        };
      default:
        return baseStyle;
    }
  };

  const formatTime = (time) => String(time).padStart(2, '0');

  return (
    <Card title="Timer Preview" className="h-full sticky top-6">
      <div className="space-y-4">
        <div className="preview-container">
          <div className="w-full bg-white rounded-lg border border-gray-200 p-4">
            <div className="text-center mb-4">
              <div className="w-full h-32 bg-gray-100 rounded-lg flex items-center justify-center mb-4">
                <span className="text-gray-500 text-sm">Product Image</span>
              </div>
              <h3 className="text-lg font-semibold mb-2">Sample Product</h3>
              <p className="text-2xl font-bold text-green-600">$49.99</p>
            </div>
            
            <div className="flex justify-center">
              <div style={getTimerStyle()} className="inline-block text-center">
                <div className="mb-2 text-sm opacity-80">Limited Time Offer!</div>
                <div className="flex justify-center space-x-2">
                  {timer.showDays && (
                    <div className="text-center">
                      <div className="font-mono text-xl">{formatTime(timeLeft.days)}</div>
                      <div className="text-xs opacity-75">DAYS</div>
                    </div>
                  )}
                  {timer.showHours && (
                    <>
                      {timer.showDays && <div className="text-xl">:</div>}
                      <div className="text-center">
                        <div className="font-mono text-xl">{formatTime(timeLeft.hours)}</div>
                        <div className="text-xs opacity-75">HOURS</div>
                      </div>
                    </>
                  )}
                  {timer.showMinutes && (
                    <>
                      {(timer.showDays || timer.showHours) && <div className="text-xl">:</div>}
                      <div className="text-center">
                        <div className="font-mono text-xl">{formatTime(timeLeft.minutes)}</div>
                        <div className="text-xs opacity-75">MINS</div>
                      </div>
                    </>
                  )}
                  {timer.showSeconds && (
                    <>
                      {(timer.showDays || timer.showHours || timer.showMinutes) && <div className="text-xl">:</div>}
                      <div className="text-center">
                        <div className="font-mono text-xl">{formatTime(timeLeft.seconds)}</div>
                        <div className="text-xs opacity-75">SECS</div>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="space-y-2">
          <div className="flex justify-between">
            <span className="text-gray-600">Name:</span>
            <span className="font-medium">{timer.name}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Style:</span>
            <span className="font-medium capitalize">{timer.style}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Position:</span>
            <span className="font-medium">{timer.position?.replace('-', ' ')}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">End Time:</span>
            <span className="font-medium">{dayjs(timer.endTime).format('MMM DD, HH:mm')}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Font Size:</span>
            <span className="font-medium">{timer.fontSize}px</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Display:</span>
            <span className="font-medium">
              {[
                timer.showDays && 'Days',
                timer.showHours && 'Hours', 
                timer.showMinutes && 'Minutes',
                timer.showSeconds && 'Seconds'
              ].filter(Boolean).join(', ')}
            </span>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default TimerPreview;
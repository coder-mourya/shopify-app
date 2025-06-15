import React from 'react';
import { Card, Empty } from 'antd';

const BadgePreview = ({ badge }) => {
  if (!badge) {
    return (
      <Card title="Badge Preview" className="h-full">
        <Empty
          description="Select a badge to preview"
          image={Empty.PRESENTED_IMAGE_SIMPLE}
        />
      </Card>
    );
  }

  return (
    <Card title="Badge Preview" className="h-full">
      <div className="space-y-4">
        <div className="preview-container">
          <div
            className="relative w-full h-48 bg-gray-100 rounded-lg border-2 border-dashed border-gray-300 flex items-center justify-center overflow-hidden"
            style={{
              backgroundImage: 'url(https://images.pexels.com/photos/1656684/pexels-photo-1656684.jpeg?auto=compress&cs=tinysrgb&w=300)',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          >
            <div
              className={`absolute px-2 py-1 rounded text-xs font-medium ${
                badge.position === 'top-left' ? 'top-2 left-2' :
                badge.position === 'top-right' ? 'top-2 right-2' :
                badge.position === 'bottom-left' ? 'bottom-2 left-2' :
                'bottom-2 right-2'
              }`}
              style={{
                backgroundColor: badge.backgroundColor,
                color: badge.color,
              }}
            >
              {badge.text}
            </div>
          </div>
        </div>
        
        <div className="space-y-2">
          <div className="flex justify-between">
            <span className="text-gray-600">Name:</span>
            <span className="font-medium">{badge.name}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Text:</span>
            <span className="font-medium">{badge.text}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Position:</span>
            <span className="font-medium">{badge.position?.replace('-', ' ')}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Colors:</span>
            <div className="flex space-x-2">
              <div
                className="w-4 h-4 rounded border"
                style={{ backgroundColor: badge.backgroundColor }}
                title="Background"
              />
              <div
                className="w-4 h-4 rounded border"
                style={{ backgroundColor: badge.color }}
                title="Text"
              />
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default BadgePreview;
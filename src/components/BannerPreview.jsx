import React from 'react';
import { Card, Empty } from 'antd';

const BannerPreview = ({ banner }) => {
  if (!banner) {
    return (
      <Card title="Banner Preview" className="h-full">
        <Empty
          description="Select a banner to preview"
          image={Empty.PRESENTED_IMAGE_SIMPLE}
        />
      </Card>
    );
  }

  return (
    <Card title="Banner Preview" className="h-full sticky top-6">
      <div className="space-y-4">
        <div className="preview-container">
          <div className="w-full bg-white rounded-lg border border-gray-200 overflow-hidden">
            {/* Banner at top */}
            {(banner.position === 'top' || banner.position === 'fixed-top') && (
              <div
                className="w-full text-center cursor-pointer"
                style={{
                  backgroundColor: banner.backgroundColor,
                  color: banner.textColor,
                  fontSize: `${banner.fontSize}px`,
                  fontWeight: banner.fontWeight,
                  padding: `${banner.padding}px`,
                }}
              >
                {banner.text}
              </div>
            )}
            
            {/* Store content mockup */}
            <div className="p-4 h-48 bg-gray-50 flex items-center justify-center">
              <div className="text-center">
                <div className="w-16 h-16 bg-gray-200 rounded-lg mx-auto mb-2"></div>
                <p className="text-gray-500 text-sm">Store Content</p>
              </div>
            </div>
            
            {/* Banner at bottom */}
            {(banner.position === 'bottom' || banner.position === 'fixed-bottom') && (
              <div
                className="w-full text-center cursor-pointer"
                style={{
                  backgroundColor: banner.backgroundColor,
                  color: banner.textColor,
                  fontSize: `${banner.fontSize}px`,
                  fontWeight: banner.fontWeight,
                  padding: `${banner.padding}px`,
                }}
              >
                {banner.text}
              </div>
            )}
          </div>
        </div>
        
        <div className="space-y-2">
          <div className="flex justify-between">
            <span className="text-gray-600">Name:</span>
            <span className="font-medium">{banner.name}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Position:</span>
            <span className="font-medium capitalize">{banner.position?.replace('-', ' ')}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Font Size:</span>
            <span className="font-medium">{banner.fontSize}px</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Animation:</span>
            <span className="font-medium capitalize">{banner.animation?.replace('-', ' ')}</span>
          </div>
          {banner.link && (
            <div className="flex justify-between">
              <span className="text-gray-600">Link:</span>
              <span className="font-medium text-blue-500 truncate" style={{ maxWidth: '120px' }}>
                {banner.link}
              </span>
            </div>
          )}
          <div className="flex justify-between">
            <span className="text-gray-600">Colors:</span>
            <div className="flex space-x-2">
              <div
                className="w-4 h-4 rounded border"
                style={{ backgroundColor: banner.backgroundColor }}
                title="Background"
              />
              <div
                className="w-4 h-4 rounded border"
                style={{ backgroundColor: banner.textColor }}
                title="Text"
              />
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default BannerPreview;
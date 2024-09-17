import React, { useState, useCallback, useRef } from 'react';
import ReactCrop, { centerCrop, makeAspectCrop } from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { RotateCw, RotateCcw } from 'lucide-react';

const ImageCropModalSecond = ({
  isOpen,
  onClose,
  imageSrc,
  onCropComplete,
  aspectRatio = 1,
  circularCrop = false
}) => {
  const [crop, setCrop] = useState(null);
  const [rotation, setRotation] = useState(0);
  const imgRef = useRef(null);
  const [completedCrop, setCompletedCrop] = useState(null);
  
  const onImageLoad = useCallback((img) => {
    imgRef.current = img;
    const { width, height } = img;
  
    const crop = centerCrop(
      makeAspectCrop(
        {
          unit: 'px',
          width: width * 0.9,
        },
        aspectRatio,
        width,
        height
      ),
      width,
      height
    );
  
    setCrop(crop);
    setCompletedCrop(crop);
  }, [aspectRatio]);

  const handleCropComplete = useCallback(() => {
    if (imgRef.current && completedCrop?.width && completedCrop?.height) {
      const image = imgRef.current;
      const canvas = document.createElement('canvas');
      const scaleX = image.naturalWidth / image.width;
      const scaleY = image.naturalHeight / image.height;
      canvas.width = completedCrop.width * scaleX;
      canvas.height = completedCrop.height * scaleY;
      const ctx = canvas.getContext('2d');
  
      if (ctx) {
        ctx.drawImage(
          image,
          completedCrop.x * scaleX,
          completedCrop.y * scaleY,
          completedCrop.width * scaleX,
          completedCrop.height * scaleY,
          0,
          0,
          completedCrop.width * scaleX,
          completedCrop.height * scaleY
        );
  
        canvas.toBlob((blob) => {
          if (blob) {
            const file = new File([blob], 'cropped.webp', { type: 'image/webp' });
            onCropComplete(file);
            onClose();
          }
        }, 'image/webp');
      }
    }
  }, [completedCrop, onCropComplete, onClose]);

  const handleRotate = (degrees) => {
    setRotation((prevRotation) => (prevRotation + degrees + 360) % 360);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Crop Image</DialogTitle>
        </DialogHeader>
        <div className="text-sm text-gray-500 mb-4">
          Click and adjust your crop area.
        </div>
        <ReactCrop
          crop={crop}
          onChange={(_, percentCrop) => setCrop(percentCrop)}
          onComplete={(c) => setCompletedCrop(c)}
          aspect={aspectRatio}
          circularCrop={circularCrop}
        >
          <img
            ref={imgRef}
            src={imageSrc}
            onLoad={(e) => onImageLoad(e.currentTarget)}
            alt="Crop me"
            style={{ transform: `rotate(${rotation}deg)` }}
          />
        </ReactCrop>
        <div className="flex justify-between items-center mt-4">
          <div className="space-x-2">
            <Button onClick={() => handleRotate(-90)} variant="outline" size="icon">
              <RotateCcw className="h-4 w-4" />
            </Button>
            <Button onClick={() => handleRotate(90)} variant="outline" size="icon">
              <RotateCw className="h-4 w-4" />
            </Button>
          </div>
          <div className="space-x-2">
            <Button onClick={onClose} variant="outline">
              Cancel
            </Button>
            <Button onClick={handleCropComplete} variant="default">
              Confirm Crop
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ImageCropModalSecond;
import React, { useRef, useEffect, useState, useContext } from 'react';
import FontFaceObserver from 'fontfaceobserver';
import { MovableElementsContext } from './MovableElementsContext';

const Tiny5 = new FontFaceObserver('Tiny5');

Tiny5.load().then(() => {
  // The font is now loaded and can be used in the canvas.
});

function BoomLiftGame() {
  const canvasRef = useRef(null);
  const { elements, setElements } = useContext(MovableElementsContext);
  const [boomLength, setBoomLength] = useState(200);
  const [boomAngle, setBoomAngle] = useState(60);
  const [position, setPosition] = useState(window.innerWidth / 2);
  const maxBoomLength = 800;
  const minBoomLength = 100;
  const [wheelAngle, setWheelAngle] = useState(120);
  const wheelRadius = 20;
  const [boxes, setBoxes] = useState(Array.from({ length: 5 }, (_, i) => ({
    id: `box-${i + 1}`,
    x: 250,
    y: 460 - i * 45,
    isPicked: false,
  })));

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const baseWidth = 200;
    const baseHeight = 100;
    const platformWidth = 100;
    const platformHeight = 50;
    const baseLineY = 500;
    const boxWidth = 40;
    const boxHeight = 40;

    const drawBoomLift = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw movable items and boxes
      elements.forEach(item => {
        ctx.fillStyle = item.isLifted ? 'rgba(255, 0, 0, 0.8)' : 'rgba(0, 0, 255, 0.8)';
        ctx.fillRect(item.x, item.y, boxWidth, boxHeight);
      });

      boxes.forEach(box => {
        ctx.fillStyle = box.isPicked ? 'rgba(255, 0, 0, 0.8)' : 'rgba(0, 0, 255, 0.8)';
        if (!box.isPicked) {
          let gradient = ctx.createLinearGradient(box.x, box.y, box.x, box.y + boxHeight);
          gradient.addColorStop(0, 'rgba(169, 133, 92, 0.9)');
          gradient.addColorStop(1, 'rgba(133, 94, 66, 0.9)');
          ctx.fillStyle = gradient;
        }
        const platformEndX = position + Math.cos(boomAngle * Math.PI / 180) * boomLength;
        const platformEndY = baseLineY - Math.sin(boomAngle * Math.PI / 180) * boomLength;
        ctx.fillRect(box.isPicked ? platformEndX - boxWidth / 2 : box.x, box.isPicked ? platformEndY - platformHeight - boxHeight : box.y, boxWidth, boxHeight);
      });

      // Draw the lift base
      ctx.fillStyle = '#3a86ff';
      ctx.fillRect(position - baseWidth / 2, baseLineY - baseHeight, baseWidth, baseHeight);

      // Draw the boom
      ctx.strokeStyle = '#3a86ff';
      ctx.lineWidth = 20;
      ctx.beginPath();
      ctx.moveTo(position, baseLineY - baseHeight);
      const boomEndX = position + Math.cos(boomAngle * Math.PI / 180) * boomLength;
      const boomEndY = baseLineY - Math.sin(boomAngle * Math.PI / 180) * boomLength;
      ctx.lineTo(boomEndX, boomEndY);
      ctx.stroke();

      // Draw the platform at the end of the boom
      ctx.fillStyle = '#3a86ff';
      ctx.save();
      ctx.translate(boomEndX, boomEndY);
      ctx.rotate(((boomAngle - 10) * Math.PI / 100000));  // Stabilize the platform
      ctx.fillRect(-platformWidth / 2, -platformHeight, platformWidth, platformHeight);

      // Draw the control panel on the platform
      ctx.fillStyle = 'black';
      ctx.fillRect(-platformWidth / 2, -platformHeight, 25, 15);

      // Control panel details
      drawControlPanel(ctx, -platformWidth / 2, -platformHeight);

      // Draw the cage on the platform
      drawCage(ctx, -platformWidth / 2, -platformHeight, platformWidth, platformHeight);

      ctx.restore();

      // Draw the wheels
      const wheelPositions = [
        { x: position - baseWidth / 2 + wheelRadius, y: baseLineY },
        { x: position + baseWidth / 2 - wheelRadius, y: baseLineY }
      ];
      wheelPositions.forEach(pos => {
        ctx.fillStyle = 'black';
        ctx.beginPath();
        ctx.arc(pos.x, pos.y, wheelRadius, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = 'darkgray';
        ctx.beginPath();
        ctx.arc(pos.x, pos.y, wheelRadius / 2, 0, Math.PI * 2);
        ctx.fill();

        ctx.save();
        ctx.translate(pos.x, pos.y);
        ctx.rotate(wheelAngle);
        ctx.strokeStyle = 'black';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(0, -wheelRadius);
        ctx.lineTo(0, wheelRadius);
        ctx.moveTo(-wheelRadius, 0);
        ctx.lineTo(wheelRadius, 0);
        ctx.stroke();
        ctx.restore();
      });

      // Draw "Ofek Lift" sticker
      ctx.fillStyle = 'white';
      ctx.font = '25px Tiny5';
      ctx.fillText('Ofek Lift', position - 45, baseLineY - 20);
    };

    const drawControlPanel = (ctx, x, y) => {
      ctx.fillStyle = 'red';
      ctx.beginPath();
      ctx.arc(x + 7, y + 5, 3, 0, 2 * Math.PI);
      ctx.fill();

      ctx.fillStyle = 'green';
      ctx.beginPath();
      ctx.arc(x + 13, y + 5, 3, 0, 2 * Math.PI);
      ctx.fill();

      ctx.fillStyle = 'yellow';
      ctx.beginPath();
      ctx.arc(x + 20, y + 5, 4, 0, 2 * Math.PI);
      ctx.fill();
    };

    const drawCage = (ctx, x, y, width, height) => {
      ctx.strokeStyle = 'black';
      ctx.lineWidth = 2;

      // Draw side rails
      ctx.beginPath();
      ctx.moveTo(x, y);
      ctx.lineTo(x, y - height);
      ctx.moveTo(x + width, y);
      ctx.lineTo(x + width, y - height);
      ctx.stroke();

      // Draw horizontal rails
      ctx.beginPath();
      ctx.moveTo(x, y);
      ctx.lineTo(x + width, y);
      ctx.moveTo(x, y - height / 2);
      ctx.lineTo(x + width, y - height / 2);
      ctx.moveTo(x, y - height);
      ctx.lineTo(x + width, y - height);
      ctx.stroke();

      // Draw middle vertical rail
      ctx.beginPath();
      ctx.moveTo(x + width / 2, y);
      ctx.lineTo(x + width / 2, y - height);
      ctx.stroke();
    };

    const handleKeyDown = (e) => {
      switch (e.key) {
        case 'ArrowUp':
          setBoomAngle(prev => Math.min(prev + 5, 80));
          break;
        case 'ArrowDown':
          setBoomAngle(prev => Math.max(prev - 5, 10));
          break;
        case 'ArrowLeft':
          setPosition(prev => Math.max(prev - 10, window.innerWidth / 6));
          break;
        case 'ArrowRight':
          setPosition(prev => Math.min(prev + 10, window.innerWidth - window.innerWidth / 6));
          break;
        case '+':
          setBoomLength(prev => Math.min(prev + 10, maxBoomLength));
          break;
        case '-':
          setBoomLength(prev => Math.max(prev - 10, minBoomLength));
          break;
        case ' ':
          handleSpacePress();
          break;
        default:
          break;
      }
      setWheelAngle(prev => prev + 0.1);
    };

    const handleSpacePress = () => {
      const boomEndX = position + Math.cos(boomAngle * Math.PI / 180) * boomLength;
      const boomEndY = baseLineY - Math.sin(boomAngle * Math.PI / 180) * boomLength;

      const liftedElementIndex = elements.findIndex(el => el.isLifted);
      const liftedBoxIndex = boxes.findIndex(box => box.isPicked);

      if (liftedElementIndex !== -1) {
        setElements(prevElements => prevElements.map(el =>
          el.id === prevElements[liftedElementIndex].id ? { ...el, isLifted: false, x: boomEndX, y: boomEndY - platformHeight } : el
        ));
      } else if (liftedBoxIndex !== -1) {
        setBoxes(prevBoxes => prevBoxes.map(box =>
          box.id === prevBoxes[liftedBoxIndex].id ? { ...box, isPicked: false, x: boomEndX, y: boomEndY - platformHeight - boxHeight } : box
        ));
      } else {
        const elementIndex = elements.findIndex(el => Math.abs(el.x - boomEndX) < 50 && Math.abs(el.y - (boomEndY - platformHeight)) < 50 && !el.isLifted);
        const boxIndex = boxes.findIndex(box => Math.abs(box.x - boomEndX) < 50 && Math.abs(box.y - (boomEndY - platformHeight)) < 50 && !box.isPicked);

        if (elementIndex !== -1) {
          setElements(prevElements => prevElements.map(el =>
            el.id === prevElements[elementIndex].id ? { ...el, isLifted: true } : el
          ));
        } else if (boxIndex !== -1) {
          setBoxes(prevBoxes => prevBoxes.map(box =>
            box.id === prevBoxes[boxIndex].id ? { ...box, isPicked: true } : box
          ));
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    drawBoomLift();

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [boomLength, boomAngle, position, wheelAngle, elements, boxes]);

  return <canvas ref={canvasRef} width={window.innerWidth} height={window.innerHeight - 100} />;
}

export default BoomLiftGame;

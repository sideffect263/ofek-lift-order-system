import React, { useRef, useEffect, useState, useContext } from 'react';
import FontFaceObserver from 'fontfaceobserver';
import { MovableElementsContext } from './MovableElementsContext';

const Tiny5 = new FontFaceObserver('Tiny5');

Tiny5.load().then(() => {
  // The font is now loaded and can be used in the canvas.
});

function LiftGame() {
  const canvasRef = useRef(null);
  const { elements, setElements } = useContext(MovableElementsContext);
  const [height, setHeight] = useState(40);
  const [position, setPosition] = useState(window.innerWidth / 2 - 30);
  const maxHeight = 600;
  const minHeight = 50;
  const [wheelAngle, setWheelAngle] = useState(120);
  const wheelRadius = 15;
  const [boxes, setBoxes] = useState(Array.from({ length: 5 }, (_, i) => ({
    id: `box-${i + 1}`,
    x: 250,
    y: 460 - i * 45, // Stacked boxes
    isPicked: false,
  })));

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const baseWidth = 180;
    const jointWidth = 6;
    const platformWidth = 260;
    const platformHeight = 30;
    const baseLineY = 500;
    const boxWidth = 40;
    const boxHeight = 40;

    const drawLift = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw movable items
      elements.forEach(item => {
        ctx.fillStyle = item.isLifted ? 'rgba(255, 0, 0, 0.8)' : 'rgba(0, 0, 255, 0.8)';
        ctx.fillRect(item.x, item.y, boxWidth, boxHeight);
      });

      // Draw each box
      boxes.forEach(box => {
        ctx.fillStyle = box.isPicked ? 'rgba(255, 0, 0, 0.8)' : 'rgba(0, 0, 255, 0.8)';
        if (!box.isPicked) {
          let gradient = ctx.createLinearGradient(box.x, box.y, box.x, box.y + boxHeight);
          gradient.addColorStop(0, 'rgba(169, 133, 92, 0.9)');
          gradient.addColorStop(1, 'rgba(133, 94, 66, 0.9)');
          ctx.fillStyle = gradient;
        }
        ctx.fillRect(box.isPicked ? position - boxWidth / 2 : box.x, box.isPicked ? baseLineY - height - platformHeight - boxHeight : box.y, boxWidth, boxHeight);
      });

      // Base of the lift
      ctx.fillStyle = '#3a86ff';
      ctx.fillRect(position - baseWidth / 2, baseLineY, baseWidth, 32);

      // Platform at the edge of the lift
      ctx.fillStyle = '#3a86ff';
      ctx.fillRect(position - platformWidth / 2, baseLineY - height - platformHeight, platformWidth, platformHeight);

      // Rails on the platform
      ctx.strokeStyle = '#3a86ff';
      ctx.lineWidth = 8;
      ctx.beginPath();
      ctx.moveTo(position - platformWidth / 2 + 4, baseLineY - height - platformHeight);
      ctx.lineTo(position - platformWidth / 2 + 4, baseLineY - height - platformHeight - 70);
      ctx.moveTo(position + platformWidth / 2 - 4, baseLineY - height - platformHeight);
      ctx.lineTo(position + platformWidth / 2 - 4, baseLineY - height - platformHeight - 70);
      ctx.stroke();

      // Horizontal bars between the rails
      ctx.strokeStyle = '#3a86ff';
      ctx.lineWidth = 6;
      // Top bar
      ctx.beginPath();
      ctx.moveTo(position - platformWidth / 2 + 4, baseLineY - height - platformHeight - 70);
      ctx.lineTo(position + platformWidth / 2 - 4, baseLineY - height - platformHeight - 70);
      ctx.stroke();
      // Middle bar
      ctx.beginPath();
      ctx.moveTo(position - platformWidth / 2 + 4, baseLineY - height - platformHeight - 35);
      ctx.lineTo(position + platformWidth / 2 - 4, baseLineY - height - platformHeight - 35);
      ctx.stroke();

      // Vertical bars between the rails
      // Left vertical bar
      ctx.beginPath();
      ctx.moveTo(position - platformWidth / 4, baseLineY - height - platformHeight);
      ctx.lineTo(position - platformWidth / 4, baseLineY - height - platformHeight - 70);
      ctx.stroke();
      // Right vertical bar
      ctx.beginPath();
      ctx.moveTo(position + platformWidth / 4, baseLineY - height - platformHeight);
      ctx.lineTo(position + platformWidth / 4, baseLineY - height - platformHeight - 70);
      ctx.stroke();

      // Control board on the platform
      ctx.fillStyle = 'black';
      ctx.fillRect(position - platformWidth / 2, baseLineY - height - platformHeight - 55, 25, 15);

      // Control board details
      ctx.fillStyle = 'red';
      ctx.beginPath();
      ctx.arc(position - platformWidth / 2 + 7, baseLineY - height - platformHeight - 50, 3, 0, 2 * Math.PI);
      ctx.fill();

      ctx.fillStyle = 'green';
      ctx.beginPath();
      ctx.arc(position - platformWidth / 2 + 13, baseLineY - height - platformHeight - 50, 3, 0, 2 * Math.PI);
      ctx.fill();

      ctx.fillStyle = 'yellow';
      ctx.beginPath();
      ctx.arc(position - platformWidth / 2 + 20, baseLineY - height - platformHeight - 50, 4, 0, 2 * Math.PI);
      ctx.fill();

      // Wheels
      const wheelPositions = [
        { x: position - baseWidth / 2 + wheelRadius, y: baseLineY + 30 },
        { x: position + baseWidth / 2 - wheelRadius, y: baseLineY + 30 }
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
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(0, -wheelRadius);
        ctx.lineTo(0, wheelRadius);
        ctx.moveTo(-wheelRadius, 0);
        ctx.lineTo(wheelRadius, 0);
        ctx.stroke();
        ctx.restore();
      });

      // X-joints
      const numSegments = 4;
      const segmentHeight = height / numSegments;
      const extendedWidth = baseWidth - jointWidth - 15;
      let yPosition = baseLineY - height;

      for (let i = 0; i < numSegments; i++) {
        let jointX = position - extendedWidth / 2;
        let jointY = yPosition + segmentHeight * i;
        ctx.strokeStyle = '#bfbdc1';
        ctx.lineWidth = jointWidth;
        ctx.beginPath();
        ctx.moveTo(jointX, jointY);
        ctx.lineTo(jointX + extendedWidth, jointY + segmentHeight);
        ctx.moveTo(jointX, jointY + segmentHeight);
        ctx.lineTo(jointX + extendedWidth, jointY);
        ctx.stroke();

        ctx.fillStyle = '#31393c';
        ctx.beginPath();
        ctx.arc(jointX, jointY, 3, 0, 2 * Math.PI);
        ctx.fill();
        ctx.beginPath();
        ctx.arc(jointX + extendedWidth, jointY + segmentHeight, 3, 0, 2 * Math.PI);
        ctx.fill();
      }

      // "Ofek Lift" sticker
      ctx.fillStyle = 'white';
      ctx.font = '25px Tiny5';
      ctx.fillText('Ofek Lift', position - 45, baseLineY + 23);
    };

    const handleKeyDown = (e) => {
      switch (e.key) {
        case 'ArrowUp':
          if (height < maxHeight) {
            setHeight(height + 10);
          }
          break;
        case 'ArrowDown':
          if (height > minHeight) {
            setHeight(height - 10);
          }
          break;
        case 'ArrowLeft':
          if (position > window.innerWidth / 6) {
            setPosition(position - 10);
          }
          break;
        case 'ArrowRight':
          if (position < window.innerWidth - window.innerWidth / 6) {
            setPosition(position + 10);
          }
          break;
        case ' ':
          handleSpacePress();
          break;
        default:
          break;
      }
      setWheelAngle(wheelAngle + 0.1);
    };

    const handleSpacePress = () => {
      const liftedElementIndex = elements.findIndex(el => el.isLifted);
      const liftedBoxIndex = boxes.findIndex(box => box.isPicked);

      if (liftedElementIndex !== -1) {
        setElements(prevElements => prevElements.map(el =>
          el.id === prevElements[liftedElementIndex].id ? { ...el, isLifted: false, y: baseLineY - height - platformHeight, x: position } : el
        ));
      } else if (liftedBoxIndex !== -1) {
        setBoxes(prevBoxes => prevBoxes.map(box =>
          box.id === prevBoxes[liftedBoxIndex].id ? { ...box, isPicked: false, y: baseLineY - height - platformHeight - boxHeight, x: position } : box
        ));
      } else {
        const elementIndex = elements.findIndex(el => Math.abs(el.x - position) < 50 && Math.abs(el.y - (baseLineY - height - platformHeight)) < 50 && !el.isLifted);
        const boxIndex = boxes.findIndex(box => Math.abs(box.x - position) < 50 && Math.abs(box.y - (baseLineY - height - platformHeight)) < 50 && !box.isPicked);

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
    drawLift();

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [height, position, wheelAngle, elements, boxes]);

  return <canvas ref={canvasRef} width={window.innerWidth} height={window.innerHeight - 100} />;
}

export default LiftGame;

import { fitToFrame, centerImage, getPosition, scaleImage } from "./../FitToFrame.js";

test("how cool would it be to make a large image fit properly on a smaller square?", () => {
  const scenarios = [
    {
      cropSize: 200,
      imageWidth: 800,
      imageHeight: 600
    },
    {
      cropSize: 160,
      imageWidth: 2048,
      imageHeight: 1024
    },
    {
      cropSize: 160,
      imageWidth: 1024,
      imageHeight: 1024
    },
    {
      cropSize: 160,
      imageWidth: 80,
      imageHeight: 120
    }
  ];

  scenarios.forEach(s => {
    const r = fitToFrame(s);
    let field = "imageWidth";
    if (s.imageWidth > s.imageHeight) field = "imageHeight";
    expect(r[field]).toBe(s.cropSize);
    expect(r.maxZoom).toBe(2 - r.zoom);
  });
});

test("isn't it great that we can center an image on a canvas?", () => {
  const scenarios = [
    {
      cropSize: 200,
      imageWidth: 800,
      imageHeight: 600
    },
    {
      cropSize: 160,
      imageWidth: 2048,
      imageHeight: 1024
    },
    {
      cropSize: 160,
      imageWidth: 1024,
      imageHeight: 1024
    },
    {
      cropSize: 160,
      imageWidth: 200,
      imageHeight: 180
    }
  ];

  scenarios.forEach(s => {
    const r = centerImage(s);
    expect(r.imageX).toBe(Math.abs((s.imageWidth - s.cropSize) / 2) * -1);
    expect(r.imageY).toBe(Math.abs((s.imageHeight - s.cropSize) / 2) * -1);
  });
});

test("what about getting the position for a given new image size?", () => {
  const scenarios = [
    {
      cropSize: 200,
      imageWidth: 800,
      imageHeight: 600,
      imageX: -100,
      imageY: -200,
      _newWidth: 400,
      _newHeight: 300,
      _eX: 0,
      _eY: -50
    },
    {
      cropSize: 160,
      imageWidth: 2048,
      imageHeight: 1024,
      imageX: -400.3,
      imageY: -600.8,
      _newWidth: 800,
      _newHeight: 600,
      _eX: -107.6171875,
      _eY: -318.90625
    },
    {
      cropSize: 160,
      imageWidth: 1024,
      imageHeight: 1024,
      imageX: -130,
      imageY: -300,
      _newWidth: 300,
      _newHeight: 300,
      _eX: 0,
      _eY: -31.328125
    },
    {
      cropSize: 160,
      imageWidth: 200,
      imageHeight: 180,
      imageX: -10,
      imageY: -10,
      _newWidth: 300,
      _newHeight: 270,
      _eX: -55,
      _eY: -55
    }
  ];

  scenarios.forEach(s => {
    const r = getPosition(s._newWidth, s._newHeight, s);
    expect(r.imageX).toBe(s._eX);
    expect(r.imageY).toBe(s._eY);
  });
});

test("let's see if scaling W & H still works...", () => {
    const scenarios = [
    {
      cropSize: 200,
      imageWidth: 800,
      imageHeight: 600,
      originalWidth: 800,
      originalHeight: 600,
      imageX: -100,
      imageY: -200,
      _eW: 400,
      _eH: 300,
      _eX: 0,
      _eY: -50,
      zoom: .5
    },
    {
      cropSize: 160,
      imageWidth: 2048,
      imageHeight: 1024,
      originalWidth: 2048,
      originalHeight: 1024,
      imageX: -400.3,
      imageY: -600.8,
      _eW: 615,
      _eH: 308,
      _eX: -64.230712890625,
      _eY: -124.771875,
      zoom: .3
    },
    {
      cropSize: 160,
      imageWidth: 1024,
      imageHeight: 1024,
      originalWidth: 1024,
      originalHeight: 1024,
      imageX: -130,
      imageY: -300,
      _eW: 820,
      _eH: 820,
      _eX: -88.1640625,
      _eY: -224.296875,
      zoom: .8
    },
    {
      cropSize: 160,
      imageWidth: 200,
      imageHeight: 180,
      originalWidth: 200,
      originalHeight: 180,
      imageX: -10,
      imageY: -10,
      _eW: 180,
      _eH: 162,
      _eX: -1,
      _eY: -1,
      zoom: .9
    }
  ];

  scenarios.forEach(s => {
    const r = scaleImage(s);
    expect(r.imageWidth).toBe(s._eW);
    expect(r.imageHeight).toBe(s._eH);
    expect(r.imageX).toBe(s._eX);
    expect(r.imageY).toBe(s._eY);
  });
})
import { useEffect, useRef, useState } from 'react'

// Vertex Shader Source
const VERTEX_SHADER = `
  attribute vec2 a_position;
  attribute vec2 a_texCoord;
  varying vec2 v_texCoord;
  
  void main() {
    gl_Position = vec4(a_position, 0.0, 1.0);
    v_texCoord = a_texCoord;
  }
`;

// Fragment Shader Source - Full WebGL implementation with randomization
const FRAGMENT_SHADER = `
  precision mediump float;
  
  uniform sampler2D u_texture1;
  uniform sampler2D u_texture2;
  uniform float u_morphValue;
  uniform float u_time;
  
  // RANDOMIZED PARAMETERS - Different every load!
  uniform float u_waveFreqX;
  uniform float u_waveFreqY;
  uniform float u_waveSpeedX;
  uniform float u_waveSpeedY;
  uniform float u_rippleFreq;
  uniform float u_rippleSpeed;
  uniform float u_swirlDirection;
  uniform float u_swirlSpeed;
  uniform float u_turbulenceX;
  uniform float u_turbulenceY;
  uniform float u_turbulenceSpeedX;
  uniform float u_turbulenceSpeedY;
  uniform float u_intensityMultiplier;
  
  // Pixel sorting parameters
  uniform float u_pixelSortDirection;
  uniform float u_pixelSortIntensity;
  uniform float u_pixelSortThreshold;
  
  varying vec2 v_texCoord;
  
  void main() {
    vec2 uv = v_texCoord;
    
    // INTENSE warp strength that peaks in middle
    float warpPower = sin(u_morphValue * 3.14159) * 0.4 * u_intensityMultiplier;
    
    // DIVERSE ANCHOR POINTS - NO CENTER! All effects from edges/corners
    vec2 topLeft = vec2(0.0, 0.0);
    vec2 topRight = vec2(1.0, 0.0);
    vec2 bottomLeft = vec2(0.0, 1.0);
    vec2 bottomRight = vec2(1.0, 1.0);
    vec2 leftEdge = vec2(0.0, 0.5);
    vec2 rightEdge = vec2(1.0, 0.5);
    vec2 topEdge = vec2(0.5, 0.0);
    vec2 bottomEdge = vec2(0.5, 1.0);
    
    // Quarter positions for more variety
    vec2 topLeftQuarter = vec2(0.25, 0.25);
    vec2 topRightQuarter = vec2(0.75, 0.25);
    vec2 bottomLeftQuarter = vec2(0.25, 0.75);
    vec2 bottomRightQuarter = vec2(0.75, 0.75);
    vec2 leftQuarter = vec2(0.0, 0.25);
    vec2 rightQuarter = vec2(1.0, 0.75);
    vec2 topQuarter = vec2(0.25, 0.0);
    vec2 bottomQuarter = vec2(0.75, 1.0);
    
    // COMPLEX ANCHOR SELECTION
    vec2 anchor1 = u_waveFreqX > 15.0 ? topLeft : 
                  (u_waveFreqX > 10.0 ? topRight :
                  (u_waveFreqY > 15.0 ? bottomLeft : 
                  (u_waveFreqY > 10.0 ? bottomRight : topLeftQuarter)));
                  
    vec2 anchor2 = u_swirlDirection > 0.0 ? 
                  (u_rippleSpeed > 3.0 ? leftEdge : leftQuarter) :
                  (u_rippleSpeed > 3.0 ? rightEdge : rightQuarter);
                  
    vec2 anchor3 = u_turbulenceX > 20.0 ? topEdge :
                  (u_turbulenceX > 15.0 ? bottomEdge :
                  (u_turbulenceY > 20.0 ? topQuarter : bottomQuarter));
                  
    vec2 anchor4 = u_intensityMultiplier > 1.0 ? topRightQuarter : bottomLeftQuarter;
    vec2 anchor5 = u_waveSpeedX > 2.0 ? bottomRightQuarter : topLeftQuarter;
    
    // MULTI-ANCHOR RIPPLES
    float dist1 = length(uv - anchor1);
    float dist2 = length(uv - anchor2);
    float dist3 = length(uv - anchor3);
    float ripple1 = sin(dist1 * u_rippleFreq - u_time * u_rippleSpeed) * warpPower * 0.08;
    float ripple2 = cos(dist2 * u_rippleFreq * 0.7 + u_time * u_rippleSpeed * 1.3) * warpPower * 0.05;
    float ripple3 = sin(dist3 * u_rippleFreq * 1.2 - u_time * u_rippleSpeed * 0.8) * warpPower * 0.04;
    
    // DIRECTIONAL FLOWS
    float flowX = sin(uv.x * u_waveFreqX + u_time * u_waveSpeedX) * warpPower * 0.06;
    float flowY = cos(uv.y * u_waveFreqY + u_time * u_waveSpeedY) * warpPower * 0.05;
    
    // DIAGONAL FLOWS
    float diagonalFlow1 = sin((uv.x + uv.y) * u_turbulenceX * 0.5 - u_time * u_turbulenceSpeedX) * warpPower * 0.04;
    float diagonalFlow2 = cos((uv.x - uv.y) * u_turbulenceY * 0.5 + u_time * u_turbulenceSpeedY) * warpPower * 0.035;
    
    // CURVED FLOWS
    vec2 flow1Direction = normalize(anchor2 - anchor1);
    vec2 flow2Direction = normalize(anchor4 - anchor5);
    float curvedFlow1 = sin(dot(uv, flow1Direction) * u_waveFreqX + u_time * u_waveSpeedX) * warpPower * 0.05;
    float curvedFlow2 = cos(dot(uv, flow2Direction) * u_waveFreqY - u_time * u_waveSpeedY) * warpPower * 0.04;
    
    // EDGE-TO-EDGE WAVES
    float edgeWave1 = sin(uv.x * u_turbulenceX + u_time * u_turbulenceSpeedX) * 
                     cos(uv.y * u_turbulenceY - u_time * u_turbulenceSpeedY) * warpPower * 0.03;
    float edgeWave2 = cos(uv.y * u_waveFreqX - u_time * u_waveSpeedX) * 
                     sin(uv.x * u_waveFreqY + u_time * u_waveSpeedY) * warpPower * 0.025;
    
    // PIXEL SORTING EFFECTS
    vec2 luisPixelSort = vec2(0.0, 0.0);
    vec2 pelicanPixelSort = vec2(0.0, 0.0);
    
    vec4 luisSample = texture2D(u_texture1, uv);
    vec4 pelicanSample = texture2D(u_texture2, uv);
    float luisBrightness = dot(luisSample.rgb, vec3(0.299, 0.587, 0.114));
    float pelicanBrightness = dot(pelicanSample.rgb, vec3(0.299, 0.587, 0.114));
    
    float luisSortStrength = u_pixelSortIntensity * warpPower * 0.2;
    float pelicanTimeMovement = (1.0 + sin(u_time * 1.3) * 0.8 + cos(u_time * 0.7) * 0.6);
    float pelicanSortStrength = u_pixelSortIntensity * warpPower * 0.2 * pelicanTimeMovement;
    
    // BASIC BAND SORTING
    if (u_pixelSortIntensity > 0.5) {
      if (u_pixelSortDirection > 0.0) {
        // HORIZONTAL SORTING
        float bandHeight = 0.04 + sin(u_time * 0.5) * 0.01;
        float luisBandIndex = floor(uv.y / bandHeight);
        float pelicanBandIndex = floor((uv.y + u_morphValue * 0.1) / bandHeight);
        
        float luisBandOffset = sin(luisBandIndex * 2.0 + u_time * u_rippleSpeed) * 0.5 + 0.5;
        float pelicanBandOffset = cos(pelicanBandIndex * 2.5 - u_time * u_rippleSpeed * 1.2) * 0.5 + 0.5;
        
        float luisSortOffset = (luisBrightness - u_pixelSortThreshold) * luisSortStrength;
        if (luisBrightness > u_pixelSortThreshold) {
          luisPixelSort.x += luisSortOffset * sin(uv.y * 25.0 + u_time);
        }
        luisPixelSort.x += sin(luisBandIndex * 3.14159 + luisBandOffset * 6.28) * luisSortStrength * 0.4;
        
        float pelicanThreshold = 1.0 - u_pixelSortThreshold + sin(u_time * 0.8) * 0.3;
        float pelicanSortOffset = (pelicanBrightness - pelicanThreshold) * pelicanSortStrength;
        if (pelicanBrightness < pelicanThreshold) {
          pelicanPixelSort.x += pelicanSortOffset * cos(uv.y * (18.0 + sin(u_time * 0.4) * 12.0) - u_time * 1.3);
        }
        pelicanPixelSort.x += cos(pelicanBandIndex * 2.5 + pelicanBandOffset * 4.0) * pelicanSortStrength * 0.8;
        pelicanPixelSort.x += sin(uv.y * 12.0 + u_time * 2.1) * pelicanSortStrength * 0.7;
        pelicanPixelSort.x += cos(uv.y * 8.0 - u_time * 3.2) * pelicanSortStrength * 0.6;
      } else {
        // VERTICAL SORTING
        float bandWidth = 0.03 + cos(u_time * 0.7) * 0.01;
        float luisBandIndex = floor(uv.x / bandWidth);
        float pelicanBandIndex = floor((uv.x + u_morphValue * 0.15) / bandWidth);
        
        float luisBandOffset = cos(luisBandIndex * 1.8 + u_time * u_rippleSpeed) * 0.5 + 0.5;
        float pelicanBandOffset = sin(pelicanBandIndex * 2.2 - u_time * u_rippleSpeed * 0.8) * 0.5 + 0.5;
        
        float luisSortOffset = (luisBrightness - u_pixelSortThreshold) * luisSortStrength;
        if (luisBrightness > u_pixelSortThreshold) {
          luisPixelSort.y += luisSortOffset * cos(uv.x * 22.0 + u_time * 0.8);
        }
        luisPixelSort.y += cos(luisBandIndex * 3.14159 + luisBandOffset * 6.28) * luisSortStrength * 0.4;
        
        float pelicanThreshold = 1.0 - u_pixelSortThreshold + cos(u_time * 0.6) * 0.3;
        float pelicanSortOffset = (pelicanBrightness - pelicanThreshold) * pelicanSortStrength;
        if (pelicanBrightness < pelicanThreshold) {
          pelicanPixelSort.y += pelicanSortOffset * sin(uv.x * (16.0 + cos(u_time * 0.5) * 10.0) - u_time * 1.1);
        }
        pelicanPixelSort.y += sin(pelicanBandIndex * 2.8 + pelicanBandOffset * 5.0) * pelicanSortStrength * 0.8;
        pelicanPixelSort.y += cos(uv.x * 14.0 - u_time * 1.8) * pelicanSortStrength * 0.7;
        pelicanPixelSort.y += sin(uv.x * 10.0 + u_time * 2.8) * pelicanSortStrength * 0.6;
      }
    }
    
    // DIAGONAL SORTING
    if (u_pixelSortIntensity > 1.0) {
      float diagonalStrength = (u_pixelSortIntensity - 1.0) * warpPower * 0.12;
      
      vec2 luisSortDirection = normalize(anchor4 - anchor1);
      float luisSortProjection = dot(uv - anchor1, luisSortDirection);
      float luisSortBand = floor(luisSortProjection * 18.0) / 18.0;
      
      float luisStreakDisplace = (luisBrightness - u_pixelSortThreshold) * diagonalStrength;
      if (luisBrightness > u_pixelSortThreshold) {
        luisPixelSort += luisSortDirection * luisStreakDisplace * sin(luisSortBand * 12.0 + u_time * 2.0);
      }
      
      vec2 pelicanSortDirection = normalize(anchor5 - anchor2);
      float rotationAngle = sin(u_time * 0.3) * 0.4;
      vec2 rotatedDirection = vec2(
        pelicanSortDirection.x * cos(rotationAngle) - pelicanSortDirection.y * sin(rotationAngle),
        pelicanSortDirection.x * sin(rotationAngle) + pelicanSortDirection.y * cos(rotationAngle)
      );
      
      float pelicanSortProjection = dot(uv - anchor2, rotatedDirection);
      float pelicanSortBand = floor(pelicanSortProjection * (15.0 + sin(u_time * 0.4) * 3.0)) / 15.0;
      
      float dynamicThreshold = 1.0 - u_pixelSortThreshold + sin(u_time * 0.9) * 0.3;
      float pelicanStreakDisplace = (pelicanBrightness - dynamicThreshold) * diagonalStrength * pelicanSortStrength;
      if (pelicanBrightness < dynamicThreshold) {
        pelicanPixelSort += rotatedDirection * pelicanStreakDisplace * cos(pelicanSortBand * 8.0 - u_time * 1.5) * 
                           (0.8 + sin(u_time * 2.2) * 1.2);
      }
    }
    
    // RADIAL SORTING
    if (u_pixelSortIntensity > 1.5) {
      float radialStrength = (u_pixelSortIntensity - 1.5) * warpPower * 0.08;
      
      vec2 luisRadialDir = normalize(uv - anchor1);
      float luisRadialDist = length(uv - anchor1);
      float luisRadialBand = floor(luisRadialDist * 25.0) / 25.0;
      
      if (luisBrightness > u_pixelSortThreshold) {
        luisPixelSort += luisRadialDir * (luisBrightness - u_pixelSortThreshold) * radialStrength * 
                       sin(luisRadialBand * 15.0 + u_time * 3.0);
      }
      
      vec2 dynamicAnchor3 = anchor3 + vec2(sin(u_time * 0.6) * 0.2, cos(u_time * 0.8) * 0.2);
      vec2 pelicanRadialDir = normalize(uv - dynamicAnchor3);
      float pelicanRadialDist = length(uv - dynamicAnchor3);
      float pelicanRadialBand = floor(pelicanRadialDist * (20.0 + cos(u_time * 0.5) * 8.0)) / 20.0;
      
      float dynamicRadialThreshold = 1.0 - u_pixelSortThreshold + cos(u_time * 1.1) * 0.25;
      if (pelicanBrightness < dynamicRadialThreshold) {
        float radialIntensity = (0.6 + sin(u_time * 1.7) * 1.0);
        pelicanPixelSort += pelicanRadialDir * (dynamicRadialThreshold - pelicanBrightness) * 
                           radialStrength * pelicanSortStrength * radialIntensity * 
                           cos(pelicanRadialBand * 10.0 - u_time * 2.2);
      }
    }
    
    // CORNER SWIRLS
    vec2 swirlAnchor1 = u_swirlSpeed > 2.5 ? topLeft : 
                       (u_swirlSpeed > 2.0 ? topRight :
                       (u_swirlSpeed > 1.5 ? bottomLeft :
                       (u_swirlSpeed > 1.0 ? bottomRight : anchor4)));
                       
    vec2 swirlAnchor2 = u_intensityMultiplier > 1.5 ? topRightQuarter :
                       (u_intensityMultiplier > 1.0 ? bottomLeftQuarter : anchor5);
    
    vec2 toAnchor1 = uv - swirlAnchor1;
    vec2 toAnchor2 = uv - swirlAnchor2;
    float swirlDist1 = length(toAnchor1);
    float swirlDist2 = length(toAnchor2);
    float swirlAngle1 = atan(toAnchor1.y, toAnchor1.x);
    float swirlAngle2 = atan(toAnchor2.y, toAnchor2.x);
    
    float swirl1 = sin(swirlAngle1 * 4.0 * u_swirlDirection + u_time * u_swirlSpeed + swirlDist1 * 15.0) * warpPower * 0.07;
    float swirl2 = cos(swirlAngle2 * 3.0 * -u_swirlDirection - u_time * u_swirlSpeed * 1.3 + swirlDist2 * 12.0) * warpPower * 0.04;
    
    // EDGE-BASED ROTATIONAL EFFECTS
    vec2 edgeAnchor = u_turbulenceSpeedX > 2.5 ? leftEdge : rightEdge;
    vec2 toEdge = uv - edgeAnchor;
    float edgeAngle = atan(toEdge.y, toEdge.x);
    float edgeSwirl = sin(edgeAngle * 6.0 * u_swirlDirection + u_time * u_swirlSpeed * 1.5) * warpPower * 0.05;
    
    // Apply warping to both textures
    vec2 warpedUV1 = uv;
    vec2 warpedUV2 = uv;
    
    warpedUV1.x += flowX + ripple1 + diagonalFlow1 + swirl2 + curvedFlow1 + edgeWave1 + luisPixelSort.x;
    warpedUV1.y += flowY + swirl1 + diagonalFlow2 + edgeSwirl + curvedFlow2 + edgeWave2 + luisPixelSort.y;
    
    float pelicanWarp = warpPower * 1.2;
    float pelicanTimeVariation = (1.0 + sin(u_time * 0.9) * 0.8 + cos(u_time * 1.4) * 0.6);
    
    warpedUV2.x += (swirl1 + diagonalFlow1 * 0.8 + ripple2 + curvedFlow2 + edgeWave2 * 0.7 + pelicanPixelSort.x) * 
                   pelicanWarp * pelicanTimeVariation;
    warpedUV2.y += (ripple3 + diagonalFlow2 * 0.6 + flowY * 0.5 + edgeSwirl * 0.6 + curvedFlow1 * 0.8 + pelicanPixelSort.y) * 
                   pelicanWarp * pelicanTimeVariation;
    
    warpedUV1 = clamp(warpedUV1, 0.0, 1.0);
    warpedUV2 = clamp(warpedUV2, 0.0, 1.0);
    
    vec4 color1 = texture2D(u_texture1, warpedUV1);
    vec4 color2 = texture2D(u_texture2, warpedUV2);
    
    // Gradual transition
    float pelicanBlend = smoothstep(0.55, 0.85, u_morphValue);
    gl_FragColor = mix(color1, color2, pelicanBlend);
  }
`;

function WebGLMorpher({ image1Url, image2Url }) {
  const canvasRef = useRef(null)
  const glRef = useRef(null)
  const programRef = useRef(null)
  const texturesRef = useRef({})
  const randomParamsRef = useRef(null)
  const animationIdRef = useRef(null)
  const timeRef = useRef(0)
  const morphValueRef = useRef(0.5)
  const initializedRef = useRef(false)
  
  const [isLoading, setIsLoading] = useState(true)
  const [sliderValue, setSliderValue] = useState(50)
  const [isInitialized, setIsInitialized] = useState(false)

  // Generate weighted random parameters (75% subtle, 25% extreme)
  const generateRandomParams = () => {
    const biasedChoice = (subtleValue, extremeValue, subtleBias = 0.75) => {
      return Math.random() < subtleBias ? subtleValue : extremeValue
    }

    const intensityRand = Math.random()
    let intensityMultiplier
    if (intensityRand < 0.5) {
      intensityMultiplier = 0.5 + Math.random() * 0.25
    } else if (intensityRand < 0.85) {
      intensityMultiplier = 0.75 + Math.random() * 0.5
    } else {
      intensityMultiplier = 1.25 + Math.random() * 0.75
    }

    const powerCurveRandom = (min, max, power = 2) => {
      return min + (max - min) * Math.pow(Math.random(), power)
    }

    return {
      waveFreqX: biasedChoice(4.0, 20.0, 0.75),
      waveFreqY: biasedChoice(3.0, 18.0, 0.75),
      waveSpeedX: biasedChoice(0.5, 4.0, 0.8),
      waveSpeedY: biasedChoice(0.5, 4.0, 0.8),
      rippleFreq: biasedChoice(8.0, 30.0, 0.7),
      rippleSpeed: biasedChoice(1.0, 6.0, 0.75),
      swirlDirection: Math.random() > 0.5 ? 1.0 : -1.0,
      swirlSpeed: biasedChoice(0.3, 3.0, 0.8),
      turbulenceX: biasedChoice(6.0, 30.0, 0.7),
      turbulenceY: biasedChoice(5.0, 25.0, 0.7),
      turbulenceSpeedX: biasedChoice(0.5, 5.0, 0.8),
      turbulenceSpeedY: biasedChoice(0.5, 5.0, 0.8),
      intensityMultiplier,
      pixelSortDirection: Math.random() > 0.5 ? 1.0 : -1.0,
      pixelSortIntensity: powerCurveRandom(0.0, 2.0, 3.0),
      pixelSortThreshold:
        Math.random() < 0.6 ? 0.3 + Math.random() * 0.4 : 0.1 + Math.random() * 0.8,
    }
  }

  // Create shader
  const createShader = (gl, type, source) => {
    const shader = gl.createShader(type)
    gl.shaderSource(shader, source)
    gl.compileShader(shader)

    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
      console.error('Shader compilation error:', gl.getShaderInfoLog(shader))
      gl.deleteShader(shader)
      return null
    }

    return shader
  }

  // Create program
  const createProgram = (gl, vertexShader, fragmentShader) => {
    const program = gl.createProgram()
    gl.attachShader(program, vertexShader)
    gl.attachShader(program, fragmentShader)
    gl.linkProgram(program)

    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.error('Program linking error:', gl.getProgramInfoLog(program))
      gl.deleteProgram(program)
      return null
    }

    return program
  }

  // Create texture from image
  const createTexture = (gl, img) => {
    const texture = gl.createTexture()
    gl.bindTexture(gl.TEXTURE_2D, texture)
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, img)
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE)
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE)
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR)
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR)
    return texture
  }

  // Render function
  const render = () => {
    const gl = glRef.current
    const program = programRef.current
    const textures = texturesRef.current
    const params = randomParamsRef.current

    if (!gl || !program || !textures.texture1 || !textures.texture2 || !params) return

    gl.viewport(0, 0, canvasRef.current.width, canvasRef.current.height)
    gl.clearColor(0.96, 0.96, 0.96, 1.0)
    gl.clear(gl.COLOR_BUFFER_BIT)

    gl.useProgram(program)

    // Bind textures
    gl.activeTexture(gl.TEXTURE0)
    gl.bindTexture(gl.TEXTURE_2D, textures.texture1)
    gl.uniform1i(gl.getUniformLocation(program, 'u_texture1'), 0)

    gl.activeTexture(gl.TEXTURE1)
    gl.bindTexture(gl.TEXTURE_2D, textures.texture2)
    gl.uniform1i(gl.getUniformLocation(program, 'u_texture2'), 1)

    // Set uniforms
    gl.uniform1f(gl.getUniformLocation(program, 'u_morphValue'), morphValueRef.current)
    gl.uniform1f(gl.getUniformLocation(program, 'u_time'), timeRef.current)

    // Set random parameters
    Object.keys(params).forEach((key) => {
      const location = gl.getUniformLocation(program, `u_${key}`)
      if (location !== null) {
        gl.uniform1f(location, params[key])
      }
    })

    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4)
  }

  // Animation loop - starts immediately when initialized
  useEffect(() => {
    if (!isInitialized) return

    const animate = () => {
      timeRef.current += 0.016
      render()
      animationIdRef.current = requestAnimationFrame(animate)
    }
    animate()

    return () => {
      if (animationIdRef.current) {
        cancelAnimationFrame(animationIdRef.current)
      }
    }
  }, [isInitialized]) // Start animation when initialized

  // Initialize WebGL
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl')

    if (!gl) {
      console.error('WebGL not supported')
      setIsLoading(false)
      return
    }

    glRef.current = gl

    // Create shaders and program
    const vertexShader = createShader(gl, gl.VERTEX_SHADER, VERTEX_SHADER)
    const fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, FRAGMENT_SHADER)
    const program = createProgram(gl, vertexShader, fragmentShader)

    if (!program) {
      setIsLoading(false)
      return
    }

    programRef.current = program
    gl.useProgram(program)

    // Set up geometry
    const positions = new Float32Array([-1, -1, 0, 1, 1, -1, 1, 1, -1, 1, 0, 0, 1, 1, 1, 0])

    const positionBuffer = gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer)
    gl.bufferData(gl.ARRAY_BUFFER, positions, gl.STATIC_DRAW)

    const positionLocation = gl.getAttribLocation(program, 'a_position')
    const texCoordLocation = gl.getAttribLocation(program, 'a_texCoord')

    gl.enableVertexAttribArray(positionLocation)
    gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 16, 0)

    gl.enableVertexAttribArray(texCoordLocation)
    gl.vertexAttribPointer(texCoordLocation, 2, gl.FLOAT, false, 16, 8)

    // Generate random parameters
    randomParamsRef.current = generateRandomParams()
    console.log('🎲 Random WebGL parameters:', randomParamsRef.current)

    // Load images
    let loadedCount = 0
    const checkLoaded = () => {
      loadedCount++
      if (loadedCount === 2) {
        console.log('✅ Both textures loaded')
        initializedRef.current = true
        setIsInitialized(true)
        setIsLoading(false)
        render()
      }
    }

    const img1 = new Image()
    img1.crossOrigin = 'anonymous'
    img1.onload = () => {
      console.log('✅ Image 1 loaded')
      texturesRef.current.texture1 = createTexture(gl, img1)
      checkLoaded()
    }
    img1.onerror = (err) => {
      console.error('❌ Failed to load image 1:', err)
      setIsLoading(false)
    }
    img1.src = image1Url

    const img2 = new Image()
    img2.crossOrigin = 'anonymous'
    img2.onload = () => {
      console.log('✅ Image 2 loaded')
      texturesRef.current.texture2 = createTexture(gl, img2)
      checkLoaded()
    }
    img2.onerror = (err) => {
      console.error('❌ Failed to load image 2:', err)
      setIsLoading(false)
    }
    img2.src = image2Url

    return () => {
      // Cleanup
      if (animationIdRef.current) {
        cancelAnimationFrame(animationIdRef.current)
      }
      if (gl) {
        Object.values(texturesRef.current).forEach((texture) => {
          if (texture) gl.deleteTexture(texture)
        })
        if (programRef.current) {
          gl.deleteProgram(programRef.current)
        }
      }
    }
  }, [image1Url, image2Url])

  const handleSliderChange = (e) => {
    const value = parseInt(e.target.value)
    setSliderValue(value)
    morphValueRef.current = value / 100
  }

  const handleCanvasClick = () => {
    randomParamsRef.current = generateRandomParams()
    console.log('🎲 Randomized effects:', randomParamsRef.current)
    render()
  }

  return (
    <div className="center" style={{ width: '100%' }}>
      <div className="tc mb3 relative">
        {isLoading && (
          <div
            className="webgl-skeleton br2"
            style={{
              width: '100%',
              height: '450px',
              background: 'linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%)',
              backgroundSize: '200% 100%',
              animation: 'shimmer 1.5s infinite',
            }}
          />
        )}

        <canvas
          ref={canvasRef}
          width="450"
          height="450"
          onClick={handleCanvasClick}
          className="br2 webgl-canvas"
          style={{
            width: '100%',
            height: 'auto',
            objectFit: 'cover',
            cursor: 'pointer',
            backgroundColor: '#f5f5f5',
            display: isLoading ? 'none' : 'block',
          }}
        />
      </div>

      <div className="center" style={{ maxWidth: '100%' }}>
        <div className="flex items-center justify-between mb2">
          <span className="f5 gray">luis</span>
          <span className="f5 gray">not luis</span>
        </div>
        <div className="relative">
          <input
            type="range"
            min="0"
            max="100"
            value={sliderValue}
            onChange={handleSliderChange}
            className="luis-slider"
          />
        </div>
      </div>
    </div>
  )
}

export default WebGLMorpher

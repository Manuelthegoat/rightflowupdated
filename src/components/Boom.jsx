function Boom({ text, style, colorVar }) {
  const merged = { ...style }
  if (colorVar) merged.textShadow = `5px 5px 0 var(${colorVar})`
  return (
    <span className="boom" style={merged}>
      {text}
    </span>
  )
}

export default Boom

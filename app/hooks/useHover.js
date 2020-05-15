import React, { useState } from 'react'

//custom hook used by Tooltip component
export default function useHover() {
	const [hovering, setHovering] = useState(false);
	const onMouseOut = () => setHovering(false);
	const onMouseOver = () => setHovering(true);

	return [hovering, { onMouseOut, onMouseOver }];
}